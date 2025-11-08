"use client";

import React, { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Simple FilePond component for image upload
registerPlugin(FilePondPluginImagePreview);

type FilePondUploaderProps = {
    value?: string | null;
    onChange?: (url: string | null) => void;
    label?: string;
};

const FilePondUploader: React.FC<FilePondUploaderProps> = ({
    value = "",
    onChange,
    label = "Upload File"
}) => {
    const [files, setFiles] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);

    // Sync uploaded value (e.g. after a reload) to the FilePond preview
    useEffect(() => {
        if (value && !uploading && files.length === 0) {
            setFiles([
                {
                    source: value,
                    options: {
                        type: "local"
                    }
                }
            ]);
        }
        if (!value && files.length > 0 && !uploading) {
            setFiles([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleUpdateFiles = async (fileItems: any[]) => {
        setFiles(fileItems);

        if (uploading) return;

        // If a file is just removed, call onChange with null
        if (fileItems.length === 0) {
            onChange && onChange(null);
            return;
        }

        // If the file is local (already uploaded), skip uploading
        const firstItem = fileItems[0];
        if (firstItem?.file === undefined && firstItem?.source && value === firstItem.source) {
            return;
        }

        if (fileItems.length > 0) {
            const file = fileItems[0].file;
            if (!file) {
                onChange && onChange(null);
                return;
            }
            setUploading(true);
            try {
                const formData = new FormData();
                formData.append("file", file, file.name);
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData
                });
                const json = await res.json();
                if (json.status === 200 && json.data && json.data.path) {
                    onChange && onChange(json.data.path);
                } else {
                    onChange && onChange(null);
                }
            } catch (err) {
                onChange && onChange(null);
            } finally {
                setUploading(false);
            }
        } else {
            onChange && onChange(null);
        }
    };

    return (
        <div>
            {/* 
                Hapus label di sini agar tidak double.
                Label Berkas sudah diberikan di parent.
                Jadi, di sini label di FilePond saja.
            */}
            <FilePond
                files={files}
                onupdatefiles={handleUpdateFiles}
                allowMultiple={false}
                name="filepond"
                labelIdle={
                    label
                        ? `Drag & Drop your image or <span class="filepond--label-action">Browse</span><br/><span class="font-medium">${label}</span>`
                        : 'Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                }
                acceptedFileTypes={["image/*"]}
                imagePreviewHeight={190}
                required={false}
                maxFiles={1}
                disabled={uploading}
            />
            {uploading && (
                <div className="text-xs text-gray-500 mt-2">Uploading...</div>
            )}
            {value && !uploading && (
                <div className="text-xs text-green-600 mt-2">File uploaded</div>
            )}
        </div>
    );
};

export default FilePondUploader;
