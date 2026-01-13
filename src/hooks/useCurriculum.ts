"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "@/lib/axios";

import { APIPATHS } from "@/lib/constants";
import { Curriculum } from "@/types/model";
import { CurriculumFields, curriculumSchema } from "@/app/admin/curriculums/comps/form";
import { collectMessages, showError } from "@/lib/utils";

export type CurriculumFormMode = "CREATE" | "UPDATE";

type IUseCurriculum = {
    curriculum: Curriculum;
    formMode: CurriculumFormMode;
};

const useCurriculum = ({ curriculum, formMode = "CREATE" }: IUseCurriculum) => {
    const {
        control,
        trigger,
        formState: { errors },
        getValues,
        setValue,
        watch,
        reset: resetForm,
    } = useForm<CurriculumFields>({
        resolver: zodResolver(curriculumSchema),
        mode: "onTouched",
        defaultValues: {
            name: curriculum?.name || "",
            image: curriculum?.image || null,
            category: curriculum?.category || null,
            description: curriculum?.description || null,
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
            const curriculumFields = getValues();

            const payload = {
                name: curriculumFields.name,
                image: curriculumFields.image || null,
                category: curriculumFields.category || null,
                description: curriculumFields.description || null,
            };

            let successMessage = "";

            if (formMode === "UPDATE") {
                successMessage = "Data kurikulum berhasil diperbarui.";
                await axios.put(`${APIPATHS.UPDATECURRICULUM}/${curriculum.id}`, payload);
            } else {
                successMessage = "Data kurikulum berhasil ditambahkan.";
                await axios.post(APIPATHS.STORECURRICULUM, payload);
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
            name: curriculum?.name || "",
            image: curriculum?.image || null,
            category: curriculum?.category || null,
            description: curriculum?.description || null,
        });
    };

    return {
        control,
        errors,
        getValues,
        setValue,
        watch,
        trigger,
        submitLoading,
        onSubmit,
        resetFormInputs,
    };
};

export default useCurriculum;

