"use client";

import React, { useState } from "react";

// Import hanya komponen Input shadcn
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import Image from "next/image";

// Import FilePondUploader untuk upload gambar/berkas
import FilePondUploader from "@/components/ui/filepond";
import { Test } from "@/components/ui/test";

// Langkah-langkah Stepper
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

// Komponen Form Data Diri dengan Input shadcn (tanpa Label)
function BiodataForm({
    data,
    onChange,
}: {
    data: BiodataFields;
    onChange: (fields: Partial<BiodataFields>) => void;
}) {
    return (
        <form className="space-y-5">
            <div>
                <div className="mb-1 font-medium text-sm">Nama Lengkap</div>
                <Input
                    id="nama-lengkap"
                    type="text"
                    value={data.namaLengkap}
                    onChange={e => onChange({ namaLengkap: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    required
                />
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">NISN</div>
                <Input
                    id="nisn"
                    type="text"
                    value={data.nisn}
                    onChange={e => onChange({ nisn: e.target.value })}
                    placeholder="NISN"
                />
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Tempat Lahir</div>
                <Input
                    id="tempat-lahir"
                    type="text"
                    value={data.tempatLahir}
                    onChange={e => onChange({ tempatLahir: e.target.value })}
                    placeholder="Contoh: Mataram"
                />
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Tanggal Lahir</div>
                <Input
                    id="tanggal-lahir"
                    type="date"
                    value={data.tanggalLahir}
                    onChange={e => onChange({ tanggalLahir: e.target.value })}
                />
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Alamat</div>
                <Input
                    id="alamat"
                    type="text"
                    value={data.alamat}
                    onChange={e => onChange({ alamat: e.target.value })}
                    placeholder="Alamat tinggal"
                />
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Nomor HP</div>
                <Input
                    id="no-hp"
                    type="text"
                    value={data.noHP}
                    onChange={e => onChange({ noHP: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                />
            </div>
            <div>
                <div className="mb-1 font-medium text-sm">Email (jika ada)</div>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => onChange({ email: e.target.value })}
                    placeholder="contoh@mail.com"
                />
            </div>
        </form>
    );
}

type BiodataFields = {
    namaLengkap: string;
    nisn: string;
    tempatLahir: string;
    tanggalLahir: string;
    alamat: string;
    noHP: string;
    email: string;
};

// Dokumen persyaratan yang harus diupload
const dokumenList = [
    {
        label: "Pas Foto 3x4 (JPG/PNG)",
        field: "pasfoto",
        hint: "Wajib background merah atau biru. Max 2MB.",
    },
    {
        label: "Scan Kartu Keluarga (JPG/PNG)",
        field: "kk",
        hint: "Jelas dan terbaca.",
    },
    {
        label: "Scan Akta Kelahiran (JPG/PNG)",
        field: "akta",
        hint: "Pastikan dokumen asli.",
    },
    // Tambahkan berkas lain jika diperlukan
];

type BerkasFields = {
    pasfoto: string | null;
    kk: string | null;
    akta: string | null;
};

export default function PPDBPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [biodata, setBiodata] = useState<BiodataFields>({
        namaLengkap: "",
        nisn: "",
        tempatLahir: "",
        tanggalLahir: "",
        alamat: "",
        noHP: "",
        email: "",
    });

    const [berkas, setBerkas] = useState<BerkasFields>({
        pasfoto: null,
        kk: null,
        akta: null,
    });

    function handlePrev() {
        setCurrentStep((s) => (s > 0 ? s - 1 : s));
    }

    function handleNext() {
        // Validasi dihapus
        setCurrentStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }

    // Konten setiap step
    let stepContent: React.ReactNode = null;
    if (currentStep === 0) {
        stepContent = (
            <BiodataForm
                data={biodata}
                onChange={fields => setBiodata(prev => ({ ...prev, ...fields }))}
            />
        );
    } else if (currentStep === 1) {
        // Step: Upload Berkas
        stepContent = (
            <div>
                <h2 className="font-semibold text-lg mb-2">{steps[currentStep].title}</h2>
                <p className="mb-4 hidden sm:block">{steps[currentStep].description}</p>
                <div className="space-y-6">
                    {dokumenList.map(dokumen => (
                        <div key={dokumen.field} className="flex flex-col gap-1">
                            <label className="font-medium text-sm mb-1">
                                {dokumen.label}
                            </label>
                            <FilePondUploader
                                value={berkas[dokumen.field as keyof BerkasFields] ?? ""}
                                onChange={url =>
                                    setBerkas(prev => ({
                                        ...prev,
                                        [dokumen.field]: url,
                                    }))
                                }
                                label={dokumen.label}
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
                {/* Ganti src dengan path logo aktual; contoh pakai public/logo.png */}
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
                    >
                        Sebelumnya
                    </button>
                    <button
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                        onClick={handleNext}
                        disabled={currentStep === steps.length - 1}
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    );
}