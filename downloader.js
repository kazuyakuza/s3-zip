import { createWriteStream } from "fs";
import archiver from "archiver";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import inquirer from "inquirer";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);
async function getCredentials() {
  const { accessKeyId, secretAccessKey, region, bucketOrPath } = await inquirer.prompt([
    { type: "input", name: "accessKeyId", message: "Enter AWS Access Key ID:" },
    { type: "input", name: "secretAccessKey", message: "Enter AWS Secret Access Key:" },
    { type: "input", name: "region", message: "Enter AWS Region:", default: "us-west-2" },
    { type: "input", name: "bucketOrPath", message: "Enter S3 Bucket Name or Path:" },
  ]);
  return { accessKeyId, secretAccessKey, region, bucketOrPath };
}

async function downloadAndZip() {
  const { accessKeyId, secretAccessKey, region, bucketOrPath } = await getCredentials();

  const s3 = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
  const [bucket, ...pathParts] = bucketOrPath.split('/');
  const path = pathParts.join('/');
  const fileName = `${[bucket, ...pathParts].join('_')}_backup.zip`;
  const listCommand = new ListObjectsV2Command({ Bucket: bucket });
  const { Contents } = await s3.send(listCommand);

  if (!Contents || Contents.length === 0) {
    console.log("Bucket is empty.");
    return;
  }

  const totalFiles = Contents.length;
  let processedFiles = 0;

  const zipFile = createWriteStream(fileName);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(zipFile);

  for (const file of Contents) {
    if (!file.Key.includes(path)) continue;
    const getObjectCommand = new GetObjectCommand({ Bucket: bucket, Key: file.Key });
    const { Body } = await s3.send(getObjectCommand);

    archive.append(Body, { name: file.Key });

    processedFiles++;
    const progress = ((processedFiles / totalFiles) * 100).toFixed(2);
    console.log(`Downloading... ${file.Key} (${progress}% completed)`);
  }

  console.log('Compressing...');
  await archive.finalize();
  console.log(`✅ ZIP file created: ${fileName}`);
}

downloadAndZip().catch(console.error);
