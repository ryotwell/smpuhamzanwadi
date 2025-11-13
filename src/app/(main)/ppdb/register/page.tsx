"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import Image from "next/image";
import FileUploader, { AllowedFolders } from "@/components/ui/file-uploader";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "@/lib/axios";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const JENIS_KELAMIN_OPTIONS = [
    { value: "MALE", label: "Laki-laki" },
    { value: "FEMALE", label: "Perempuan" },
];

const AGAMA_OPTIONS = [
    { value: "ISLAM", label: "Islam" },
    { value: "CHRISTIAN", label: "Kristen" },
    { value: "CATHOLIC", label: "Katolik" },
    { value: "HINDU", label: "Hindu" },
    { value: "BUDDHA", label: "Buddha" },
    { value: "KONGHUCU", label: "Konghucu" },
    { value: "OTHER", label: "Lainnya" },
];

const KEADAAN_ORTU_OPTIONS = [
    { value: "LENGKAP", label: "Lengkap" },
    { value: "YATIM", label: "Yatim" },
    { value: "PIATU", label: "Piatu" },
    { value: "YATIM_PIATU", label: "Yatim Piatu" },
];

const STATUS_KELUARGA_OPTIONS = [
    { value: "ANAK_KANDUNG", label: "Anak Kandung" },
    { value: "ANAK_TIRI", label: "Anak Tiri" },
    { value: "ANAK_ANGKAT", label: "Anak Angkat" },
];

const TINGGAL_BERSAMA_OPTIONS = [
    { value: "ORANG_TUA", label: "Orang Tua" },
    { value: "KAKEK_NENEK", label: "Kakek Nenek" },
    { value: "PAMAN_BIBI", label: "Paman Bibi" },
    { value: "SAUDARA_KANDUNG", label: "Saudara Kandung" },
    { value: "KERABAT", label: "Kerabat" },
    { value: "PANTI_PONTREN", label: "Panti Pontren" },
    { value: "LAINNYA", label: "Lainnya" },
];

const BLOOD_TYPE_OPTIONS = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "AB", label: "AB" },
    { value: "O", label: "O" },
    { value: "UNKNOWN", label: "Tidak Tahu" },
];

const KEWARGANEGARAAN_OPTIONS = [
    { value: "WNI", label: "Warga Negara Indonesia (WNI)" },
    { value: "WNA", label: "Warga Negara Asing (WNA)" },
    { value: "LAINNYA", label: "Lainnya" },
];

// Form validation schema (Zod)
const biodataSchema = z.object({
    namaLengkap: z.string().min(2, "Nama harus minimal 2 karakter").max(64, "Nama maksimal 64 karakter"),
    nisn: z.string().min(10, "NISN harus 10 digit angka").max(10, "NISN harus 10 digit angka").regex(/^\d{10}$/, "NISN harus 10 digit angka"),
    nik: z.string().min(16, "NIK harus 16 digit angka").max(16, "NIK harus 16 digit angka").regex(/^\d{16}$/, "NIK harus 16 digit angka"),
    asalSekolah: z.string().min(2, "Asal sekolah minimal 2 karakter").max(64, "Asal sekolah maksimal 64 karakter"),
    tempatLahir: z.string().min(2, "Tempat lahir minimal 2 karakter").max(64, "Tempat lahir maksimal 64 karakter"),
    tanggalLahir: z.string().min(8, "Tanggal lahir diperlukan"),
    gender: z.enum(["MALE", "FEMALE"], "Pilih jenis kelamin"),
    agama: z.enum(["ISLAM", "CHRISTIAN", "CATHOLIC", "HINDU", "BUDDHA", "KONGHUCU", "OTHER"], "Pilih agama"),
    keadaanOrtu: z.enum(["LENGKAP", "YATIM", "PIATU", "YATIM_PIATU"], "Pilih keadaan orang tua"),
    statusKeluarga: z.enum(["ANAK_KANDUNG", "ANAK_TIRI", "ANAK_ANGKAT"], "Pilih status keluarga"),
    anakKe: z.number().int().positive("Anak ke harus bilangan positif"),
    dariBersaudara: z.number().int().positive("Dari bersaudara harus bilangan positif"),
    tinggalBersama: z.enum(["ORANG_TUA", "KAKEK_NENEK", "PAMAN_BIBI", "SAUDARA_KANDUNG", "KERABAT", "PANTI_PONTREN", "LAINNYA"], "Pilih tinggal bersama"),
    tinggalBersamaLainnya: z.string().optional(),
    kewarganegaraan: z.enum(["WNI", "WNA", "LAINNYA"], "Pilih kewarganegaraan"),
    kewarganegaraanLainnya: z.string().optional(),
    alamatJalan: z.string().optional(),
    rt: z.string().optional(),
    rw: z.string().optional(),
    desaKel: z.string().min(2, "Desa/Kelurahan minimal 2 karakter"),
    kecamatan: z.string().min(2, "Kecamatan minimal 2 karakter"),
    kabupaten: z.string().min(2, "Kabupaten minimal 2 karakter"),
    provinsi: z.string().min(2, "Provinsi minimal 2 karakter"),
    kodePos: z.string().min(5, "Kode pos harus 5 digit").max(5, "Kode pos harus 5 digit"),
    phone: z.string().min(8, "Nomor HP minimal 8 digit").max(18, "Nomor HP tidak boleh lebih dari 18 karakter").regex(/^08\d{7,16}$/, "Nomor HP harus dimulai dari 08 dan angka"),
    email: z.string().email("Email tidak valid").optional().or(z.literal("")),
    bloodType: z.enum(["A", "B", "AB", "O", "UNKNOWN"], "Pilih golongan darah"),
    beratKg: z.number().int("Berat badan harus bilangan bulat").optional(),
    tinggiCm: z.number().int("Tinggi badan harus bilangan bulat").optional(),
    riwayatPenyakit: z.string().optional(),
    alamatLengkap: z.string().min(8, "Alamat lengkap minimal 8 karakter"),
});

type BiodataFields = z.infer<typeof biodataSchema>;

const dokumenList = [
    {
        label: "Pas Foto 4x4 (JPG/PNG)",
        field: "pasfoto",
        hint: "Wajib background merah atau biru. Max 2MB.",
        acceptedFileTypes: ["image/jpeg", "image/png"],
        folder: "pas-foto" as AllowedFolders,
    },
    {
        label: "Scan Kartu Keluarga (PDF)",
        field: "kk",
        hint: "Wajib format PDF. Jelas dan terbaca.",
        acceptedFileTypes: ["application/pdf"],
        folder: "kartu-keluarga" as AllowedFolders,
    },
    {
        label: "Scan Akta Kelahiran (PDF)",
        field: "akta",
        hint: "Wajib format PDF. Pastikan dokumen asli.",
        acceptedFileTypes: ["application/pdf"],
        folder: "akta-kelahiran" as AllowedFolders,
    },
    {
        label: "Ijazah/Surat Keterangan Lulus (PDF)",
        field: "ijazah",
        hint: "Scan Ijazah/SKL asli, format PDF, jelas dan terbaca.",
        acceptedFileTypes: ["application/pdf"],
        folder: "ijazah" as AllowedFolders,
    },
];

type BerkasFields = Record<"pasfoto" | "kk" | "akta" | "ijazah", string | null>;

const steps = [
    { title: "Lengkapi Data", description: "Isi data diri dan identitas lengkap" },
    { title: "Upload Berkas", description: "Unggah dokumen persyaratan" },
    { title: "Konfirmasi", description: "Periksa ulang isian dan konfirmasi pendaftaran" },
    { title: "Selesai", description: "Pendaftaran selesai, silakan tunggu verifikasi" },
];

// Stepper component
function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex flex-col items-center py-10 px-4">
            <div className="flex w-full max-w-2xl justify-between relative">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center z-10">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-300
                ${currentStep > idx
                                    ? "bg-green-500 border-green-500 text-white dark:bg-green-600 dark:border-green-600"
                                    : currentStep === idx
                                        ? "bg-white border-blue-500 text-blue-600 dark:bg-slate-700 dark:border-blue-400 dark:text-blue-400"
                                        : "bg-gray-100 border-gray-300 text-gray-400 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-500"
                                }`
                            }
                        >
                            {currentStep > idx ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <span className="font-bold">{idx + 1}</span>
                            )}
                        </div>
                        <div
                            className={`mt-3 text-sm font-semibold transition-colors duration-300 text-center ${currentStep === idx
                                    ? "text-blue-700 dark:text-blue-400"
                                    : currentStep > idx
                                        ? "text-green-700 dark:text-green-400"
                                        : "text-gray-400 dark:text-gray-500"
                                }`}
                        >
                            {step.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center hidden sm:block">{step.description}</div>
                    </div>
                ))}
                <div className="absolute top-5 left-0 right-0 z-0 h-0.5 bg-gray-300 dark:bg-slate-700">
                    <div
                        className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-500"
                        style={{
                            width: `${(currentStep / (steps.length - 1)) * 100}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

function LabeledSelect({
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

type SelectControlProps = {
    value: string;
    onChange: (val: string) => void;
    error?: string;
};

const SelectControls = {
    Agama: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Agama"
            options={AGAMA_OPTIONS}
            placeholder="Pilih Agama"
        />
    ),
    KeadaanOrtu: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Keadaan Orang Tua"
            options={KEADAAN_ORTU_OPTIONS}
            placeholder="Pilih Keadaan"
        />
    ),
    StatusKeluarga: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Status Keluarga"
            options={STATUS_KELUARGA_OPTIONS}
            placeholder="Pilih Status"
        />
    ),
    TinggalBersama: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Tinggal Bersama"
            options={TINGGAL_BERSAMA_OPTIONS}
            placeholder="Pilih Tinggal Bersama"
        />
    ),
    BloodType: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Golongan Darah"
            options={BLOOD_TYPE_OPTIONS}
            placeholder="Pilih Golongan Darah"
        />
    ),
    Kewarganegaraan: (props: SelectControlProps) => (
        <LabeledSelect
            {...props}
            label="Kewarganegaraan"
            options={KEWARGANEGARAAN_OPTIONS}
            placeholder="Pilih Kewarganegaraan"
        />
    ),
};

type BiodataFormProps = {
    control: Control<BiodataFields>;
    errors: FieldErrors<BiodataFields>;
};

function BiodataForm({
    control,
    errors,
}: BiodataFormProps) {
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

// ============================
// Komponen Konfirmasi Data
// ============================

type KonfirmasiDataProps = {
    values: BiodataFields;
    dokumen: BerkasFields;
    dokumenMeta?: typeof dokumenList;
    onEditBiodata: () => void;
    onEditBerkas: () => void;
};

function KonfirmasiData({
    values,
    dokumen,
    dokumenMeta,
    onEditBiodata,
    onEditBerkas,
}: KonfirmasiDataProps) {
    // Untuk label opsi select/enum
    const getLabel = (key: string, val: unknown): React.ReactNode => {
        switch (key) {
            case "gender":
                return val === "MALE" ? "Laki-laki" : "Perempuan";
            case "agama":
                return AGAMA_OPTIONS.find((x) => x.value === val)?.label ?? String(val ?? "");
            case "keadaanOrtu":
                return KEADAAN_ORTU_OPTIONS.find((x) => x.value === val)?.label ?? String(val ?? "");
            case "statusKeluarga":
                return STATUS_KELUARGA_OPTIONS.find((x) => x.value === val)?.label ?? String(val ?? "");
            case "tinggalBersama":
                return TINGGAL_BERSAMA_OPTIONS.find((x) => x.value === val)?.label ?? String(val ?? "");
            case "bloodType":
                return BLOOD_TYPE_OPTIONS.find((x) => x.value === val)?.label ?? String(val ?? "");
            case "kewarganegaraan":
                return KEWARGANEGARAAN_OPTIONS.find((x) => x.value === val)?.label ?? String(val ?? "");
            default:
                return String(val ?? "");
        }
    };

    return (
        <div>
            <h2 className="font-bold text-xl mb-1">Periksa &amp; Konfirmasi Pendaftaran</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
                Silakan <span className="font-semibold text-blue-600 dark:text-blue-400">periksa ulang</span> seluruh data anda sebelum menekan tombol <b>Konfirmasi &amp; Daftar</b>. Jika ada <b>data yang salah</b>, silakan klik tombol &quot;Edit&quot;.
            </p>
            {/* Biodata preview */}
            <div className="mb-8 overflow-x-auto rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 dark:bg-slate-800 dark:border-slate-700">
                    <div className="font-bold text-base">Biodata</div>
                    <button onClick={onEditBiodata} className="text-blue-500 hover:underline text-sm dark:text-blue-400">Edit</button>
                </div>
                <table className="min-w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="p-2 pl-4 w-48 font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</td>
                            <td className="p-2">{values.namaLengkap}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">NISN</td>
                            <td className="p-2">{values.nisn}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">NIK</td>
                            <td className="p-2">{values.nik}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Asal Sekolah</td>
                            <td className="p-2">{values.asalSekolah}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Tempat, Tanggal Lahir</td>
                            <td className="p-2">{values.tempatLahir}, {values.tanggalLahir}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Jenis Kelamin</td>
                            <td className="p-2">{getLabel("gender", values.gender)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Agama</td>
                            <td className="p-2">{getLabel("agama", values.agama)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Keadaan Orang Tua</td>
                            <td className="p-2">{getLabel("keadaanOrtu", values.keadaanOrtu)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Status Keluarga</td>
                            <td className="p-2">{getLabel("statusKeluarga", values.statusKeluarga)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Anak Ke/dari Bersaudara</td>
                            <td className="p-2">{values.anakKe} dari {values.dariBersaudara}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Tinggal Bersama</td>
                            <td className="p-2">{getLabel("tinggalBersama", values.tinggalBersama)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Golongan Darah</td>
                            <td className="p-2">{getLabel("bloodType", values.bloodType)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Berat &amp; Tinggi Badan</td>
                            <td className="p-2">{values.beratKg} kg, {values.tinggiCm} cm</td>
                        </tr>
                        {values.riwayatPenyakit && (
                            <tr>
                                <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Riwayat Penyakit</td>
                                <td className="p-2">{values.riwayatPenyakit}</td>
                            </tr>
                        )}
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Alamat Jalan</td>
                            <td className="p-2">{values.alamatJalan}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">RT / RW</td>
                            <td className="p-2">{values.rt} / {values.rw}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Desa / Kelurahan</td>
                            <td className="p-2">{values.desaKel}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Kecamatan</td>
                            <td className="p-2">{values.kecamatan}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Kabupaten</td>
                            <td className="p-2">{values.kabupaten}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Provinsi</td>
                            <td className="p-2">{values.provinsi}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Kode Pos</td>
                            <td className="p-2">{values.kodePos}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Nomor HP</td>
                            <td className="p-2">{values.phone}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Email</td>
                            <td className="p-2">{values.email}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Alamat Lengkap</td>
                            <td className="p-2">{values.alamatLengkap}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Dokumen Preview */}
            <div className="mb-8 overflow-x-auto rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 dark:bg-slate-800 dark:border-slate-700">
                    <div className="font-bold text-base">Dokumen Berkas</div>
                    <button onClick={onEditBerkas} className="text-blue-500 hover:underline text-sm dark:text-blue-400">Edit</button>
                </div>
                <table className="min-w-full text-sm">
                    <tbody>
                        {(dokumenMeta ?? dokumenList).map((doc) => (
                            <tr key={doc.field}>
                                <td className="p-2 pl-4 w-64 font-medium dark:text-gray-300">{doc.label}</td>
                                <td className="p-2">
                                    {dokumen[doc.field as keyof BerkasFields] ? (
                                        <a
                                            href={dokumen[doc.field as keyof BerkasFields] ?? "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 underline"
                                        >Lihat File</a>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500 italic">Belum diunggah</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function PPDBPage() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const {
        control,
        trigger,
        formState: { errors },
        getValues,
    } = useForm<BiodataFields>({
        resolver: zodResolver(biodataSchema),
        mode: "onTouched",
        defaultValues: {
            namaLengkap: "Zulzario Zaeri",
            nisn: "2206020302",
            nik: "1234567890123456",
            asalSekolah: "SMPN 1 Masbagik",
            gender: "MALE",
            tempatLahir: "Masbagik",
            tanggalLahir: "",
            agama: "ISLAM",
            keadaanOrtu: "LENGKAP",
            statusKeluarga: "ANAK_KANDUNG",
            anakKe: 1,
            dariBersaudara: 1,
            tinggalBersama: "ORANG_TUA",
            tinggalBersamaLainnya: "",
            kewarganegaraan: "WNI",
            alamatJalan: "",
            rt: "",
            rw: "",
            desaKel: "Masbagik Utara Baru",
            kecamatan: "Masbagik",
            kabupaten: "Lombok Timur",
            provinsi: "Nusa Tenggara Barat",
            kodePos: "83661",
            phone: "0812303923490",
            email: "ytryo789@gmail.com",
            bloodType: "UNKNOWN",
            beratKg: 0,
            tinggiCm: 0,
            riwayatPenyakit: "",
            alamatLengkap: "Jl. Pahlawan No. 1, Masbagik Utara Baru,Masbagik, Lombok Timur, Nusa Tenggara Barat 83661",
        },
    });

    const [berkas, setBerkas] = React.useState<BerkasFields>({
        pasfoto: null,
        kk: null,
        akta: null,
        ijazah: null,
    });

    // Untuk tombol loading submit konfirmasi
    const [loadingDaftar, setLoadingDaftar] = React.useState(false);

    const validateBerkas = () => {
        let errorMsg = "";
        if (!berkas.pasfoto) errorMsg = "Pas foto wajib diunggah.";
        else if (!berkas.kk) errorMsg = "Scan Kartu Keluarga wajib diunggah.";
        else if (!berkas.akta) errorMsg = "Scan Akta Kelahiran wajib diunggah.";
        else if (!berkas.ijazah) errorMsg = "Scan Ijazah/Surat Keterangan Lulus wajib diunggah.";
        if (errorMsg) toast.error(errorMsg);
        return !errorMsg;
    };

    const handlePrev = () => setCurrentStep((s) => Math.max(0, s - 1));

    const handleNext = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        if (currentStep === 0) {
            const valid = await trigger();
            if (!valid) {
                toast.error("Isian biodata masih ada yang belum valid.");
                return;
            }
            setCurrentStep((s) => s + 1);
        } else if (currentStep === 1) {
            if (!validateBerkas()) return;
            setCurrentStep((s) => s + 1);
        } else if (currentStep === 2) {
            setLoadingDaftar(true);
            try {
                // Prepare payload: combine biodata and berkas files (urls)
                const biodata = getValues();
                const payload = {
                    full_name: biodata.namaLengkap,
                    nisn: biodata.nisn,
                    nik: biodata.nik,

                    asal_sekolah: biodata.asalSekolah,
                    gender: biodata.gender,
                    tempat_lahir: biodata.tempatLahir,
                    tanggal_lahir: biodata.tanggalLahir,
                    agama: biodata.agama,
                    keadaan_ortu: biodata.keadaanOrtu,
                    status_keluarga: biodata.statusKeluarga,
                    anak_ke: biodata.anakKe,
                    dari_bersaudara: biodata.dariBersaudara,
                    tinggal_bersama: biodata.tinggalBersama,
                    tinggal_bersama_lainnya: biodata.tinggalBersamaLainnya,
                    kewarganegaraan: biodata.kewarganegaraan,
                    alamat_jalan: biodata.alamatJalan,
                    rt: biodata.rt,
                    rw: biodata.rw,
                    desa_kel: biodata.desaKel,
                    kecamatan: biodata.kecamatan,
                    kabupaten: biodata.kabupaten,
                    provinsi: biodata.provinsi,
                    kode_pos: biodata.kodePos,
                    phone: biodata.phone,
                    email: biodata.email,

                    pas_foto: berkas.pasfoto,
                    kartu_keluarga: berkas.kk,
                    akta_kelahiran: berkas.akta,
                    ijazah_skl: berkas.ijazah,

                    blood_type: biodata.bloodType,
                    berat_kg: biodata.beratKg,
                    tinggi_cm: biodata.tinggiCm,
                    riwayat_penyakit: biodata.riwayatPenyakit,
                };

                console.log(payload);

                const response = await axios.post("/ppdb/pendaftaran", payload);

                setLoadingDaftar(false);

                // Could validate response: response.data.success etc.
                if (response.data && (response.data.success || response.data.status === "success")) {
                    setCurrentStep((s) => s + 1);
                    toast.success("Pendaftaran berhasil dikonfirmasi!");
                } else {
                    toast.error(
                        response.data && response.data.message
                            ? response.data.message
                            : "Terjadi kesalahan saat menyimpan data. Silakan coba lagi."
                    );
                }
            } catch (err) {
                console.error(err);

                setLoadingDaftar(false);

                // error type narrowing
                if (
                    typeof err === "object" &&
                    err !== null &&
                    "response" in err &&
                    err.response &&
                    typeof err.response === "object" &&
                    err.response !== null &&
                    "data" in err.response &&
                    err.response.data &&
                    typeof err.response.data === "object" &&
                    err.response.data !== null &&
                    "message" in err.response.data
                ) {
                    toast.error(`Pendaftaran gagal: ${err.response.data.message}`);
                } else {
                    toast.error("Pendaftaran gagal, terjadi masalah saat koneksi ke server.");
                }
            }
        } else {
            setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
        }
    };

    // Format tanggal lahir Opsi: 2024-06-10 -> 10 Juni 2024
    const formatTanggalLahir = (tgl: string) => {
        if (!tgl) return "";
        try {
            const d = new Date(tgl);
            return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
        } catch {
            return tgl;
        }
    };

    const stepContent = (() => {
        switch (currentStep) {
            case 0:
                return <BiodataForm control={control} errors={errors} />;
            case 1:
                return (
                    <div>
                        <h2 className="font-bold text-xl mb-1">{steps[currentStep].title}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{steps[currentStep].description}</p>
                        <div className="space-y-6">
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
                );
            case 2:
                return (
                    <div>
                        <KonfirmasiData
                            values={{
                                ...getValues(),
                                tanggalLahir: formatTanggalLahir(getValues().tanggalLahir)
                            }}
                            dokumen={berkas}
                            dokumenMeta={dokumenList}
                            onEditBiodata={() => setCurrentStep(0)}
                            onEditBerkas={() => setCurrentStep(1)}
                        />
                        <div className="flex flex-col gap-3 mt-6">
                            <Button
                                onClick={handleNext}
                                disabled={loadingDaftar}
                                type="button"
                            >
                                {loadingDaftar ? "Menyimpan..." : "Konfirmasi & Daftar"}
                            </Button>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Setelah mengklik tombol di atas, data akan dikirim dan tidak dapat diubah. Pastikan semua data sudah benar.
                            </p>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        <h2 className="font-bold text-xl mb-1">{steps[currentStep].title}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{steps[currentStep].description}</p>
                    </>
                );
        }
    })();

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="flex justify-center mb-6">
                <Image
                    src={config.appLogoPanjang}
                    alt="Logo SMP Unggulan Hamzanwadi"
                    loading="lazy"
                    width={150}
                    height={150}
                />
            </div>
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">Pendaftaran Peserta Didik Baru</h1>
                <p className="text-gray-600 dark:text-gray-200 text-base sm:text-lg">SMP Unggulan Hamzanwadi</p>
            </div>
            <Stepper currentStep={currentStep} />
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-8 my-8 border border-gray-100 dark:border-slate-700 min-h-[120px] transition-all duration-300">
                {stepContent}
                <div className="flex justify-between mt-6">
                    <Button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        type="button"
                        variant="secondary"
                    >
                        Sebelumnya
                    </Button>
                    {currentStep !== 2 && (
                        <Button
                            onClick={handleNext}
                            disabled={currentStep === steps.length - 1}
                            type="button"
                        >
                            Selanjutnya
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}