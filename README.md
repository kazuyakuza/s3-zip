# s3-zip

A CLI tool to download an AWS S3 bucket or a specific path within a bucket as a zip file.

## Usage

1.  **Install Dependencies:** Run `npm i` to install the required dependencies. Notice NodeJS 23.6.0 is required.
2.  **Run the Tool:** Execute `npm start` in your terminal.
3.  **Provide Credentials:** The tool will prompt you to enter the following:
    *   AWS Access Key ID
    *   AWS Secret Access Key
    *   AWS Region
    *   S3 Bucket Name or Path (e.g., `my-bucket` or `my-bucket/path/to/files`)
4.  **Download and Zip:** The tool will download the specified files and create a zip archive in the project directory.

## AWS Credentials

**Important:** The credentials required for this tool are *not* the same as your AWS Management Console login credentials. You need to use AWS IAM (Identity and Access Management) access keys.

*   **Access Keys:** These consist of an Access Key ID and a Secret Access Key.
*   **IAM User:** You need an IAM user with the necessary permissions to access the S3 bucket you want to download.
*   **Permissions:** Ensure the IAM user has at least read-only access to the target S3 bucket.
*   **Documentation:** For more information on creating and managing access keys, refer to the official AWS documentation: [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

## Example

```
✔ Enter AWS Access Key ID: ****
✔ Enter AWS Secret Access Key: ****
✔ Enter AWS Region: us-west-2 <-- You can see region in buckets table or bucket properties
✔ Enter S3 Bucket Name or Path: my-bucket/some-folder
Processing: some-folder/ (0.82% completed)
Processing: some-folder/some-file (1.64% completed)
...
✅ ZIP file created: my-bucket_some-folder_backup.zip
```

## TODO

- ☐ **Refactor:** Migrate the CLI tool to an Angular project.
- ☐ **Integrate Electron:** Add Electron to the project for cross-platform desktop application support.
- ☐ **Build for Windows:** Create a Windows build/installer.
- ☐ **Build for Linux:** Create a Linux build/installer.
- ☐ **Build for macOS:** Create a macOS build/installer.
- ☐ **Enhancements:** Consider adding features like progress visualization within the UI, configuration options, and error handling with user-friendly messages.
