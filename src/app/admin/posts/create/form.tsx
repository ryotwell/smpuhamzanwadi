"use client";

import React, { useState, useRef } from "react";
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

// Add FilePond imports
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import the custom Editor component
import Editor from "./comps/Editor";

// Register FilePond plugin
registerPlugin(FilePondPluginImagePreview);

const POST_CATEGORIES = [
    { label: "Berita", value: "BERITA" },
    { label: "Artikel", value: "ARTIKEL" },
    { label: "Informasi", value: "INFORMASI" },
];

export default function CreatePostForm() {
    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        description: "",
        content: "",
        published: false,
        publishedAt: "",
        category: "",
    });

    // For FilePond file state
    const [files, setFiles] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);

    // Ref to prevent multiple concurrent uploads
    const uploadingRef = useRef(false);

    // FilePond onupdatefiles can sometimes cause async handler being called twice due
    // to React StrictMode and/or slow state sync between setFiles and the handler.
    // The fix: only run upload when fileItems actually changed by user and ignore duplicate/ghost calls.
    const lastUploadedFileName = useRef<string | null>(null);

    const handleThumbnailUpdate = async (fileItems: any[]) => {
        setFiles(fileItems);

        // Prevent duplicate/overlapping uploads
        if (uploadingRef.current) {
            return;
        }

        // Case: has file in pond
        if (fileItems.length > 0) {
            const file = fileItems[0].file;

            // Check if the file is the same as the last uploaded one and already saved in form state
            if (!file) {
                setForm((prev) => ({
                    ...prev,
                    thumbnail: ""
                }));
                lastUploadedFileName.current = null;
                return;
            }
            // If the file name is same as last uploaded AND we already have a thumbnail, skip
            if (
                file.name === lastUploadedFileName.current &&
                form.thumbnail
            ) {
                // Duplicate call, don't re-upload
                return;
            }
            uploadingRef.current = true;
            setUploading(true);
            try {
                const formData = new FormData();
                formData.append('file', file, file.name);
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const json = await res.json();
                if (json.status === 200 && json.data && json.data.path) {
                    setForm((prev) => ({
                        ...prev,
                        thumbnail: json.data.path // only the path string
                    }));
                    lastUploadedFileName.current = file.name;
                } else {
                    setForm((prev) => ({
                        ...prev,
                        thumbnail: ""
                    }));
                    lastUploadedFileName.current = null;
                    alert(json.message || "Failed to upload thumbnail");
                }
            } catch (error) {
                setForm((prev) => ({
                    ...prev,
                    thumbnail: ""
                }));
                lastUploadedFileName.current = null;
                alert("Failed to upload thumbnail");
            } finally {
                uploadingRef.current = false;
                setUploading(false);
            }
        } else {
            // No file: reset form state
            setForm((prev) => ({
                ...prev,
                thumbnail: ""
            }));
            lastUploadedFileName.current = null;
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCategoryChange = (value: string) => {
        setForm((prev) => ({
            ...prev,
            category: value,
        }));
    };

    // Handler for updating .content from Editor
    const handleContentChange = (val: string) => {
        setForm((prev) => ({
            ...prev,
            content: val,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Pastikan thumbnail sudah ter-upload jika ada file
        if (files.length > 0 && !form.thumbnail) {
            alert("Mohon tunggu hingga thumbnail selesai di-upload.");
            return;
        }

        // Prepare payload for backend (remove empty string fields, set undefined or null as needed)
        const payload: any = {
            ...form,
            thumbnail: form.thumbnail ? form.thumbnail : null,
            description: form.description ? form.description : null,
            publishedAt: form.published ? (form.publishedAt ? form.publishedAt : new Date().toISOString()) : null,
            category: form.category || null,
        };

        console.log(JSON.stringify(payload, null, 2));

        try {
            const res = await axios.post('/posts', payload);

            setForm({
                title: "",
                thumbnail: "",
                description: "",
                content: "",
                published: false,
                publishedAt: "",
                category: "",
            });
            setFiles([]);
            lastUploadedFileName.current = null;
        } catch (err: any) {
            alert("Failed to create post.");
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
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                    />
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
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                    />
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
                                    // show loading indicator if uploading
                                    disabled={uploading}
                                />
                                {uploading && (
                                    <div className="text-xs text-gray-500 mt-2">Uploading thumbnail...</div>
                                )}
                                {form.thumbnail && !uploading && (
                                    <div className="text-xs text-green-600 mt-2">Thumbnail uploaded</div>
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
                            <Editor
                                value={form.content}
                                onChange={handleContentChange}
                                placeholder="Tulis konten di sini..."
                                className="mb-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Category (shadcn Select compliant) */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                                <Select
                                    value={form.category}
                                    onValueChange={handleCategoryChange}
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
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                <Input
                                    type="checkbox"
                                    id="published"
                                    name="published"
                                    checked={form.published}
                                    onChange={handleChange}
                                    className="w-auto"
                                />
                                <label htmlFor="published" className="text-sm">Published</label>
                            </div>
                        </div>
                        {form.published && (
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="publishedAt">
                                    Published At
                                </label>
                                <Input
                                    type="datetime-local"
                                    id="publishedAt"
                                    name="publishedAt"
                                    value={form.publishedAt}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                        )}
                        <div>
                            <Button
                                type="submit"
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Create Post"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}
