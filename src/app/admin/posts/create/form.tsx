"use client";

import React, { useRef, useState } from "react";
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
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Editor from "./comps/Editor";

// --- Validation and form lib imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Register FilePond plugin
registerPlugin(FilePondPluginImagePreview);

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

type CreatePostValues = z.infer<typeof createPostSchema>;

const defaultValues: CreatePostValues = {
    title: "",
    thumbnail: "",
    description: "",
    content: "",
    published: false,
    publishedAt: "",
    category: "" as any,
};

export default function CreatePostForm() {
    // filepond states
    const [files, setFiles] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const uploadingRef = useRef(false);
    const lastUploadedFileName = useRef<string | null>(null);

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
        defaultValues,
        mode: "onBlur",
    });

    const watchingPublished = watch("published");
    const watchingThumbnail = watch("thumbnail");

    // FilePond handler for single thumbnail upload
    const handleThumbnailUpdate = async (fileItems: any[]) => {
        setFiles(fileItems);

        // Prevent duplicate/overlapping uploads
        if (uploadingRef.current) {
            return;
        }

        if (fileItems.length > 0) {
            const file = fileItems[0].file;

            if (!file) {
                setValue("thumbnail", "");
                lastUploadedFileName.current = null;
                return;
            }
            if (
                file.name === lastUploadedFileName.current &&
                getValues("thumbnail")
            ) {
                // duplicate, skip
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
                    setValue("thumbnail", json.data.path, { shouldValidate: true });
                    lastUploadedFileName.current = file.name;
                    toast.success("Thumbnail uploaded successfully");
                } else {
                    setValue("thumbnail", "");
                    lastUploadedFileName.current = null;
                    toast.error(json.message || "Failed to upload thumbnail");
                }
            } catch (error) {
                setValue("thumbnail", "");
                lastUploadedFileName.current = null;
                toast.error("Failed to upload thumbnail");
            } finally {
                uploadingRef.current = false;
                setUploading(false);
            }
        } else {
            // no file
            setValue("thumbnail", "");
            lastUploadedFileName.current = null;
        }
    };

    // Form submit handler
    const onSubmit = async (data: CreatePostValues) => {
        // ensure thumbnail upload completed (sync with FilePond)
        if (files.length > 0 && !data.thumbnail) {
            toast.error("Mohon tunggu hingga thumbnail selesai di-upload.");
            return;
        }

        // prepare payload
        const payload = {
            ...data,
            thumbnail: data.thumbnail ? data.thumbnail : null,
            description: data.description ? data.description : null,
            publishedAt: data.published
                ? data.publishedAt
                    ? data.publishedAt
                    : new Date().toISOString().slice(0, 16)
                : null,
            category: data.category || null,
        };
        console.log(JSON.stringify(payload, null, 2));

        try {
            await axios.post("/posts", payload);
            toast.success("Post created successfully!");
            reset(defaultValues);
            setFiles([]);
            lastUploadedFileName.current = null;
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || "Failed to create post"
            );
        }
    };

    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                    <div className="w-full">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Create a new Post
                        </h3>
                        <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                            Fill out the form below to publish a new post.
                        </p>
                    </div>
                    <div className="flex items-start w-full gap-3 sm:justify-end">
                        tab
                    </div>
                </div>

                <div className="w-full">
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
                                <FilePond
                                    files={files}
                                    onupdatefiles={handleThumbnailUpdate}
                                    allowMultiple={false}
                                    name="thumbnail"
                                    labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                                    acceptedFileTypes={["image/*"]}
                                    imagePreviewHeight={190}
                                    required={false}
                                    maxFiles={1}
                                    disabled={uploading}
                                />
                                {uploading && (
                                    <div className="text-xs text-gray-500 mt-2">Uploading thumbnail...</div>
                                )}
                                {watchingThumbnail && !uploading && (
                                    <div className="text-xs text-green-600 mt-2">Thumbnail uploaded</div>
                                )}
                                {errors.thumbnail && typeof errors.thumbnail.message === "string" && (
                                    <div className="text-xs text-red-500 mt-2">{errors.thumbnail.message}</div>
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
                                        className="mb-2"
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
                                {uploading ? "Uploading..." : isSubmitting ? "Saving..." : "Create Post"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
