"use client"

import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Faq } from "@/types/model";
import useFaq from "@/hooks/useFaq";

export type FaqFormMode = "CREATE" | "UPDATE";

export const faqSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
});

export type FaqFields = z.infer<typeof faqSchema>;

interface IFaqFormProps {
    faq?: Faq;
    formMode: FaqFormMode;
    onSuccess?: () => void;
}

export const FaqForm: FC<IFaqFormProps> = ({ faq, formMode, onSuccess }) => {
    const { control, onSubmit, errors } = useFaq({ faq, formMode, onSuccess });

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {formMode === 'CREATE' ? 'Add New FAQ' : 'Edit FAQ'}
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Please fill in the question and answer.
                    </p>
                </div>
            </div>

            <form className="w-full space-y-5" onSubmit={onSubmit}>
                <div>
                    <div className="mb-1 font-medium text-sm">Question</div>
                    <Controller
                        control={control}
                        name="question"
                        render={({ field }) => (
                            <Input
                                id="question"
                                type="text"
                                {...field}
                                placeholder="Enter question"
                            />
                        )}
                    />
                    {errors.question && (
                        <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.question.message}
                        </p>
                    )}
                </div>

                <div>
                    <div className="mb-1 font-medium text-sm">Answer</div>
                    <Controller
                        control={control}
                        name="answer"
                        render={({ field }) => (
                            <Input
                                id="answer"
                                type="text"
                                {...field}
                                placeholder="Enter answer"
                            />
                        )}
                    />
                    {errors.answer && (
                        <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.answer.message}
                        </p>
                    )}
                </div>

                <Button type="submit">
                    {formMode === 'CREATE' ? 'Create' : 'Update'}
                </Button>
            </form>
        </div>
    );
};
