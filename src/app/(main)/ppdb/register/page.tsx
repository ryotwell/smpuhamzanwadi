"use client";

import React, { useState } from "react";

// Add validation dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Import hanya komponen Input shadcn
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import Image from "next/image";

import FileUploader, { AllowedFolders } from "@/components/ui/filepond";

// --- additional: calendar component imports ---
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Define Zod validation schema
const biodataSchema = z.object({
    namaLengkap: z
        .string()
        .min(2, "Nama harus minimal 2 karakter")
        .max(64, "Nama maksimal 64 karakter"),
    nisn: z
        .string()
        .min(10, "NISN harus 10 digit angka")
        .max(10, "NISN harus 10 digit angka")
        .regex(/^\d{10}$/, "NISN harus 10 digit angka"),
    tempatLahir: z
        .string()
        .min(2, "Tempat lahir minimal 2 karakter")
        .max(64, "Tempat lahir maksimal 64 karakter"),
    tanggalLahir: z
        .string()
        .min(8, "Tanggal lahir diperlukan"),
    alamat: z
        .string()
        .min(5, "Alamat minimal 5 karakter"),
    noHP: z
        .string()
        .min(8, "Nomor HP minimal 8 digit")
        .max(18, "Nomor HP tidak boleh lebih dari 18 karakter")
        .regex(/^08\d{7,16}$/, "Nomor HP harus dimulai dari 08 dan angka"),
    email: z
        .string()
        .email("Email tidak valid")
        .optional()
        .or(z.literal("")),
});

type BiodataFields = z.infer<typeof biodataSchema>;

// Dokumen persyaratan yang harus diupload
const dokumenList = [
    {
        label: "Pas Foto 3x4 (JPG/PNG)",
        field: "pasfoto",
        hint: "Wajib background merah atau biru. Max 2MB.",
        acceptedFileTypes: ["image/jpeg", "image/png"],
        folder: 'pas-foto' as AllowedFolders,
    },
    {
        label: "Scan Kartu Keluarga (PDF)",
        field: "kk",
        hint: "Wajib format PDF. Jelas dan terbaca.",
        acceptedFileTypes: ["application/pdf"],
        folder: 'kartu-keluarga' as AllowedFolders,
    },
    {
        label: "Scan Akta Kelahiran (PDF)",
        field: "akta",
        hint: "Wajib format PDF. Pastikan dokumen asli.",
        acceptedFileTypes: ["application/pdf"],
        folder: 'akta-kelahiran' as AllowedFolders,
    },
    {
        label: "Ijazah/Surat Keterangan Lulus (PDF)",
        field: "ijazah",
        hint: "Scan Ijazah/SKL asli, format PDF, jelas dan terbaca.",
        acceptedFileTypes: ["application/pdf"],
        folder: 'ijazah' as AllowedFolders,
    },
];

type BerkasFields = {
    pasfoto: string | null;
    kk: string | null;
    akta: string | null;
    ijazah: string | null; // Tambahkan validasi field ijazah
};

const steps = [
    {
        title: "Lengkapi Data",
        description: "Isi data diri dan identitas lengkap",
    },
    {
        title: "Upload Berkas",
        description: "Unggah dokumen persyaratan",
    },
    {
        title: "Konfirmasi",
        description: "Periksa ulang isian dan konfirmasi pendaftaran",
    },
    {
        title: "Selesai",
        description: "Pendaftaran selesai, silakan tunggu verifikasi",
    },
];

function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex flex-col items-center py-10 px-4">
            <div className="flex w-full max-w-2xl justify-between relative">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center z-10">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-300
                  ${currentStep > idx
                                    ? "bg-green-500 border-green-500 text-white"
                                    : currentStep === idx
                                        ? "bg-white border-blue-500 text-blue-600"
                                        : "bg-gray-100 border-gray-300 text-gray-400"
                                }
              `}
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
                                ? "text-blue-700"
                                : currentStep > idx
                                    ? "text-green-700"
                                    : "text-gray-400"
                                }`}
                        >
                            {step.title}
                        </div>
                        <div className="text-xs text-gray-500 text-center hidden sm:block">{step.description}</div>
                    </div>
                ))}
                {/* garis stepper */}
                <div className="absolute top-5 left-0 right-0 z-0 h-0.5 bg-gray-300">
                    <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{
                            width: `${(currentStep / (steps.length - 1)) * 100}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Komponen date picker untuk Tanggal Lahir
function TanggalLahirPicker({ value, onChange, error }: { value: string; onChange: (val: string) => void; error?: string }) {
    const [open, setOpen] = React.useState(false);
    // Convert value (string, yyyy-mm-dd or empty) to Date for Calendar
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
                        onSelect={d => {
                            // Format as yyyy-mm-dd
                            if (d) {
                                const pad = (n: number) => n.toString().padStart(2, '0');
                                const val = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
                                onChange(val);
                            }
                            setOpen(false);
                        }}
                        // Optional: choose year-range
                        fromYear={1970}
                        toYear={new Date().getFullYear()}
                    />
                </PopoverContent>
            </Popover>
            {error && <p className="text-red-600 text-xs">{error}</p>}
        </div>
    );
}

// Komponen Form Data Diri dengan Input shadcn
function BiodataForm({
    control,
    errors,
}: {
    control: any;
    errors: any;
}) {
    return (
        <form className="space-y-5">
            <div>
                <div className="mb-1 font-medium text-sm">Nama Lengkap</div>
                <Controller
                    control={control}
                    name="namaLengkap"
                    render={({ field }) => (
                        <Input
                            id="nama-lengkap"
                            type="text"
                            {...field}
                            placeholder="Masukkan nama lengkap"
                            required
                        />
                    )}
                />
                {errors.namaLengkap && (
                    <p className="text-red-600 text-xs">{errors.namaLengkap.message}</p>
                )}
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">NISN</div>
                <Controller
                    control={control}
                    name="nisn"
                    render={({ field }) => (
                        <Input
                            id="nisn"
                            type="text"
                            {...field}
                            placeholder="NISN"
                        />
                    )}
                />
                {errors.nisn && (
                    <p className="text-red-600 text-xs">{errors.nisn.message}</p>
                )}
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Tempat Lahir</div>
                <Controller
                    control={control}
                    name="tempatLahir"
                    render={({ field }) => (
                        <Input
                            id="tempat-lahir"
                            type="text"
                            {...field}
                            placeholder="Contoh: Mataram"
                        />
                    )}
                />
                {errors.tempatLahir && (
                    <p className="text-red-600 text-xs">{errors.tempatLahir.message}</p>
                )}
            </div>
            {/* Tanggal Lahir pakai calendar */}
            <div>
                <Controller
                    control={control}
                    name="tanggalLahir"
                    render={({ field }) => (
                        <TanggalLahirPicker
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.tanggalLahir?.message}
                        />
                    )}
                />
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Alamat</div>
                <Controller
                    control={control}
                    name="alamat"
                    render={({ field }) => (
                        <Input
                            id="alamat"
                            type="text"
                            {...field}
                            placeholder="Alamat tinggal"
                        />
                    )}
                />
                {errors.alamat && (
                    <p className="text-red-600 text-xs">{errors.alamat.message}</p>
                )}
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Nomor HP</div>
                <Controller
                    control={control}
                    name="noHP"
                    render={({ field }) => (
                        <Input
                            id="no-hp"
                            type="text"
                            {...field}
                            placeholder="08xxxxxxxxxx"
                        />
                    )}
                />
                {errors.noHP && (
                    <p className="text-red-600 text-xs">{errors.noHP.message}</p>
                )}
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Email (jika ada)</div>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <Input
                            id="email"
                            type="email"
                            {...field}
                            placeholder="contoh@mail.com"
                        />
                    )}
                />
                {errors.email && (
                    <p className="text-red-600 text-xs">{errors.email.message}</p>
                )}
            </div>
        </form>
    );
}

export default function PPDBPage() {
    const [currentStep, setCurrentStep] = useState(0);

    // Form for biodata with react-hook-form + zod
    const {
        control,
        handleSubmit,
        trigger,
        getValues,
        setValue,
        formState: { errors, isValid },
    } = useForm<BiodataFields>({
        resolver: zodResolver(biodataSchema),
        mode: "onTouched",
        defaultValues: {
            namaLengkap: "Zulzario Zaeri",
            nisn: "2206020302",
            tempatLahir: "Masbagik",
            tanggalLahir: "",
            alamat: "Masbagik",
            noHP: "0812303923490",
            email: "ytryo789@gmail.com",
        },
    });

    const [berkas, setBerkas] = useState<BerkasFields>({
        pasfoto: null,
        kk: null,
        akta: null,
        ijazah: null, // Tambah default ijazah
    });

    // Validation for berkas (client check) including ijazah
    function validateBerkas() {
        let errorMsg = "";
        if (!berkas.pasfoto) errorMsg = "Pas foto wajib diunggah.";
        else if (!berkas.kk) errorMsg = "Scan Kartu Keluarga wajib diunggah.";
        else if (!berkas.akta) errorMsg = "Scan Akta Kelahiran wajib diunggah.";
        else if (!berkas.ijazah) errorMsg = "Scan Ijazah/Surat Keterangan Lulus wajib diunggah.";
        if (errorMsg) toast.error(errorMsg);
        return !errorMsg;
    }

    function handlePrev() {
        setCurrentStep((s) => (s > 0 ? s - 1 : s));
    }

    async function handleNext(e?: React.MouseEvent) {
        // Prevent form submit reload default
        if (e) e.preventDefault();

        // Step 0: Validate biodata (trigger validation via react-hook-form/zod)
        if (currentStep === 0) {
            const valid = await trigger();
            if (!valid) {
                toast.error("Isian biodata masih ada yang belum valid.");
                return;
            }
            setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s));
        }
        // Step 1: Validate berkas upload
        else if (currentStep === 1) {
            if (!validateBerkas()) return;
            setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s));
        }
        // Step 2 or others: (skip for now)
        else {
            setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s));
        }
    }

    // Konten setiap step
    let stepContent: React.ReactNode = null;
    if (currentStep === 0) {
        stepContent = (
            <BiodataForm
                control={control}
                errors={errors}
            />
        );
    } else if (currentStep === 1) {
        // Step: Upload Berkas
        stepContent = (
            <div>
                <h2 className="font-semibold text-lg mb-2">{steps[currentStep].title}</h2>
                <p className="mb-4 hidden sm:block">{steps[currentStep].description}</p>
                {/* <pre>{JSON.stringify(berkas, null, 4)}</pre> */}
                <div className="space-y-6">
                    {dokumenList.map(dokumen => (
                        <div key={dokumen.field} className="flex flex-col gap-1">
                            {/* <label className="font-medium text-sm mb-1">
                                {dokumen.label}
                            </label> */}
                            <FileUploader
                                value={berkas[dokumen.field as keyof BerkasFields] ?? ""}
                                onChange={url =>
                                    setBerkas(prev => ({
                                        ...prev,
                                        [dokumen.field]: url,
                                    }))
                                }
                                label={dokumen.label}
                                allowMultiple={false}
                                acceptedFileTypes={dokumen.acceptedFileTypes}
                                folder={dokumen.folder}
                            />
                            <div className="text-xs text-gray-400">{dokumen.hint}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        stepContent = (
            <>
                <h2 className="font-semibold text-lg mb-2">{steps[currentStep].title}</h2>
                <p className="mb-4 hidden sm:block">{steps[currentStep].description}</p>
                {/* Bisa diganti dengan komponen/upload sesuai kebutuhan */}
            </>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            {/* Logo SMPU Hamzanwadi */}
            <div className="flex justify-center mb-6">
                <Image
                    src={config.appLogoPanjang}
                    alt="Logo SMP Unggulan Hamzanwadi"
                    loading="lazy"
                    width={150}
                    height={150}
                />
            </div>
            {/* <h1 className="text-2xl font-bold text-center mb-6">PPDB Online</h1> */}
            <Stepper currentStep={currentStep} />
            <div className="bg-white rounded-2xl shadow p-8 my-8 border border-gray-100 min-h-[120px] transition-all duration-300">
                {stepContent}
                <div className="flex justify-between mt-6">
                    <button
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        type="button"
                    >
                        Sebelumnya
                    </button>
                    <button
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                        onClick={handleNext}
                        disabled={currentStep === steps.length - 1}
                        type="button"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    );
}