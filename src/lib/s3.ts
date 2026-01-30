import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
    // PENTING: forcePathStyle harus true untuk self-hosted (MinIO/RustFS/Garage)
    // AWS asli menggunakan: bucket.s3.amazonaws.com
    // Self-hosted menggunakan: s3.domain.com/bucket
    forcePathStyle: true,
});