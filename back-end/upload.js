import { s3, bucketName } from './s3.js';

async function uploadBufferToS3(buffer, key, mimeType) {
  await s3.putObject({
    Bucket: bucketName,
    Key: key,           // e.g. `uploads/12345-filename.png`
    Body: buffer,
    ContentType: mimeType,
    ACL: 'public-read', // if you want the URL to be publicly accessible
  }).promise();

  return `https://${bucketName}.s3.amazonaws.com/${key}`;
}