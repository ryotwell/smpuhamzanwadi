/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React, { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import type { FilePondFile, FilePondInitialFile } from "filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register FilePond plugins
registerPlugin(FilePondPluginImagePreview);

export type FilePondUploaderProps = {
    value?: string | null; // url gambar terupload, atau null
    onChange?: (url: string | null) => void;
    /**
     * File yg sedang dikontrol, jika ingin controlled
     */
    files?: (File | FilePondInitialFile)[];
    /**
     * Boleh pilih banyak file? Default: false
     */
    allowMultiple?: boolean;
    /**
     * Tipe file yang diperbolehkan
     */
    acceptedFileTypes?: string[];
    /**
     * Label idle FilePond (HTML string)
     */
    labelIdle?: string;
    /**
     * Nama input (default="filepond-upload")
     */
    name?: string;
    /**
     * Disabled
     */
    disabled?: boolean;
    /**
     * Props tambahan ke FilePond
     */
    [key: string]: any;
};

const FilePondUploader: React.FC<FilePondUploaderProps> = ({
    value,
    onChange,
    files: filesProp,
    allowMultiple = false,
    acceptedFileTypes = ["image/*"],
    labelIdle = 'Drag & Drop atau <span class="filepond--label-action">Browse</span>',
    name = "filepond-upload",
    disabled = false,
    ...rest
}) => {
    // Internal files state jika un-controlled
    const [internalFiles, setInternalFiles] = useState<(File | FilePondInitialFile)[]>(
        filesProp ??
        (value
            ? [
                {
                    source: value,
                    options: {
                        type: "local",
                    },
                } as FilePondInitialFile,
            ]
            : [])
    );
    // Untuk track file sedang upload
    const uploadingRef = useRef(false);

    // Gunakan prop files kalau ada, else internal
    const pondFiles =
        filesProp !== undefined
            ? filesProp
            : internalFiles;

    // Untuk single file, sync url thumbnail
    const handleUpdateFiles = async (fileItems: FilePondFile[]) => {
        setInternalFiles(fileItems.map(f => f.file ?? f).filter(Boolean) as (File | FilePondInitialFile)[]);
        // Hanya handle satu file, ambil yg pertama
        if (!fileItems.length) {
            if (onChange) onChange(null);
            return;
        }
        const file = fileItems[0].file;
        if (!file) {
            if (onChange) onChange(null);
            return;
        }

        // Only upload new file (skip local initialFile [has .source])
        if ((file as any).source) {
            // Tidak perlu upload. Sudah ada url.
            if (onChange && typeof (file as any).source === "string") {
                onChange((file as any).source);
            }
            return;
        }
        // Prevent overlapped
        if (uploadingRef.current) return;
        uploadingRef.current = true;

        try {
            const formData = new FormData();
            formData.append("file", file, file.name);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const json = await res.json();
            if (json.status === 200 && json.data && json.data.path) {
                // Biasakan /api/upload mengembalikan {path, fullUrl}
                onChange && onChange(json.data.fullUrl || json.data.path);
            } else {
                onChange && onChange(null);
                // Show toast jika ingin, tapi di sini tidak (presentational)
            }
        } catch {
            onChange && onChange(null);
        } finally {
            uploadingRef.current = false;
        }
    };

    return (
        <>
            <FilePond
                files={pondFiles as (string | Blob | FilePondInitialFile)[]}
                onupdatefiles={handleUpdateFiles}
                allowMultiple={allowMultiple}
                name={name}
                labelIdle={labelIdle}
                acceptedFileTypes={acceptedFileTypes}
                imagePreviewHeight={190}
                maxFiles={allowMultiple ? 5 : 1}
                credits={false}
                disabled={disabled}
                {...rest}
            />
        </>
    );
};

export default FilePondUploader;
