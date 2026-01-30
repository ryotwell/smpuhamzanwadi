'use server'

import { s3Client } from "@/lib/s3";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export interface FileItem {
    key: string;
    lastModified: string;
    size: number;
    url: string;
}

export async function getBucketFiles(): Promise<{ success: boolean; data?: FileItem[]; error?: string }> {
    const BUCKET_NAME = "smpuhamzanwadi";

    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            // MaxKeys: 20, // Opsional: Batasi jumlah file yg diambil (default 1000)
            // Prefix: "folder-a/", // Opsional: Jika ingin ambil dari folder tertentu
        });

        const response = await s3Client.send(command);

        // Jika bucket kosong, Contents akan undefined
        if (!response.Contents) {
            return { success: true, data: [] };
        }

        console.log(response.Contents);


        // Mapping data agar lebih rapih dipakai di Frontend
        const files: FileItem[] = response.Contents.map((item) => {
            // Konstruksi URL manual (Hanya jika bucket PUBLIC)
            // Format: https://endpoint/bucket-name/filename
            const publicUrl = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${item.Key}`;

            return {
                key: item.Key || "unknown",
                lastModified: item.LastModified?.toISOString() || "",
                size: item.Size || 0,
                url: publicUrl,
            };
        });

        return { success: true, data: files };

    } catch (error: any) {
        console.error("Gagal mengambil list file:", error);
        return { success: false, error: error.message };
    }
}