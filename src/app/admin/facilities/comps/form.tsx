"use client"

import React, { FC, useRef, useState } from "react";


// --- Validation and form lib imports
import { Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Facility } from "@/types/model";
import useFacility from "@/hooks/useFacility";

export type FacilityFormMode = "CREATE" | "UPDATE";

export const facilitySchema = z.object({
    name: z.string().min(1, "Nama fasilitas wajib diisi"),
    image: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
});

export type FacilityFields = z.infer<typeof facilitySchema>;

interface IFacilityFormProps {
    facility: Facility;
    formMode: FacilityFormMode;
}

export const FacilityForm: FC<IFacilityFormProps> = ({ facility, formMode }) => {
    const { control, onSubmit, errors, getValues, setValue, watch } = useFacility({ facility, formMode });

    const [uploading, setUploading] = useState(false);
    const uploadingRef = useRef(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const watchingImage = watch("image");

    const handleFile = React.useCallback(async (file: File) => {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));

        // Prevent concurrent uploads
        if (uploadingRef.current) {
            return;
        }

        uploadingRef.current = true;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file, file.name);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const json = await res.json();
            if (json.status === 200 && json.data && json.data.path) {
                setValue("image", json.data.path, { shouldValidate: true });
                toast.success("Gambar berhasil diupload");
            } else {
                setValue("image", null);
                toast.error(json.message || "Gagal mengupload gambar");
            }
        } catch {
            setValue("image", null);
            toast.error("Gagal mengupload gambar");
        } finally {
            uploadingRef.current = false;
            setUploading(false);
        }
    }, [setValue]);

    // Handle change with shadcn ui input file
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedFile(null);
            setPreviewUrl(null);
            setValue("image", null);
            return;
        }
        await handleFile(file);
    };

    // Handle paste event
    React.useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const file = items[i].getAsFile();
                    if (file) {
                        e.preventDefault();
                        handleFile(file);
                        return;
                    }
                }
            }
        };

        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, [handleFile]);

    const textInput = (
        name: keyof FacilityFields,
        label: string,
        type = "text",
        placeholder = "",
        required?: boolean
    ) => (
        <div>
            <div className="mb-1 font-medium text-sm">{label}</div>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Input
                        id={name}
                        type={type}
                        {...field as any}
                        placeholder={placeholder}
                        required={required}
                    />
                )}
            />
            {errors[name] && <p className="text-red-600 dark:text-red-400 text-xs">{errors[name]?.message as string}</p>}
        </div>
    );

    // For displaying image preview logic
    const effectivePreview = previewUrl
        || (watchingImage || facility?.image)
        ? (watchingImage || facility?.image)
        : null;
    // Normalize source for Image
    const imageSrc =
        effectivePreview
            ? effectivePreview.startsWith("http")
                ? effectivePreview
                : effectivePreview.startsWith("/")
                    ? effectivePreview
                    : `/${effectivePreview}`
            : "";

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {formMode === 'CREATE' ? 'Buat Fasilitas Baru' : 'Edit Fasilitas ' + (facility?.name ?? '')}
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Silakan lengkapi data fasilitas pada formulir berikut dengan akurat dan lengkap.
                    </p>
                </div>
            </div>

            <form className="w-full space-y-5" onSubmit={onSubmit}>
                {textInput("name", "Nama Fasilitas", "text", "Masukkan nama fasilitas", true)}

                <div>
                    <div className="mb-1 font-medium text-sm">Gambar</div>
                    <Controller
                        control={control}
                        name="image"
                        render={() => (
                            <Input
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        )}
                    />
                    {(previewUrl || watchingImage || facility?.image) && (
                        <div className="mt-2">
                            <div className="text-xs text-gray-500 mb-2">
                                Gambar saat ini: {watchingImage || facility?.image} (atau paste gambar baru)
                            </div>
                            <div className="relative w-32 h-32 rounded border overflow-hidden">
                                {imageSrc && (
                                    <img
                                        src={imageSrc}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {errors.image && (
                        <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                            {errors.image?.message as string}
                        </p>
                    )}
                </div>

                <div>
                    <div className="mb-1 font-medium text-sm">Deskripsi</div>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <textarea
                                className="w-full border px-3 py-2 rounded min-h-[120px] mt-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                id="description"
                                {...field}
                                value={field.value || ""}
                                placeholder="Masukkan deskripsi fasilitas"
                            />
                        )}
                    />
                    {errors.description && (
                        <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                            {errors.description?.message as string}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={uploading}>
                    {uploading ? "Mengupload..." : formMode === 'CREATE' ? 'Buat' : 'Perbarui'}
                </Button>
            </form>
        </div>
    );
}
