"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

export type AllowedFolders = "pas-foto" | "kartu-keluarga" | "akta-kelahiran" | "ijazah";

type FileUploaderProps = {
    value?: string;
    onChange?: (filepath: string | null) => void;
    acceptedFileTypes?: string[];
    label?: string;
    allowMultiple?: boolean;
    name?: string;
    maxFiles?: number;
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
    folder: AllowedFolders;
    hint?: string;
};

const isImageFile = (filename: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename);

const getNormalizedImageSrc = (src: string) => {
    try {
        if (typeof window !== "undefined" && src.startsWith(window.location.origin)) {
            return src.slice(window.location.origin.length);
        }
        if (/^https?:\/\/[^/]+\/upload\//.test(src)) {
            return src.replace(/^https?:\/\/[^/]+/, "");
        }
        return src;
    } catch {
        return src;
    }
};

const isRemote = (src: string) => {
    if (typeof window !== "undefined") {
        return src.startsWith("http") && !src.includes(window.location.host);
    }
    return false;
};

type UploadResponseData = {
    path: string;
    fullUrl: string;
    name: string;
    type: string;
    size: number;
};

type UploadResponse = {
    success: boolean;
    status: number;
    message?: string;
    data?: UploadResponseData;
};

const FileUploader: React.FC<FileUploaderProps> = ({
    value = "",
    onChange,
    acceptedFileTypes = ["image/*"],
    label,
    allowMultiple = false,
    name = "thumbnail",
    maxFiles = 1,
    disabled = false,
    className = "",
    isLoading = false,
    folder,
    hint,
}) => {
    const [preview, setPreview] = useState<string>(value);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPreview(value || "");
    }, [value]);

    const multiple =
        allowMultiple && (typeof maxFiles === "undefined" || maxFiles > 1);

    const resetState = () => {
        setPreview("");
        setErrorMsg("");
        if (onChange) onChange(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg("");
        const file = e.target.files?.[0];
        if (!file) {
            resetState();
            return;
        }
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("folder", folder);

            const res = await fetch("/api/pub-upload", {
                method: "POST",
                body: formData,
            });

            let json: UploadResponse;
            try {
                json = await res.json();
            } catch {
                setErrorMsg("Upload gagal. Server error.");
                toast.error("Upload gagal. Server error.");
                resetState();
                return;
            }

            if (json.status === 200 && json.data && json.data.path) {
                setPreview(json.data.path);
                if (onChange) onChange(json.data.path);
                setErrorMsg("");
            } else {
                resetState();
                setErrorMsg(json?.message || "Upload gagal.");
                toast.error(json?.message || "Upload gagal.");
            }
        } catch {
            resetState();
            setErrorMsg("Terjadi kesalahan saat mengupload file.");
            toast.error("Terjadi kesalahan saat mengupload file.");
        } finally {
            setUploading(false);
        }
    };

    const handleClearFile = () => {
        resetState();
    };

    return (
        <div className={className}>
            {label && <label className="block text-sm font-medium mb-2">{label}</label>}
            {hint && !preview && (
                <div className="mb-2 text-xs text-gray-400 dark:text-gray-500">{hint}</div>
            )}
            {preview ? (
                <div className="mb-2">
                    {isImageFile(preview) ? (
                        <span className="block max-h-48 overflow-hidden rounded border mb-2 relative aspect-square w-32">
                            <Image
                                src={getNormalizedImageSrc(preview)}
                                alt="preview"
                                className="object-cover"
                                fill
                                sizes="128px"
                                unoptimized={isRemote(preview)}
                            />
                        </span>
                    ) : (
                        <a
                            href={preview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 underline break-all text-sm"
                        >
                            {preview}
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={handleClearFile}
                        className="mt-1 text-xs text-red-500 underline"
                        disabled={disabled || uploading || isLoading}
                    >
                        Hapus
                    </button>
                </div>
            ) : (
                <Input
                    type="file"
                    ref={inputRef}
                    name={name}
                    accept={acceptedFileTypes.join(",")}
                    onChange={handleFileChange}
                    disabled={disabled || uploading || isLoading}
                    multiple={multiple}
                />
            )}
            {(uploading || isLoading) && (
                <div className="text-xs text-gray-500 mt-1">Uploading...</div>
            )}
            {errorMsg && (
                <div className="text-xs text-red-500 mt-1">{errorMsg}</div>
            )}
        </div>
    );
};

export default FileUploader;

