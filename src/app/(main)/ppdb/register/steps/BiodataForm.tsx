"use client";

import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
import { BiodataFields, JENIS_KELAMIN_OPTIONS, AGAMA_OPTIONS, KEADAAN_ORTU_OPTIONS, STATUS_KELUARGA_OPTIONS, TINGGAL_BERSAMA_OPTIONS, BLOOD_TYPE_OPTIONS, KEWARGANEGARAAN_OPTIONS, SelectControls } from "../page";

interface IBiodataFormProps {
    control: Control<BiodataFields>;
    errors: FieldErrors<BiodataFields>;
};

export const BiodataForm: React.FC<IBiodataFormProps> = ({
    control,
    errors,
}) => {
    const textInput = (
        name: keyof BiodataFields,
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
                        {...field}
                        placeholder={placeholder}
                        required={required}
                    />
                )}
            />
            {errors[name] && <p className="text-red-600 dark:text-red-400 text-xs">{errors[name]?.message as string}</p>}
        </div>
    );

    // Centralize number field logic for consistency/cleanliness
    const numberInput = (
        name: keyof BiodataFields,
        label: string,
        placeholder = ""
    ) => (
        <div>
            <div className="mb-1 font-medium text-sm">{label}</div>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Input
                        id={name}
                        type="number"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                        placeholder={placeholder}
                    />
                )}
            />
            {errors[name] && <p className="text-red-600 dark:text-red-400 text-xs">{errors[name]?.message as string}</p>}
        </div>
    );

    return (
        <form className="space-y-5">
            <div>
                <h2 className="font-bold text-xl mb-1">Biodata Calon Peserta Didik</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Silakan lengkapi data diri anda pada form berikut dengan benar dan lengkap.</p>
            </div>
            {textInput("namaLengkap", "Nama Lengkap", "text", "Masukkan nama lengkap", true)}
            {textInput("nisn", "NISN")}
            {textInput("tempatLahir", "Tempat Lahir", "text", "Contoh: Mataram")}
            <Controller
                control={control}
                name="tanggalLahir"
                render={({ field }) => (
                    <TanggalLahirPicker
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.tanggalLahir?.message as string | undefined}
                    />
                )}
            />
            <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                    <JenisKelaminRadio
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.gender?.message as string | undefined}
                    />
                )}
            />
            <Controller
                control={control}
                name="agama"
                render={({ field }) => (
                    <SelectControls.Agama
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.agama?.message as string | undefined}
                    />
                )}
            />
            <Controller
                control={control}
                name="keadaanOrtu"
                render={({ field }) => (
                    <SelectControls.KeadaanOrtu
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.keadaanOrtu?.message as string | undefined}
                    />
                )}
            />
            <Controller
                control={control}
                name="statusKeluarga"
                render={({ field }) => (
                    <SelectControls.StatusKeluarga
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.statusKeluarga?.message as string | undefined}
                    />
                )}
            />
            {numberInput("anakKe", "Anak Ke", "Anak ke")}
            {numberInput("dariBersaudara", "Dari Bersaudara", "Dari bersaudara")}
            <Controller
                control={control}
                name="tinggalBersama"
                render={({ field }) => (
                    <SelectControls.TinggalBersama
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.tinggalBersama?.message as string | undefined}
                    />
                )}
            />
            <Controller
                control={control}
                name="bloodType"
                render={({ field }) => (
                    <SelectControls.BloodType
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.bloodType?.message as string | undefined}
                    />
                )}
            />
            {numberInput("beratKg", "Berat (kg)", "Berat (kg)")}
            {numberInput("tinggiCm", "Tinggi (cm)", "Tinggi (cm)")}
            {textInput("riwayatPenyakit", "Riwayat Penyakit")}
            {textInput("asalSekolah", "Asal Sekolah")}
            {textInput("nik", "NIK")}
            {/* {textInput("kewarganegaraan", "Kewarganegaraan")} */}
            <Controller
                control={control}
                name="kewarganegaraan"
                render={({ field }) => (
                    <SelectControls.Kewarganegaraan
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.kewarganegaraan?.message as string | undefined}
                    />
                )}
            />
            {textInput("alamatJalan", "Alamat Jalan")}
            {textInput("rt", "RT")}
            {textInput("rw", "RW")}
            {textInput("desaKel", "Desa/Kelurahan")}
            {textInput("kecamatan", "Kecamatan")}
            {textInput("kabupaten", "Kabupaten")}
            {textInput("provinsi", "Provinsi")}
            {textInput("kodePos", "Kode Pos")}
            {textInput("phone", "Nomor HP", "text", "08xxxxxxxxxx")}
            {textInput("email", "Email (jika ada)", "email", "contoh@mail.com")}
            {textInput("alamatLengkap", "Alamat Lengkap")}
        </form>
    );
}

function JenisKelaminRadio({
    value,
    onChange,
    error,
}: {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="mb-1 font-medium text-sm">Jenis Kelamin</label>
            <div className="flex gap-4">
                {JENIS_KELAMIN_OPTIONS.map((opt) => (
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

function TanggalLahirPicker({
    value,
    onChange,
    error,
}: {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}) {
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

export function LabeledSelect({
    label,
    options,
    value,
    onChange,
    error,
    placeholder = "",
}: {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (val: string) => void;
    error?: string;
    placeholder?: string;
}) {
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