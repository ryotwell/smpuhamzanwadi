"use client"

import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Requirement } from "@/types/model";
import useRequirement from "@/hooks/useRequirement";

export type RequirementFormMode = "CREATE" | "UPDATE";

export const requirementSchema = z.object({
    description: z.string().min(1, "Description is required"),
});

export type RequirementFields = z.infer<typeof requirementSchema>;

interface IRequirementFormProps {
    requirement?: Requirement;
    formMode: RequirementFormMode;
    onSuccess?: () => void;
}

export const RequirementForm: FC<IRequirementFormProps> = ({ requirement, formMode, onSuccess }) => {
    const { control, onSubmit, errors } = useRequirement({ requirement, formMode, onSuccess });

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {formMode === 'CREATE' ? 'Add New Requirement' : 'Edit Requirement'}
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Please fill in the requirement description.
                    </p>
                </div>
            </div>

            <form className="w-full space-y-5" onSubmit={onSubmit}>
                <div>
                    <div className="mb-1 font-medium text-sm">Description</div>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <Input
                                id="description"
                                type="text"
                                {...field}
                                placeholder="Enter requirement description"
                            />
                        )}
                    />
                    {errors.description && (
                        <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.description.message}
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
