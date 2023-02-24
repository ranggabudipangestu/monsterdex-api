import { S3 } from "@aws-sdk/client-s3";

export const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://sfo3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: "DO00ZLQWUJ4XRYZNT3N9",
      secretAccessKey: "PUIwBdTPA7CcgHrc/57V/pdfYIPPC7aoHdSOJ9BtcZk"
    }
});


