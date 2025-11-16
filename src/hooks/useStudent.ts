"use client"

import { BiodataFields } from "@/app/admin/registrants/comps/biodata-form";
import { BerkasFields } from "@/app/admin/registrants/comps/form";
import axios from "@/lib/axios";
import { APIPATHS } from "@/lib/constants";
import { biodataSchema } from "@/schemas/student";
import { StandardApiResponse } from "@/types/api";
import { Student } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type StudentFormMode = 'CREATE' | 'UPDATE' | 'PPDB'

type IUseStudent = {
    student: Student,
    formMode: StudentFormMode
}

const useStudent = ({ student, formMode = 'CREATE' }: IUseStudent) => {
    const {
        control,
        trigger,
        formState: { errors },
        getValues,
    } = useForm<BiodataFields>({
        resolver: zodResolver(biodataSchema),
        mode: "onTouched",
        defaultValues: {
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
        },
    });

    const [berkas, setBerkas] = useState<BerkasFields>({
        photo:          student?.photo ?? null,
        kartu_keluarga: student?.kartu_keluarga ?? null,
        akta_kelahiran: student?.akta_kelahiran ?? null,
        ijazah_skl:     student?.ijazah_skl ?? null,
    });

    const [submitLoading, setSubmitLoading] = useState(false);

    const onSubmit = async () => {
        const valid = await trigger();
        if (!valid) {
            toast.error("Periksa kembali isian Anda. Pastikan semua kolom wajib diisi dengan benar.");
            return;
        }

        const biodata = await getValues();

        const parentPayload = {
            // orang tua
            father_name: biodata.father_name,
            father_education: biodata.father_education,
            father_job: biodata.father_job,
            father_income: biodata.father_income,
            mother_name: biodata.mother_name,
            mother_education: biodata.mother_education,
            mother_job: biodata.mother_job,
            mother_income: biodata.mother_income,

            // wali
            wali_name: biodata.wali_name,
            parent_email: biodata.parent_email,
            no_hp_ortu_wali: biodata.no_hp_ortu_wali,
            alamat_ortu_wali: biodata.alamat_ortu_wali,
        }

        const payload = {
            ...biodata,
            tinggal_bersama_lainnya: biodata?.tinggal_bersama === 'LAINNYA' ? biodata.tinggal_bersama_lainnya : '',
            parent: {
                ...parentPayload
            }
        }

        console.log(payload);

        setSubmitLoading(true)

        console.log('submitted');
        console.log(JSON.stringify(payload, null, 2), { formMode });

        try {
            let response: AxiosResponse<StandardApiResponse<Student>>;
            let successMessage = "";
            let errorMessage = "";

            switch (formMode) {
                case 'UPDATE':
                    successMessage = "Data peserta berhasil diperbarui.";
                    errorMessage = "Gagal memperbarui data peserta. Silakan coba lagi.";
                    response = await axios.put(`${APIPATHS.UPDATESTUDENT}/${student.id}`, payload);
                    break;
                case 'CREATE':
                    successMessage = "Data peserta berhasil ditambahkan.";
                    errorMessage = "Gagal menambahkan data peserta. Silakan coba lagi.";
                    response = await axios.post(APIPATHS.STORESTUDENT, payload);
                    break;
                default:
                    successMessage = "Pendaftaran berhasil! Data peserta berhasil didaftarkan.";
                    errorMessage = "Gagal melakukan pendaftaran. Silakan coba lagi.";
                    response = await axios.post(APIPATHS.STORESTUDENTPPDB, payload);
                    break;
            }

            if (response?.data?.success) {
                toast.success(successMessage);
            } else {
                toast.error(response?.data?.message || errorMessage);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const serverMessage = error?.response?.data?.message;

            toast.error(
                serverMessage
                    ? `Terjadi kesalahan pada server: ${serverMessage}`
                    : "Terjadi kesalahan pada server. Silakan coba lagi."
            );
        } finally {
            setSubmitLoading(false)
        }
    }

    return {
        control,
        errors,
        getValues,
        trigger,
        berkas,
        setBerkas,
        submitLoading,
        onSubmit,
    }
}

export default useStudent;