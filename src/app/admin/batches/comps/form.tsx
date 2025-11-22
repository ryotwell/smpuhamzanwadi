"use client"

import React, { FC } from "react";

// --- Validation and form lib imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { APIPATHS } from "@/lib/constants";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";

import { Batch, Student } from "@/types/model";
import { DatePicker } from "@/components/ui/date-picker";
import useBatch from "@/hooks/useBatch";
import { Switch } from "@/components/ui/switch";

export type BatchFormMode = "CREATE" | "UPDATE";

export const batchSchema = z.object({
    name: z.string().min(1, "Tahun ajaran wajib diisi"),
    // is_active: z.enum(["ACTIVE", "INACTIVE"]),
    is_active: z.boolean(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
});

export type BatchFields = z.infer<typeof batchSchema>;

interface StartDatePickerProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

interface EndDatePickerProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

const StartDatePicker = ({
    value,
    onChange,
    error,
}: StartDatePickerProps) => {
    return (
        <DatePicker id="start-date" label="Start date" value={value} onChange={onChange} error={error} />
    )
}
const EndDatePicker = ({
    value,
    onChange,
    error,
}: EndDatePickerProps) => {
    return (
        <DatePicker id="end-date" label="End date" value={value} onChange={onChange} error={error} />
    )
}

interface IBatchFormProps {
    batch: Batch;
    formMode: BatchFormMode
};

type IIsActiveSwitchProps  = {
    control: Control<BatchFields>;
    errors: FieldErrors<BatchFields>;
    hint?: string
};

export const IsActiveSwitch = ({
    control,
    errors,
    hint,
}: IIsActiveSwitchProps) => {
    return (
        <div>
            <div className="mb-1 font-medium text-sm">Is Active</div>
            <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                    <Switch
                        id="is_active"
                        onClick={(value => field.onChange(!field.value))}
                        checked={field.value}
                    />
                )}
            />
            {hint && (
                <div className="text-xs text-gray-500 mt-1">
                    {hint}
                </div>
            )}
            {errors['is_active'] && (
                <p className="text-red-600 dark:text-red-400 text-xs">
                    {errors['is_active']?.message as string}
                </p>
            )}
        </div>
    )
}

export const BatchForm: FC<IBatchFormProps> = ({ batch, formMode }) => {

    const { control, onSubmit, errors } = useBatch({ batch, formMode })

    const textInput = (
        name: keyof BatchFields,
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
                        {formMode === 'CREATE' ? 'Crete a new Batch' : 'Edit Batch ' + (batch?.name ?? '')}
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Please adjust the batch (academic year) data in the following form accurately and completely.
                    </p>
                </div>
            </div>

            <form className="w-full space-y-5" onSubmit={onSubmit}>
                {textInput("name", "Tahun Ajaran", "text", "Masukkan tahun ajaran", true)}
                <Controller
                    control={control}
                    name="start_date"
                    render={({ field }) => (
                        <StartDatePicker
                            value={field.value as string}
                            onChange={field.onChange}
                            error={errors.start_date?.message as string}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="end_date"
                    render={({ field }) => (
                        <EndDatePicker
                            value={field.value as string}
                            onChange={field.onChange}
                            error={errors.end_date?.message as string}
                        />
                    )}
                />
                <IsActiveSwitch
                    control={control}
                    errors={errors}
                    hint="Jika batch ini adalah tahun ajaran yang sedang berjalan."
                />

                <Button>
                    {formMode === 'CREATE' ? 'Create' : 'Update'}
                </Button>
            </form>
        </div>
    );
}