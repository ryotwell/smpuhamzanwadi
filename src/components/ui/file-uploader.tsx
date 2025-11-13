"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export type AllowedFolders = 'pas-foto' | 'kartu-keluarga' | 'akta-kelahiran' | 'ijazah'

type BasicUploaderProps = {
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

export default function FileUploader({
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
}: BasicUploaderProps) {
    const [preview, setPreview] = useState<string>(value || "");
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        setPreview(value || "");
    }, [value]);

    // disables multiple due to logic in code, but keep for extensibility
    const multiple = allowMultiple && (typeof maxFiles === "undefined" || maxFiles > 1);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg(""); // clear previous error
        const file = e.target.files?.[0];
        if (!file) {
            setPreview("");
            if (onChange) onChange(null);
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
            let json;
            try {
                json = await res.json();
            } catch {
                setErrorMsg("Upload gagal. Server error.");
                toast.error("Upload gagal. Server error.");
                setPreview("");
                if (onChange) onChange(null);
                return;
            }

            if (json.status === 200 && json.data && json.data.path) {
                setPreview(json.data.path);
                if (onChange) onChange(json.data.path);
                setErrorMsg("");
            } else {
                setPreview("");
                setErrorMsg(json?.message || "Upload gagal.");
                toast.error(json?.message || "Upload gagal.");
                if (onChange) onChange(null);
            }
        } catch {
            setPreview("");
            setErrorMsg("Terjadi kesalahan saat mengupload file.");
            toast.error("Terjadi kesalahan saat mengupload file.");
            if (onChange) onChange(null);
        } finally {
            setUploading(false);
        }
    };

    const clearFile = () => {
        setPreview("");
        setErrorMsg("");
        if (onChange) onChange(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            {/* Display hint if provided */}
            {hint && !preview && (
                <div className="mb-2 text-xs text-gray-400 dark:text-gray-500">{hint}</div>
            )}
            {preview && (
                <div className="mb-2">
                    {/* Preview image/file if it's an image */}
                    {preview.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="max-h-48 rounded border mb-2"
                        />
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
                        onClick={clearFile}
                        className="mt-1 text-xs text-red-500 underline"
                        disabled={disabled || uploading || isLoading}
                    >
                        Hapus
                    </button>
                </div>
            )}
            {!preview && (
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
}
