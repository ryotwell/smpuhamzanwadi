"use client";

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

type EditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

const Editor: React.FC<EditorProps> = ({ value, onChange, placeholder = "", className = "" }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    // Helper: open file dialog and return selected file
    const selectImageFile = (): Promise<File | null> => {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = () => {
                if (input.files && input.files[0]) {
                    resolve(input.files[0]);
                } else {
                    resolve(null);
                }
            };
            input.click();
        });
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok && data.status === 200 && data.data?.path) {
                const imagePath: string = data.data.path;
                return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
            } else {
                throw new Error(data.message || 'Image upload failed');
            }
        } catch (err) {
            throw new Error('Image upload failed');
        }
    };

    // Initialize Quill and setup handlers
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            editorRef.current &&
            !quillRef.current
        ) {
            import('quill').then((QuillModule) => {
                const Quill = QuillModule.default;

                function imageHandler(this: { quill: Quill }) {
                    const quill = this.quill;
                    selectImageFile().then(async (file) => {
                        if (file) {
                            try {
                                const imageUrl = await uploadImage(file);
                                const range = quill.getSelection(true);
                                quill.insertEmbed(range.index, 'image', imageUrl, 'user');
                                quill.setSelection(range.index + 1);
                            } catch {
                                alert('Image upload failed.');
                            }
                        }
                    });
                }

                if (!quillRef.current && editorRef.current) {
                    editorRef.current.innerHTML = '';

                    const quillInstance = new Quill(editorRef.current, {
                        theme: 'snow',
                        modules: {
                            toolbar: {
                                container: [
                                    [{ 'font': [] }, { 'size': [] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'script': 'sub' }, { 'script': 'super' }],
                                    [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
                                    [
                                        { 'list': 'ordered' }, { 'list': 'bullet' },
                                        { 'indent': '-1' }, { 'indent': '+1' }
                                    ],
                                    [{ 'direction': 'rtl' }, { 'align': [] }],
                                    ['link', 'image', 'video', 'formula'],
                                    ['clean']
                                ],
                                handlers: {
                                    image: imageHandler
                                }
                            }
                        },
                        placeholder: placeholder,
                    });

                    // Set initial value
                    if (value) {
                        quillInstance.root.innerHTML = value;
                    }

                    // Only call onChange if content was actually changed by user
                    quillInstance.on('text-change', () => {
                        const html = quillInstance.root.innerHTML;
                        if (html !== value) {
                            onChange(html);
                        }
                    });

                    // Prevent Quill making parent page scroll on first toolbar use
                    quillInstance.root.addEventListener('focus', () => {
                        window.scrollTo({ top: window.scrollY });
                    });

                    quillRef.current = quillInstance;
                }
            });
        }
        const editorNode = editorRef.current;
        return () => {
            // Clean up on unmount: only if quillRef.current exists
            if (quillRef.current) {
                if (editorNode) {
                    editorNode.innerHTML = '';
                }
                quillRef.current = null;
            }
        };
        // Don't include 'value' in deps: see below for sync logic
        // eslint-disable-next-line
    }, []);

    // If value changes from outside (e.g. parent, form reset), sync Quill content
    useEffect(() => {
        if (quillRef.current && quillRef.current.root.innerHTML !== value) {
            // To prevent moving the caret, set the content only if it's different
            const sel = quillRef.current.getSelection();
            quillRef.current.root.innerHTML = value || "";
            // Optionally restore caret
            if (sel) {
                quillRef.current.setSelection(sel.index, sel.length, 'silent');
            }
        }
    }, [value]);

    return (
        <div
            className={`quill-editor-wrapper ${className}`}
        >
            <div ref={editorRef} style={{ minHeight: 200 }} />
        </div>
    );
};

export default Editor;