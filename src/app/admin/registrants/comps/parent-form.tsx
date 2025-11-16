"use client";

import React, { FC } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { SelectControls } from "./form";
import { BiodataFields } from "./biodata-form";

interface IParentFormProps {
    control: Control<BiodataFields>;
    errors: FieldErrors<BiodataFields>;
};

export const ParentForm: FC<IParentFormProps> = ({ control, errors }) => {
    return (
        <form className="space-y-5">
            {/* Ayah */}
            <div className="mt-2 mb-2 font-semibold text-md">Data Ayah Kandung</div>
            <div>
                <label htmlFor="father_name" className="mb-1 font-medium text-sm">Nama Ayah</label>
                <Controller
                    control={control}
                    name="father_name"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Nama Ayah"
                            id="father_name"
                        />
                    )}
                />
                {errors.father_name && <p className="text-red-600 dark:text-red-400 text-xs">{errors.father_name.message as string}</p>}
            </div>
            <Controller
                control={control}
                name="father_education"
                render={({ field }) => (
                    <SelectControls.Pendidikan
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.father_education?.message as string}
                    />
                )}
            />
            <div>
                <label htmlFor="father_job" className="mb-1 font-medium text-sm">Pekerjaan</label>
                <Controller
                    control={control}
                    name="father_job"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Pekerjaan"
                            id="father_job"
                        />
                    )}
                />
                {errors.father_job && <p className="text-red-600 dark:text-red-400 text-xs">{errors.father_job.message as string}</p>}
            </div>
            <Controller
                control={control}
                name="father_income"
                render={({ field }) => (
                    <SelectControls.Penghasilan
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.father_income?.message as string}
                    />
                )}
            />

            {/* Ibu */}
            <div className="mt-4 mb-2 font-semibold text-md">Data Ibu Kandung</div>
            <div>
                <label htmlFor="mother_name" className="mb-1 font-medium text-sm">Nama Ibu</label>
                <Controller
                    control={control}
                    name="mother_name"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Nama Ibu"
                            id="mother_name"
                        />
                    )}
                />
                {errors.mother_name && <p className="text-red-600 dark:text-red-400 text-xs">{errors.mother_name.message as string}</p>}
            </div>
            <Controller
                control={control}
                name="mother_education"
                render={({ field }) => (
                    <SelectControls.Pendidikan
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.mother_education?.message as string}
                    />
                )}
            />
            <div>
                <label htmlFor="mother_job" className="mb-1 font-medium text-sm">Pekerjaan</label>
                <Controller
                    control={control}
                    name="mother_job"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Pekerjaan"
                            id="mother_job"
                        />
                    )}
                />
                {errors.mother_job && <p className="text-red-600 dark:text-red-400 text-xs">{errors.mother_job.message as string}</p>}
            </div>
            <Controller
                control={control}
                name="mother_income"
                render={({ field }) => (
                    <SelectControls.Penghasilan
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.mother_income?.message as string}
                    />
                )}
            />

            {/* Wali & Alamat */}
            <div className="mt-4 mb-2 font-semibold text-md">Data Wali</div>
            <div>
                <label htmlFor="wali_name" className="mb-1 font-medium text-sm">Nama Wali</label>
                <Controller
                    control={control}
                    name="wali_name"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Nama Wali"
                            id="wali_name"
                        />
                    )}
                />
                {errors.wali_name && <p className="text-red-600 dark:text-red-400 text-xs">{errors.wali_name.message as string}</p>}
            </div>
            <div>
                <label htmlFor="no_hp_ortu_wali" className="mb-1 font-medium text-sm">Nomor HP Wali</label>
                <Controller
                    control={control}
                    name="no_hp_ortu_wali"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Nomor HP Wali (08xxxxxxxxxx)"
                            id="no_hp_ortu_wali"
                            type="text"
                        />
                    )}
                />
                {errors.no_hp_ortu_wali && <p className="text-red-600 dark:text-red-400 text-xs">{errors.no_hp_ortu_wali.message as string}</p>}
            </div>
            <div>
                <label htmlFor="parent_email" className="mb-1 font-medium text-sm">Email Wali</label>
                <Controller
                    control={control}
                    name="parent_email"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Email Wali"
                            id="parent_email"
                            type="email"
                        />
                    )}
                />
                {errors.parent_email && <p className="text-red-600 dark:text-red-400 text-xs">{errors.parent_email.message as string}</p>}
            </div>
            <div>
                <label htmlFor="alamat_ortu_wali" className="mb-1 font-medium text-sm">Alamat Orang Tua/Wali</label>
                <Controller
                    control={control}
                    name="alamat_ortu_wali"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Alamat lengkap orang tua/wali"
                            id="alamat_ortu_wali"
                        />
                    )}
                />
                {errors.alamat_ortu_wali && <p className="text-red-600 dark:text-red-400 text-xs">{errors.alamat_ortu_wali.message as string}</p>}
            </div>
        </form>
    );
}
