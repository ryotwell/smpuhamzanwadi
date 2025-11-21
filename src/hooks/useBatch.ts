"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "@/lib/axios";

import { APIPATHS } from "@/lib/constants";
import { Batch } from "@/types/model";
import { BatchFields, batchSchema } from "@/app/admin/batchs/comps/form";
import { collectMessages, showError } from "@/lib/utils";

export type BatchFormMode = "CREATE" | "UPDATE";

type IUseBatch = {
    batch: Batch;
    formMode: BatchFormMode;
};

const useBatch = ({ batch, formMode = "CREATE" }: IUseBatch) => {
    const {
        control,
        trigger,
        formState: { errors },
        getValues,
        reset: resetForm,
    } = useForm<BatchFields>({
        resolver: zodResolver(batchSchema),
        mode: "onTouched",
        defaultValues: {
            name: batch?.name || "",
            // is_active: batch?.is_active ? 'ACTIVE' : 'INACTIVE',
            is_active: batch?.is_active ? true : false,
            start_date: batch?.start_date || null,
            end_date: batch?.end_date || null,
        },
    });

    const [submitLoading, setSubmitLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = await trigger();
        if (!isValid) {
            showError("Periksa kembali isian. Pastikan semua kolom wajib diisi dengan benar.");
            return;
        }

        setSubmitLoading(true);

        try {
            const batchFields = getValues();

            const payload = {
                ...batchFields,
                year: new Date().getFullYear(),
                // is_active: batchFields.is_active === 'ACTIVE' ? true : false,
                is_active: batchFields.is_active ? true : false,
            }

            console.log(payload);

            let successMessage = "";

            if (formMode === "UPDATE") {
                successMessage = "Data batch berhasil diperbarui.";
                await axios.put(`${APIPATHS.UPDATEBATCH}/${batch.id}`, payload);
            } else {
                successMessage = "Data batch berhasil ditambahkan.";
                await axios.post(APIPATHS.STOREBATCH, payload);
            }

            if (formMode === "CREATE") {
                resetFormInputs();
            }

            toast.success(successMessage);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            showError(collectMessages(err).toString())
        } finally {
            setSubmitLoading(false);
        }
    };

    const resetFormInputs = () => {
        resetForm({
            name: batch?.name || "",
            // is_active: batch?.is_active ? 'ACTIVE' : 'INACTIVE',
            is_active: batch?.is_active ? true : false,
            start_date: batch?.start_date || null,
            end_date: batch?.end_date || null,
        });
    };

    return {
        control,
        errors,
        getValues,
        trigger,
        submitLoading,
        onSubmit,
        resetFormInputs,
    };
};

export default useBatch;