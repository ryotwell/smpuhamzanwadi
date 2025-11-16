"use client";

import React, { FC } from "react";
import FileUploader, { AllowedFolders } from "@/components/ui/file-uploader";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Student } from "@/types/model";
import { ParentForm } from "./parent-form";

import * as studentLib from '@/lib/model/student'
import { BiodataForm } from "./biodata-form";
import useStudent, { StudentFormMode } from "@/hooks/useStudent";

export const dokumenList = [
    {
        label: "Pas Foto 4x4 (JPG/PNG)",
        field: "photo",
        hint: "Wajib background merah atau biru. Max 2MB.",
        acceptedFileTypes: ["image/jpeg", "image/png"],
        folder: "pas-foto" as AllowedFolders,
    },
    {
        label: "Scan Kartu Keluarga (PDF)",
        field: "kartu_keluarga",
        hint: "Wajib format PDF. Jelas dan terbaca.",
        acceptedFileTypes: ["application/pdf"],
        folder: "kartu-keluarga" as AllowedFolders,
    },
    {
        label: "Scan Akta Kelahiran (PDF)",
        field: "akta_kelahiran",
        hint: "Wajib format PDF. Pastikan dokumen asli.",
        acceptedFileTypes: ["application/pdf"],
        folder: "akta-kelahiran" as AllowedFolders,
    },
    {
        label: "Ijazah/Surat Keterangan Lulus (PDF)",
        field: "ijazah_skl",
        hint: "Scan Ijazah/SKL asli, format PDF, jelas dan terbaca.",
        acceptedFileTypes: ["application/pdf"],
        folder: "ijazah" as AllowedFolders,
    },
];

export type BerkasFields = Record<"photo" | "kartu_keluarga" | "akta_kelahiran" | "ijazah_skl", string | null>;

interface ILabeledSelectProps {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (val: string) => void;
    error?: string;
    placeholder?: string;
}

function LabeledSelect({
    label,
    options,
    value,
    onChange,
    error,
    placeholder = "",
}: ILabeledSelectProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="mb-1 font-medium text-sm">{label}</label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={error ? "border-red-500" : ""}>
                    <SelectValue placeholder={placeholder || `Pilih ${label}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <span className="text-red-600 dark:text-red-400 text-xs">{error}</span>}
        </div>
    );
}

interface IJenisKelaminRadioProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

export const JenisKelaminRadio = ({
    value,
    onChange,
    error,
}: IJenisKelaminRadioProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="mb-1 font-medium text-sm">Jenis Kelamin</label>
            <div className="flex gap-4">
                {studentLib.JENIS_KELAMIN_OPTIONS.map((opt) => (
                    <label
                        key={opt.value}
                        className="inline-flex items-center gap-1 text-sm font-normal cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="jenisKelamin"
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={() => onChange(opt.value)}
                            className="accent-blue-600 dark:accent-blue-400"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
            {error && <span className="text-red-600 dark:text-red-400 text-xs">{error}</span>}
        </div>
    );
}

interface ITanggalLahirPickerProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

export const TanggalLahirPicker = ({
    value,
    onChange,
    error,
}: ITanggalLahirPickerProps) => {
    const [open, setOpen] = React.useState(false);
    const date = value ? new Date(value) : undefined;

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="tanggal-lahir" className="mb-1 font-medium text-sm">
                Tanggal Lahir
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="tanggal-lahir"
                        type="button"
                        className={`w-48 justify-between font-normal ${error ? "border-red-500" : ""}`}
                    >
                        {date
                            ? date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
                            : "Pilih tanggal"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(d) => {
                            if (d) {
                                const pad = (n: number) => n.toString().padStart(2, "0");
                                const val = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
                                onChange(val);
                            }
                            setOpen(false);
                        }}
                        fromYear={1970}
                        toYear={new Date().getFullYear()}
                    />
                </PopoverContent>
            </Popover>
            {error && <p className="text-red-600 dark:text-red-400 text-xs">{error}</p>}
        </div>
    );
}

interface SelectControlProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
};

export const SelectControls = {
    Agama: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Agama"
            options={studentLib.AGAMA_OPTIONS}
            placeholder="Pilih Agama"
        />
    ),
    KeadaanOrtu: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Keadaan Orang Tua"
            options={studentLib.KEADAAN_ORTU_OPTIONS}
            placeholder="Pilih Keadaan"
        />
    ),
    StatusKeluarga: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Status Keluarga"
            options={studentLib.STATUS_KELUARGA_OPTIONS}
            placeholder="Pilih Status"
        />
    ),
    TinggalBersama: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Tinggal Bersama"
            options={studentLib.TINGGAL_BERSAMA_OPTIONS}
            placeholder="Pilih Tinggal Bersama"
        />
    ),
    BloodType: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Golongan Darah"
            options={studentLib.BLOOD_TYPE_OPTIONS}
            placeholder="Pilih Golongan Darah"
        />
    ),
    Kewarganegaraan: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Kewarganegaraan"
            options={studentLib.KEWARGANEGARAAN_OPTIONS}
            placeholder="Pilih Kewarganegaraan"
        />
    ),
    Pendidikan: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Pendidikan Terakhir"
            options={studentLib.PENDIDIKAN_OPTIONS}
            placeholder="Pilih Pendidikan"
        />
    ),
    Pekerjaan: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Pekerjaan"
            options={studentLib.PEKERJAAN_OPTIONS}
            placeholder="Pilih Pekerjaan"
        />
    ),
    Penghasilan: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Penghasilan"
            options={studentLib.PENGHASILAN_OPTIONS}
            placeholder="Pilih Penghasilan"
        />
    ),
};

interface IStudentFormProps {
    student: Student
    formMode: StudentFormMode
};

export const StudentForm: FC<IStudentFormProps> = ({ student, formMode }) => {
    const { berkas, control, errors, onSubmit, setBerkas, submitLoading } = useStudent({ student, formMode })

    return (
        <>
            <div className="col-span-12 space-y-6 xl:col-span-7">
                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Edit Biodata Calon Peserta Didik
                            </h3>
                            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                Sesuaikan atau perbarui data peserta sesuai kebutuhan.
                            </p>
                        </div>
                    </div>

                    <div className="w-full">
                        <BiodataForm control={control} errors={errors} />
                        <div className="space-y-5 mt-5">
                            {dokumenList.map((dokumen) => (
                                <div key={dokumen.field} className="flex flex-col gap-1">
                                    <FileUploader
                                        value={berkas[dokumen.field as keyof BerkasFields] ?? ""}
                                        onChange={(url) => setBerkas((prev) => ({ ...prev, [dokumen.field]: url }))}
                                        label={dokumen.label}
                                        allowMultiple={false}
                                        acceptedFileTypes={dokumen.acceptedFileTypes}
                                        folder={dokumen.folder}
                                        hint={dokumen.hint}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 space-y-6 xl:col-span-5">
                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Data Orang Tua / Wali
                            </h3>
                            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                Lengkapi data ayah, ibu, serta data dan alamat wali (jika ada).
                            </p>
                        </div>
                    </div>

                    <div className="w-full">
                        <ParentForm control={control} errors={errors} />
                    </div>
                    <Button
                        onClick={onSubmit}
                        disabled={submitLoading}
                        type="button"
                        className="mt-5"
                    >
                        {formMode === 'CREATE' ? 'Create' : 'Update'}
                    </Button>
                </div>
            </div>
        </>
    );
}