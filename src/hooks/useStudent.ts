"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { AxiosResponse } from "axios";

import { BiodataFields } from "@/app/admin/registrants/comps/biodata-form";
import { BerkasFields } from "@/app/admin/registrants/comps/form";
import { biodataSchema } from "@/schemas/student";
import { APIPATHS } from "@/lib/constants";
import { StandardApiResponse } from "@/types/api";
import { Student } from "@/types/model";

export type StudentFormMode = "CREATE" | "UPDATE" | "PPDB";

type IUseStudent = {
    student: Student;
    formMode: StudentFormMode;
};

const getDefaultBiodata = (student: Student): BiodataFields => ({
    ...student,
    father_name: student?.parent.father_name,
    father_education: student?.parent.father_education,
    father_job: student?.parent.father_job,
    father_income: student?.parent.father_income,
    mother_name: student?.parent.mother_name,
    mother_education: student?.parent.mother_education,
    mother_job: student?.parent.mother_job,
    mother_income: student?.parent.mother_income,
    wali_name: student?.parent.wali_name,
    no_hp_ortu_wali: student?.parent.no_hp_ortu_wali,
    parent_email: student?.parent.parent_email,
    alamat_ortu_wali: student?.parent.alamat_ortu_wali,
});

const getDefaultBerkas = (student: Student): BerkasFields => ({
    photo: student?.photo ?? null,
    kartu_keluarga: student?.kartu_keluarga ?? null,
    akta_kelahiran: student?.akta_kelahiran ?? null,
    ijazah_skl: student?.ijazah_skl ?? null,
});

const useStudent = ({ student, formMode = "CREATE" }: IUseStudent) => {
    const {
        control,
        trigger,
        formState: { errors },
        getValues,
        reset: resetForm,
    } = useForm<BiodataFields>({
        resolver: zodResolver(biodataSchema),
        mode: "onTouched",
        defaultValues: getDefaultBiodata(student),
    });

    const [berkas, setBerkas] = useState<BerkasFields>(getDefaultBerkas(student));
    const [submitLoading, setSubmitLoading] = useState(false);

    const allDokumenUploaded = () =>
        berkas.photo && berkas.akta_kelahiran && berkas.kartu_keluarga && berkas.ijazah_skl;

    const buildParentPayload = (biodata: BiodataFields) => ({
        father_name: biodata.father_name,
        father_education: biodata.father_education,
        father_job: biodata.father_job,
        father_income: biodata.father_income,
        mother_name: biodata.mother_name,
        mother_education: biodata.mother_education,
        mother_job: biodata.mother_job,
        mother_income: biodata.mother_income,
        wali_name: biodata.wali_name,
        parent_email: biodata.parent_email,
        no_hp_ortu_wali: biodata.no_hp_ortu_wali,
        alamat_ortu_wali: biodata.alamat_ortu_wali,
    });

    const buildPayload = (biodata: BiodataFields) => ({
        ...biodata,
        ...berkas,
        tinggal_bersama_lainnya:
            biodata?.tinggal_bersama === "LAINNYA" ? biodata.tinggal_bersama_lainnya : "",
        parent: buildParentPayload(biodata),
    });

    const showError = (msg: string) =>
        toast.error(msg);

    const onSubmit = async () => {
        const isValid = await trigger();
        if (!isValid) {
            showError("Periksa kembali isian. Pastikan semua kolom wajib diisi dengan benar.");
            return;
        }

        if (!allDokumenUploaded()) {
            showError("Pastikan semua dokumen (foto, akta kelahiran, kartu keluarga, dan ijazah/SKL) sudah diunggah.");
            return;
        }

        setSubmitLoading(true);

        try {
            const biodata = await getValues();
            const payload = buildPayload(biodata);

            let successMessage = "";

            if (formMode === "UPDATE") {
                successMessage = "Data peserta berhasil diperbarui.";
                await axios.put(`${APIPATHS.UPDATESTUDENT}/${student.id}`, payload);
            } else if (formMode === "CREATE") {
                successMessage = "Data peserta berhasil ditambahkan.";
                await axios.post(APIPATHS.STORESTUDENT, payload);
            } else {
                successMessage = "Pendaftaran berhasil! Data peserta berhasil didaftarkan.";
                await axios.post(APIPATHS.STORESTUDENTPPDB, payload);
            }

            if(formMode === 'CREATE') {
                resetFormInputs()
            }

            toast.success(successMessage);
        } catch (err: any) {
            const errorMsg =
                err?.data?.errors?.nik ||
                err?.response?.data?.message ||
                "Terjadi kesalahan pada server. Silakan coba lagi.";
            showError(
                err?.data?.errors?.nik || err?.response?.data?.message
                    ? `Terjadi kesalahan pada server: ${errorMsg}`
                    : errorMsg
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    const resetFormInputs = () => {
        resetForm(getDefaultBiodata(student));
        setBerkas(getDefaultBerkas(student));
    };

    return {
        control,
        errors,
        getValues,
        trigger,
        berkas,
        setBerkas,
        submitLoading,
        onSubmit,
        resetFormInputs,
    };
};

export default useStudent;