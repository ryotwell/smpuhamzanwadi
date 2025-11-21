"use client";

import React, { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { config } from "@/config";
import Image from "next/image";
import FileUploader from "@/components/ui/file-uploader";
import { Button } from "@/components/ui/button";
import { DEFAULT_STUDENT, Student } from "@/types/model";
import {
    getAgamaLabel,
    getBloodTypeLabel,
    getJenisKelaminLabel,
    getKeadaanOrtuLabel,
    getPekerjaanLabel,
    getPendidikanLabel,
    getPenghasilanLabel,
    getStatusKeluargaLabel,
    getTinggalBersamaLabel,
} from "@/lib/model/student";
import { BiodataFields, BiodataForm } from "@/app/admin/registrants/comps/biodata-form";
import { BerkasFields, dokumenList } from "@/app/admin/registrants/comps/form";
import useStudent from "@/hooks/useStudent";
import { ParentForm } from "@/app/admin/registrants/comps/parent-form";

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

const steps = [
    { title: "Lengkapi Data", description: "Data diri dan identitas lengkap" },
    { title: "Data Orang Tua/Wali", description: "Data orang tua/wali" },
    { title: "Upload Berkas", description: "Unggah dokumen persyaratan" },
    { title: "Konfirmasi", description: "Periksa ulang isian dan konfirmasi pendaftaran" },
    { title: "Selesai", description: "Pendaftaran selesai, silakan tunggu verifikasi" },
];

function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex flex-col items-center py-10 px-4">
            <div className="flex w-full max-w-2xl justify-between relative">
                {steps.map((step, idx) => {
                    const isCompleted = currentStep > idx;
                    const isActive = currentStep === idx;
                    return (
                        <div key={idx} className="flex-1 flex flex-col items-center z-10">
                            <div
                                className={[
                                    "w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-300",
                                    isCompleted
                                        ? "bg-green-500 border-green-500 text-white dark:bg-green-600 dark:border-green-600"
                                        : isActive
                                            ? "bg-white border-blue-500 text-blue-600 dark:bg-slate-700 dark:border-blue-400 dark:text-blue-400"
                                            : "bg-gray-100 border-gray-300 text-gray-400 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-500",
                                ].join(" ")}
                            >
                                {isCompleted ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className="font-bold">{idx + 1}</span>
                                )}
                            </div>
                            <div
                                className={[
                                    "mt-3 text-sm font-semibold transition-colors duration-300 text-center",
                                    isActive
                                        ? "text-blue-700 dark:text-blue-400"
                                        : isCompleted
                                            ? "text-green-700 dark:text-green-400"
                                            : "text-gray-400 dark:text-gray-500",
                                ].join(" ")}
                            >
                                {step.title}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center hidden sm:block">
                                {step.description}
                            </div>
                        </div>
                    );
                })}
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

type KonfirmasiDataProps = {
    values: BiodataFields;
    dokumen: BerkasFields;
    dokumenMeta?: typeof dokumenList;
    onEditBiodata: () => void;
    onEditBerkas: () => void;
    onEditOrtu?: () => void;
};

function KonfirmasiData({
    values,
    dokumen,
    dokumenMeta = dokumenList,
    onEditBiodata,
    onEditBerkas,
    onEditOrtu,
}: KonfirmasiDataProps) {
    const previewItems = [
        { label: "Nama Lengkap", value: values.full_name },
        { label: "NISN", value: values.nisn },
        { label: "NIK", value: values.nik },
        { label: "Asal Sekolah", value: values.asal_sekolah },
        { label: "Tempat, Tanggal Lahir", value: `${values.tempat_lahir}, ${values.tanggal_lahir}` },
        { label: "Jenis Kelamin", value: getJenisKelaminLabel(values.gender) },
        { label: "Agama", value: getAgamaLabel(values.agama) },
        { label: "Keadaan Orang Tua", value: getKeadaanOrtuLabel(values.keadaan_ortu) },
        { label: "Status Keluarga", value: getStatusKeluargaLabel(values.status_keluarga) },
        { label: "Anak Ke/dari Bersaudara", value: `${values.anak_ke} dari ${values.dari_bersaudara}` },
        { label: "Tinggal Bersama", value: getTinggalBersamaLabel(values.tinggal_bersama) },
        { label: "Golongan Darah", value: getBloodTypeLabel(values.blood_type) },
        { label: "Berat & Tinggi Badan", value: `${values.berat_kg} kg, ${values.tinggi_cm} cm` },
        { label: "Riwayat Penyakit", value: values.riwayat_penyakit },
        { label: "Alamat Jalan", value: values.alamat_jalan },
        { label: "RT / RW", value: `${values.rt} / ${values.rw}` },
        { label: "Desa / Kelurahan", value: values.desa_kelurahan },
        { label: "Kecamatan", value: values.kecamatan },
        { label: "Kabupaten", value: values.kabupaten },
        { label: "Provinsi", value: values.provinsi },
        { label: "Kode Pos", value: values.kode_pos },
        { label: "Nomor HP", value: values.phone },
        { label: "Email", value: values.email },
        { label: "Alamat Jalan", value: values.alamat_jalan }, // duplicate intentional? If not needed, remove
    ];

    return (
        <div>
            <h2 className="font-bold text-xl mb-1">Periksa &amp; Konfirmasi Pendaftaran</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
                Silakan <span className="font-semibold text-blue-600 dark:text-blue-400">periksa ulang</span> seluruh data anda sebelum
                menekan tombol <b>Konfirmasi &amp; Daftar</b>. Jika ada <b>data yang salah</b>, silakan klik tombol &quot;Edit&quot;.
            </p>
            {/* Biodata preview */}
            <div className="mb-8 overflow-x-auto rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 dark:bg-slate-800 dark:border-slate-700">
                    <div className="font-bold text-base">Biodata</div>
                    <button
                        onClick={onEditBiodata}
                        className="text-blue-500 hover:underline text-sm dark:text-blue-400"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <table className="min-w-full text-sm">
                    <tbody>
                        {previewItems.map((item, idx) => (
                            <tr key={item.label + idx}>
                                <td className="p-2 pl-4 w-48 font-medium text-gray-700 dark:text-gray-300">{item.label}</td>
                                <td className="p-2">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Data Orang Tua/Wali Preview */}
            <div className="mb-8 overflow-x-auto rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 dark:bg-slate-800 dark:border-slate-700">
                    <div className="font-bold text-base">Data Orang Tua / Wali</div>
                    <button
                        onClick={onEditOrtu}
                        className="text-blue-500 hover:underline text-sm dark:text-blue-400"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <table className="min-w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="p-2 pl-4 font-medium w-48 text-gray-700 dark:text-gray-300">Nama Ayah</td>
                            <td className="p-2">{values.father_name}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Pendidikan Ayah</td>
                            <td className="p-2">{getPendidikanLabel(values.father_education)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Pekerjaan Ayah</td>
                            <td className="p-2">{getPekerjaanLabel(values.father_job)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Penghasilan Ayah</td>
                            <td className="p-2">{getPenghasilanLabel(values.father_income)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Nama Ibu</td>
                            <td className="p-2">{values.mother_name}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Pendidikan Ibu</td>
                            <td className="p-2">{getPendidikanLabel(values.mother_education)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Pekerjaan Ibu</td>
                            <td className="p-2">{getPekerjaanLabel(values.mother_job)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Penghasilan Ibu</td>
                            <td className="p-2">{getPenghasilanLabel(values.mother_income)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Nama Wali</td>
                            <td className="p-2">{values.wali_name}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Nomor HP Wali</td>
                            <td className="p-2">{values.no_hp_ortu_wali}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Email Wali</td>
                            <td className="p-2">{values.parent_email}</td>
                        </tr>
                        <tr>
                            <td className="p-2 pl-4 font-medium text-gray-700 dark:text-gray-300">Alamat Orang Tua/Wali</td>
                            <td className="p-2">{values.alamat_ortu_wali}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Dokumen Preview */}
            <div className="mb-8 overflow-x-auto rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 dark:bg-slate-800 dark:border-slate-700">
                    <div className="font-bold text-base">Dokumen Berkas</div>
                    <button
                        onClick={onEditBerkas}
                        className="text-blue-500 hover:underline text-sm dark:text-blue-400"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <table className="min-w-full text-sm">
                    <tbody>
                        {dokumenMeta.map((doc) => (
                            <tr key={doc.field}>
                                <td className="p-2 pl-4 w-64 font-medium dark:text-gray-300">{doc.label}</td>
                                <td className="p-2">
                                    {dokumen[doc.field as keyof BerkasFields] ? (
                                        <a
                                            href={dokumen[doc.field as keyof BerkasFields] as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 underline"
                                        >
                                            Lihat File
                                        </a>
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
    const [currentStep, setCurrentStep] = useState(0);
    const {
        berkas,
        control,
        errors,
        getValues,
        onSubmit,
        setBerkas,
        submitLoading,
        trigger,
    } = useStudent({ student: DEFAULT_STUDENT as Student, formMode: "PPDB" });

    const validateBerkas = useCallback(() => {
        const berkasRequired: [keyof BerkasFields, string][] = [
            ["photo", "Pas foto wajib diunggah."],
            ["kartu_keluarga", "Scan Kartu Keluarga wajib diunggah."],
            ["akta_kelahiran", "Scan Akta Kelahiran wajib diunggah."],
            ["ijazah_skl", "Scan Ijazah/Surat Keterangan Lulus wajib diunggah."],
        ];
        for (const [field, msg] of berkasRequired) {
            if (!berkas[field]) {
                toast.error(msg);
                return false;
            }
        }
        return true;
    }, [berkas]);

    const handlePrev = useCallback(() => {
        setCurrentStep((s) => Math.max(0, s - 1));
    }, []);

    const handleNext = useCallback(
        async (e?: React.MouseEvent) => {
            e?.preventDefault();

            const stepValidations: (keyof BiodataFields)[][] = [
                [
                    "full_name",
                    "nisn",
                    "nik",
                    "asal_sekolah",
                    "tempat_lahir",
                    "tanggal_lahir",
                    "gender",
                    "agama",
                    "keadaan_ortu",
                    "status_keluarga",
                    "anak_ke",
                    "dari_bersaudara",
                    "tinggal_bersama",
                    "blood_type",
                    "berat_kg",
                    "tinggi_cm",
                    "riwayat_penyakit",
                    "asal_sekolah",
                    "nik",
                    "kewarganegaraan",
                    "alamat_jalan",
                    "rt",
                    "rw",
                    "desa_kelurahan",
                    "kecamatan",
                    "kabupaten",
                    "provinsi",
                    "kode_pos",
                    "phone",
                    "email",
                ],
                [
                    "father_name",
                    "father_education",
                    "father_job",
                    "father_income",
                    "mother_name",
                    "mother_education",
                    "mother_job",
                    "mother_income",
                    "wali_name",
                    "no_hp_ortu_wali",
                    "parent_email",
                    "alamat_ortu_wali",
                ],
            ];

            if (currentStep === 0 || currentStep === 1) {
                const fieldsToValidate = stepValidations[currentStep];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const result = await trigger(fieldsToValidate as any, { shouldFocus: true });
                if (!result) {
                    const firstFieldError = fieldsToValidate.find((f) => errors[f]);
                    toast.error((firstFieldError && errors[firstFieldError]?.message) ||
                        (currentStep === 0 ? "Isian biodata masih ada yang belum valid." : "Isian data orang tua/wali masih ada yang belum valid."));
                    return;
                }
                setCurrentStep((s) => s + 1);
            } else if (currentStep === 2) {
                if (!validateBerkas()) return;
                setCurrentStep((s) => s + 1);
            } else if (currentStep === 3) {
                await onSubmit();
            } else {
                setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
            }
        },
        [currentStep, errors, trigger, onSubmit, validateBerkas]
    );

    const formatTanggalLahir = useCallback((tgl: string) => {
        if (!tgl) return "";
        try {
            const d = new Date(tgl);
            return d.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        } catch {
            return tgl;
        }
    }, []);

    const stepContent = useMemo(() => {
        switch (currentStep) {
            case 0:
                return <BiodataForm control={control} errors={errors} />;
            case 1:
                return <ParentForm control={control} errors={errors} />;
            case 2:
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
            case 3:
                return (
                    <div>
                        <KonfirmasiData
                            values={{
                                ...getValues(),
                                tanggal_lahir: formatTanggalLahir(getValues().tanggal_lahir),
                            }}
                            dokumen={berkas}
                            dokumenMeta={dokumenList}
                            onEditBiodata={() => setCurrentStep(0)}
                            onEditBerkas={() => setCurrentStep(2)}
                            onEditOrtu={() => setCurrentStep(1)}
                        />
                        <div className="flex flex-col gap-3 mt-6">
                            <Button onClick={handleNext} disabled={submitLoading} type="button">
                                {submitLoading ? "Menyimpan..." : "Konfirmasi & Daftar"}
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
    }, [currentStep, control, errors, berkas, getValues, setBerkas, submitLoading, handleNext, formatTanggalLahir]);

    return (
        <>
            <div className="fixed top-5 right-5 z-50">
                <ThemeToggleButton />
            </div>

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
                <Card>
                    <CardContent>
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
                            {currentStep !== 3 && (
                                <Button
                                    onClick={handleNext}
                                    disabled={currentStep === steps.length - 1}
                                    type="button"
                                >
                                    Selanjutnya
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}