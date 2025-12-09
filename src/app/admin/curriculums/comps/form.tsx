"use client"

import React, { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";

// --- Validation and form lib imports
import { Controller, Control, FieldErrors } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

import { Curriculum, CurriculumCategory } from "@/types/model";
import useCurriculum from "@/hooks/useCurriculum";

export type CurriculumFormMode = "CREATE" | "UPDATE";

const CURRICULUM_CATEGORIES: { label: string; value: CurriculumCategory }[] = [
    { label: "Ekstrakurikuler", value: "EXTRACURRICULAR" },
    { label: "Program Unggulan", value: "PROGRAM UNGGULAN" },
    { label: "Ko-Kurikuler", value: "KO-CULLICULAR" },
];

export const curriculumSchema = z.object({
    name: z.string().min(1, "Nama kurikulum wajib diisi"),
    image: z.string().nullable().optional(),
    category: z.enum(["EXTRACURRICULAR", "PROGRAM UNGGULAN", "KO-CULLICULAR"]).nullable().optional(),
    description: z.string().nullable().optional(),
});

export type CurriculumFields = z.infer<typeof curriculumSchema>;

interface ICurriculumFormProps {
    curriculum: Curriculum;
    formMode: CurriculumFormMode
};

type ICategorySelectProps = {
    control: Control<CurriculumFields>;
    errors: FieldErrors<CurriculumFields>;
};

const CategorySelect = ({
    control,
    errors,
}: ICategorySelectProps) => {
    return (
        <div>
            <div className="mb-1 font-medium text-sm">Kategori</div>
            <Controller
                control={control}
                name="category"
                render={({ field }) => (
                    <Select
                        value={field.value || undefined}
                        onValueChange={(value) => field.onChange(value as CurriculumCategory | null)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="EXTRACURRICULAR">Ekstrakurikuler</SelectItem>
                            <SelectItem value="PROGRAM UNGGULAN">Program Unggulan</SelectItem>
                            <SelectItem value="KO-CULLICULAR">Ko-Kurikuler</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.category && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                    {errors.category?.message as string}
                </p>
            )}
        </div>
    );
};

export const CurriculumForm: FC<ICurriculumFormProps> = ({ curriculum, formMode }) => {
    const { control, onSubmit, errors, getValues, setValue, watch, submitLoading } = useCurriculum({ curriculum, formMode });

    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const watchingImage = watch("image");

    // Sync preview when image changes or curriculum is loaded
    useEffect(() => {
        if (watchingImage || curriculum?.image) {
            setPreview(watchingImage || curriculum?.image || null);
        } else {
            setPreview(null);
        }
    }, [watchingImage, curriculum?.image]);

    // Helper functions for image handling
    const getNormalizedImageSrc = (src: string) => {
        try {
            if (typeof window !== "undefined" && src.startsWith(window.location.origin)) {
                return src.slice(window.location.origin.length);
            }
            if (/^https?:\/\/[^/]+\/upload\//.test(src)) {
                return src.replace(/^https?:\/\/[^/]+/, "");
            }
            // Handle relative paths
            if (src.startsWith('/')) {
                return src;
            }
            return `/${src}`;
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

    // Handle image file upload
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setPreview(null);
            setValue("image", null);
            return;
        }

        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Tipe file tidak valid. Hanya PNG, JPG, dan JPEG yang diizinkan");
            if (inputRef.current) inputRef.current.value = "";
            return;
        }

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
                setPreview(json.data.path);
                toast.success("Gambar berhasil diupload");
            } else {
                setValue("image", null);
                setPreview(null);
                toast.error(json.message || "Gagal mengupload gambar");
            }
        } catch {
            setValue("image", null);
            setPreview(null);
            toast.error("Gagal mengupload gambar");
        } finally {
            setUploading(false);
        }
    };

    // Handle image removal
    const handleRemoveImage = () => {
        setPreview(null);
        setValue("image", null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const textInput = (
        name: keyof CurriculumFields,
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

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {formMode === 'CREATE' ? 'Buat Kurikulum Baru' : 'Edit Kurikulum ' + (curriculum?.name ?? '')}
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Silakan lengkapi data kurikulum pada formulir berikut dengan akurat dan lengkap.
                    </p>
                </div>
            </div>

            <form className="w-full space-y-5" onSubmit={onSubmit}>
                {textInput("name", "Nama Kurikulum", "text", "Masukkan nama kurikulum", true)}
                
                <CategorySelect
                    control={control}
                    errors={errors}
                />

                <div>
                    <div className="mb-1 font-medium text-sm">Gambar</div>
                    <Input
                        ref={inputRef}
                        type="file"
                        id="image"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleImageChange}
                        disabled={uploading || submitLoading}
                        className={`cursor-pointer ${preview ? 'hidden' : ''}`}
                    />
                    {preview && (
                        <div className="mb-2">
                            <div className="relative w-full max-w-xs mb-2 rounded-lg border overflow-hidden">
                                <div className="relative aspect-video w-full">
                                    <Image
                                        src={getNormalizedImageSrc(preview)}
                                        alt="Preview gambar"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        unoptimized={isRemote(preview)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRemoveImage}
                                    disabled={uploading || submitLoading}
                                    className="text-xs"
                                >
                                    Hapus Gambar
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => inputRef.current?.click()}
                                    disabled={uploading || submitLoading}
                                    className="text-xs"
                                >
                                    Ganti Gambar
                                </Button>
                            </div>
                        </div>
                    )}
                    {uploading && (
                        <div className="text-xs text-gray-500 mt-2">Mengupload gambar...</div>
                    )}
                    {watchingImage && !uploading && preview && (
                        <div className="text-xs text-green-600 mt-2">Gambar siap</div>
                    )}
                    {errors.image && (
                        <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                            {errors.image?.message as string}
                        </p>
                    )}
                    {!preview && (
                        <p className="text-xs text-gray-500 mt-1">
                            Format yang didukung: PNG, JPG, JPEG
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
                                placeholder="Masukkan deskripsi kurikulum"
                            />
                        )}
                    />
                    {errors.description && (
                        <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                            {errors.description?.message as string}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={uploading || submitLoading}>
                    {uploading || submitLoading 
                        ? "Mengupload..." 
                        : formMode === 'CREATE' 
                            ? 'Buat' 
                            : 'Perbarui'}
                </Button>
            </form>
        </div>
    );
}
