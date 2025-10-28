"use client"

import React, { useEffect, useRef } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';

function Editor() {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);

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
        formData.append('image', file);

        try {
            // Simulate upload
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('https://smkn01selong.sch.id/wp-content/uploads/2025/09/539991532_1360216509442925_5983155205812494973_n-1100x600.jpg');
                }, 1000);
            });
        } catch (err) {
            throw new Error('Image upload failed');
        }
    };

    useEffect(() => {
        // Only initialize quill once -- don't do double init!
        if (
            typeof window !== "undefined" &&
            editorRef.current &&
            !quillRef.current
        ) {
            import('quill').then((QuillModule) => {
                require('quill/dist/quill.snow.css');
                const Quill = QuillModule.default;

                // Custom image handler
                function imageHandler(this: any) {
                    const quill = this.quill;
                    selectImageFile().then(async (file) => {
                        if (file) {
                            try {
                                const imageUrl = await uploadImage(file);
                                const range = quill.getSelection(true);
                                quill.insertEmbed(range.index, 'image', imageUrl, 'user');
                                quill.setSelection(range.index + 1);
                            } catch (err) {
                                alert('Image upload failed.');
                            }
                        }
                    });
                }

                // Do not clear or re-initialize if already initialized
                if (!quillRef.current && editorRef.current) {
                    // Make sure container is empty before init
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
                                        { 'indent': '-1'}, { 'indent': '+1' }
                                    ],
                                    [{ 'direction': 'rtl' }, { 'align': [] }],
                                    ['link', 'image', 'video', 'formula'],
                                    ['clean']
                                ],
                                handlers: {
                                    image: imageHandler
                                }
                            }
                        }
                    });
                    quillRef.current = quillInstance;
                }
            });
        }
        return () => {
            // Clean up on unmount: only if quillRef.current exists
            if (quillRef.current) {
                if (editorRef.current) {
                    editorRef.current.innerHTML = '';
                }
                quillRef.current = null;
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (quillRef.current) {
            const content = quillRef.current.root.innerHTML;
            try {
                await axios.post('/api/post', { content });
            } catch (error) {
                alert('Failed to submit post.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                <div ref={editorRef} style={{ minHeight: 200 }} />
                <Button
                    className="mt-4"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default Editor;