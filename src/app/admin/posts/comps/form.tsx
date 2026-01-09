"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import axios from "@/lib/axios";
import Image from "next/image";
import Editor from "../comps/Editor";

// --- Validation and form lib imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { APIPATHS } from "@/lib/constants";


const POST_CATEGORIES = [
    { label: "Berita", value: "BERITA" },
    { label: "Artikel", value: "ARTIKEL" },
    { label: "Informasi", value: "INFORMASI" },
];

// Corrected z.enum usage: remove `errorMap` and use `message`
const createPostSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters"),
    thumbnail: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    content: z.string().min(20, "Content must be at least 20 characters"),
    published: z.boolean(),
    publishedAt: z
        .string()
        .optional()
        .nullable()
        .refine(
            (val) => !val || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(val) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val),
            { message: "Tanggal dan waktu harus format valid datetime" }
        ),
    category: z.enum(["BERITA", "ARTIKEL", "INFORMASI"], {
        message: "Please select a category",
    }),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;

const defaultValues: CreatePostValues = {
    title: "",
    thumbnail: "",
    description: "",
    content: "",
    published: false,
    publishedAt: "",
    category: "BERITA",
};

/**
 * Form to create/edit post.
 * Accepts optional `initialValues` prop for pre-filling data (edit mode).
 * Accepts isUpdate to specify create/update mode, and editId for update.
 */
type CreatePostFormProps = {
    initialValues?: Partial<CreatePostValues>;
    onSubmitOverride?: (data: CreatePostValues) => Promise<void>;
    submitLabel?: string;
    isUpdate?: boolean;
    editId?: string | number; // specify the post id or slug if update
};

export default function CreatePostForm({
    initialValues,
    onSubmitOverride,
    submitLabel,
    isUpdate = false,
    editId
}: CreatePostFormProps) {
    // Determine merged initial values with fallback to defaultValues
    const mergedValues: CreatePostValues = {
        ...defaultValues,
        ...initialValues,
    };

    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // react-hook-form
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
        watch,
        trigger,
    } = useForm<CreatePostValues>({
        resolver: zodResolver(createPostSchema),
        defaultValues: mergedValues,
        mode: "onBlur",
    });

    // Sync form when initialValues changes (for edit mode)
    useEffect(() => {
        reset(mergedValues);
        // Set preview for existing thumbnail
        if (initialValues?.thumbnail) {
            setPreview(initialValues.thumbnail);
        } else {
            setPreview(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(initialValues)]);

    const watchingPublished = watch("published");
    const watchingThumbnail = watch("thumbnail");

    // Helper functions for image handling
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

    // Handle thumbnail file upload
    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setPreview(null);
            setValue("thumbnail", "");
            return;
        }

        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Only PNG, JPG, and JPEG are allowed");
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
                setValue("thumbnail", json.data.path, { shouldValidate: true });
                setPreview(json.data.path);
                toast.success("Thumbnail uploaded successfully");
            } else {
                setValue("thumbnail", "");
                setPreview(null);
                toast.error(json.message || "Failed to upload thumbnail");
            }
        } catch {
            setValue("thumbnail", "");
            setPreview(null);
            toast.error("Failed to upload thumbnail");
        } finally {
            setUploading(false);
        }
    };

    // Handle thumbnail removal
    const handleRemoveThumbnail = () => {
        setPreview(null);
        setValue("thumbnail", "");
        if (inputRef.current) inputRef.current.value = "";
    };

    // Form submit handler
    const handleInternalSubmit = async (data: CreatePostValues) => {
        // ensure thumbnail upload completed
        if (uploading) {
            toast.error("Mohon tunggu hingga thumbnail selesai di-upload.");
            return;
        }

        // prepare payload
        const payload = {
            ...data,
            thumbnail: data.thumbnail ? data.thumbnail : null,
            description: data.description ? data.description.replaceAll('../../../', '../../') : null,
            publishedAt: data.published
                ? data.publishedAt
                    ? data.publishedAt
                    : new Date().toISOString().slice(0, 16)
                : null,
            category: data.category || null,
        };

        // console.log({ isUpdate, editId, payload });

        try {
            if (isUpdate) {
                // Assume editId is the post id or slug as needed by API path
                if (!editId) {
                    toast.error("No post identifier provided for update.");
                    return;
                }
                await axios.put(`${APIPATHS.UPDATEPOST}/${editId}`, payload);
                toast.success("Post updated successfully!");
            } else {
                await axios.post(APIPATHS.STOREPOST, payload);
                toast.success("Post created successfully!");
                reset(defaultValues);
                setPreview(null);
                if (inputRef.current) inputRef.current.value = "";
            }
        } catch (err: unknown) {
            const message =
                err && typeof err === "object" && "response" in err &&
                    err.response && typeof err.response === "object" && "data" in err.response &&
                    err.response.data && typeof err.response.data === "object" && "message" in err.response.data &&
                    typeof err.response.data.message === "string"
                    ? err.response.data.message
                    : isUpdate
                        ? "Failed to update post"
                        : "Failed to create post";
            toast.error(message);
        }
    };

    // submit handler alias, may use legacy or custom for edit mode
    const onSubmit = onSubmitOverride || handleInternalSubmit;

    return (
        <>
            <>
                <>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 w-full"
                        autoComplete="off"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="title"
                                    >
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        {...register("title")}
                                        autoComplete="off"
                                    />
                                    {errors.title && (
                                        <span className="text-xs text-red-500">{errors.title.message}</span>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full border px-3 py-2 rounded min-h-[88px] mt-2"
                                        id="description"
                                        {...register("description")}
                                    />
                                    {errors.description && (
                                        <span className="text-xs text-red-500">{errors.description.message}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="thumbnail"
                                >
                                    Thumbnail
                                </label>
                                <Input
                                    ref={inputRef}
                                    type="file"
                                    id="thumbnail"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleThumbnailChange}
                                    disabled={uploading}
                                    className={`cursor-pointer ${preview ? 'hidden' : ''}`}
                                />
                                {preview && (
                                    <div className="mb-2">
                                        <div className="relative w-full max-w-xs mb-2 rounded-lg border overflow-hidden">
                                            <div className="relative aspect-video w-full">
                                                <Image
                                                    src={getNormalizedImageSrc(preview)}
                                                    alt="Thumbnail preview"
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
                                                onClick={handleRemoveThumbnail}
                                                disabled={uploading}
                                                className="text-xs"
                                            >
                                                Hapus Thumbnail
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => inputRef.current?.click()}
                                                disabled={uploading}
                                                className="text-xs"
                                            >
                                                Ganti Thumbnail
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {uploading && (
                                    <div className="text-xs text-gray-500 mt-2">Uploading thumbnail...</div>
                                )}
                                {watchingThumbnail && !uploading && preview && (
                                    <div className="text-xs text-green-600 mt-2">Thumbnail ready</div>
                                )}
                                {errors.thumbnail && typeof errors.thumbnail.message === "string" && (
                                    <div className="text-xs text-red-500 mt-2">{errors.thumbnail.message}</div>
                                )}
                                {!preview && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Format yang didukung: PNG, JPG, JPEG
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="content"
                            >
                                Content
                            </label>
                            <Controller
                                control={control}
                                name="content"
                                render={({ field }) => (
                                    <Editor
                                        value={field.value}
                                        onChange={(val: string) => field.onChange(val)}
                                        placeholder="Tulis konten di sini..."
                                    />
                                )}
                            />
                            {errors.content && (
                                <span className="text-xs text-red-500">{errors.content.message}</span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || ""}
                                            onValueChange={(val) => {
                                                field.onChange(val);
                                                trigger("category");
                                            }}
                                            required
                                        >
                                            <SelectTrigger id="category" aria-label="Category">
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {POST_CATEGORIES.map((cat) => (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category && (
                                    <span className="text-xs text-red-500">{errors.category.message}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                <Input
                                    type="checkbox"
                                    id="published"
                                    {...register("published")}
                                    className="w-auto"
                                    checked={!!watchingPublished}
                                    onChange={(e) => {
                                        setValue("published", e.target.checked);
                                        trigger("published");
                                    }}
                                />
                                <label htmlFor="published" className="text-sm">
                                    Published
                                </label>
                            </div>
                        </div>
                        {watchingPublished && (
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="publishedAt">
                                    Published At
                                </label>
                                <Input
                                    type="datetime-local"
                                    id="publishedAt"
                                    {...register("publishedAt")}
                                    className="w-full"
                                />
                                {errors.publishedAt && (
                                    <span className="text-xs text-red-500">{errors.publishedAt.message}</span>
                                )}
                            </div>
                        )}
                        <div>
                            <Button
                                type="submit"
                                disabled={uploading || isSubmitting}
                            >
                                {uploading
                                    ? "Uploading..."
                                    : isSubmitting
                                        ? (submitLabel && submitLabel !== "Create Post"
                                            ? submitLabel
                                            : (isUpdate ? "Saving..." : "Saving..."))
                                        : (submitLabel
                                            ? submitLabel
                                            : (isUpdate ? "Update Post" : "Create Post"))}
                            </Button>
                        </div>
                    </form>
                </>
            </>
        </>
    );
}
