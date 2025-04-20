// s3.js
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const region = 'us-east-1';
export const bucketName = 'p-project-spring-2025';

export const s3 = new AWS.S3({
  region,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});
