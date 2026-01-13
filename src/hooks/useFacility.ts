"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "@/lib/axios";

import { APIPATHS } from "@/lib/constants";
import { Facility } from "@/types/model";
import { FacilityFields, facilitySchema } from "@/app/admin/facilities/comps/form";
import { collectMessages, showError } from "@/lib/utils";

export type FacilityFormMode = "CREATE" | "UPDATE";

type IUseFacility = {
    facility: Facility;
    formMode: FacilityFormMode;
};

const useFacility = ({ facility, formMode = "CREATE" }: IUseFacility) => {
    const {
        control,
        trigger,
        formState: { errors },
        getValues,
        setValue,
        watch,
        reset: resetForm,
    } = useForm<FacilityFields>({
        resolver: zodResolver(facilitySchema),
        mode: "onTouched",
        defaultValues: {
            name: facility?.name || "",
            image: facility?.image || null,
            description: facility?.description || null,
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
            const facilityFields = getValues();

            const payload = {
                name: facilityFields.name,
                image: facilityFields.image || null,
                description: facilityFields.description || null,
            };

            let successMessage = "";

            if (formMode === "UPDATE") {
                successMessage = "Data fasilitas berhasil diperbarui.";
                await axios.put(`${APIPATHS.UPDATEFACILITY}/${facility.id}`, payload);
            } else {
                successMessage = "Data fasilitas berhasil ditambahkan.";
                await axios.post(APIPATHS.STOREFACILITY, payload);
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
            name: facility?.name || "",
            image: facility?.image || null,
            description: facility?.description || null,
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

export default useFacility;

