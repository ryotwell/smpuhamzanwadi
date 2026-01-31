import { PENDIDIKAN_OPTIONS, PENGHASILAN_OPTIONS } from '@/lib/model/student';
import { z } from 'zod'

const studentSchemas = z.object({
    full_name: z.string({ message: "Nama lengkap wajib diisi" }).min(2, "Nama harus minimal 2 karakter").max(64, "Nama maksimal 64 karakter"),
    nisn: z.string({ message: "NISN wajib diisi" }).min(10, "NISN harus 10 digit angka").max(10, "NISN harus 10 digit angka").regex(/^\d{10}$/, "NISN harus 10 digit angka"),
    nik: z.string({ message: "NIK wajib diisi" }).min(16, "NIK harus 16 digit angka").max(16, "NIK harus 16 digit angka").regex(/^\d{16}$/, "NIK harus 16 digit angka"),
    asal_sekolah: z.string({ message: "Asal sekolah wajib diisi" }).min(2, "Asal sekolah minimal 2 karakter").max(64, "Asal sekolah maksimal 64 karakter"),
    tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }).min(2, "Tempat lahir minimal 2 karakter").max(64, "Tempat lahir maksimal 64 karakter"),
    tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }).min(8, "Tanggal lahir diperlukan"),
    gender: z.enum(["MALE", "FEMALE"], { message: "Pilih jenis kelamin" }),
    agama: z.enum(["ISLAM", "CHRISTIAN", "CATHOLIC", "HINDU", "BUDDHA", "KONGHUCU"], { message: "Pilih agama" }),
    keadaan_ortu: z.enum(["LENGKAP", "YATIM", "PIATU", "YATIM_PIATU"], { message: "Pilih keadaan orang tua" }),
    status_keluarga: z.enum(["ANAK_KANDUNG", "ANAK_TIRI", "ANAK_ANGKAT"], { message: "Pilih status keluarga" }),
    anak_ke: z.number({ message: "Anak ke wajib diisi" }).int().positive("Anak ke harus bilangan positif"),
    dari_bersaudara: z.number({ message: "Dari bersaudara wajib diisi" }).int().positive("Dari bersaudara harus bilangan positif"),
    tinggal_bersama: z.enum(["ORANG_TUA", "KAKEK_NENEK", "PAMAN_BIBI", "SAUDARA_KANDUNG", "KERABAT", "PANTI_PONTREN", "LAINNYA"], { message: "Pilih tinggal bersama" }),
    tinggal_bersama_lainnya: z.string({ message: "Keterangan tinggal bersama lainnya harus berupa teks" }).optional(),
    kewarganegaraan: z.enum(["WNI", "WNA"], { message: "Pilih kewarganegaraan" }),
    rt: z.string({ message: "RT harus berupa teks" }).optional(),
    rw: z.string({ message: "RW harus berupa teks" }).optional(),
    desa_kelurahan: z.string({ message: "Desa/Kelurahan wajib diisi" }).min(2, "Desa/Kelurahan minimal 2 karakter"),
    kecamatan: z.string({ message: "Kecamatan wajib diisi" }).min(2, "Kecamatan minimal 2 karakter"),
    kabupaten: z.string({ message: "Kabupaten wajib diisi" }).min(2, "Kabupaten minimal 2 karakter"),
    provinsi: z.string({ message: "Provinsi wajib diisi" }).min(2, "Provinsi minimal 2 karakter"),
    kode_pos: z.string({ message: "Kode pos wajib diisi" }).min(5, "Kode pos harus 5 digit").max(5, "Kode pos harus 5 digit"),
    alamat_jalan: z.string({ message: "Alamat jalan harus berupa teks" }).optional(),
    phone: z.string({ message: "Nomor HP wajib diisi" }).min(8, "Nomor HP minimal 8 digit").max(18, "Nomor HP tidak boleh lebih dari 18 karakter").regex(/^08\d{7,16}$/, "Nomor HP harus dimulai dari 08 dan angka"),
    email: z.string({ message: "Email harus berupa teks" }).email("Email tidak valid").optional().or(z.literal("")),
    blood_type: z.enum(["A", "B", "AB", "O", "UNKNOWN"], { message: "Pilih golongan darah" }),
    berat_kg: z.number({ message: "Berat badan wajib diisi" }).int("Berat badan harus bilangan bulat").optional(),
    tinggi_cm: z.number({ message: "Tinggi badan wajib diisi" }).int("Tinggi badan harus bilangan bulat").optional(),
    riwayat_penyakit: z.string({ message: "Riwayat penyakit harus berupa teks" }).optional(),
    is_accepted: z.boolean({ message: "Status diterima harus berupa boolean" }).optional(),
    batch_id: z.number({ message: "ID Batch harus berupa angka" }).optional(),
})

const parent = z.object({
    // Orang Tua dan Wali
    father_name: z.string({ message: "Nama ayah wajib diisi" }).min(2, "Nama ayah wajib diisi"),
    father_education: z.enum(PENDIDIKAN_OPTIONS.map((item) => item.value) as [string, ...string[]], { message: "Pendidikan ayah wajib dipilih" }),
    father_job: z.string({ message: "Pekerjaan ayah wajib diisi" }).min(1, "Pekerjaan ayah wajib diisi"),
    father_income: z.enum(PENGHASILAN_OPTIONS.map((item) => item.value) as [string, ...string[]], { message: "Penghasilan ayah wajib dipilih" }),
    mother_name: z.string({ message: "Nama ibu wajib diisi" }).min(2, "Nama ibu wajib diisi"),
    mother_education: z.enum(PENDIDIKAN_OPTIONS.map((item) => item.value) as [string, ...string[]], { message: "Pendidikan ibu wajib dipilih" }),
    mother_job: z.string({ message: "Pekerjaan ibu wajib diisi" }).min(1, "Pekerjaan ibu wajib diisi"),
    mother_income: z.enum(PENGHASILAN_OPTIONS.map((item) => item.value) as [string, ...string[]], { message: "Penghasilan ibu wajib dipilih" }),

    wali_name: z.string({ message: "Nama wali wajib diisi" }).min(2, "Nama wali wajib diisi"),
    no_hp_ortu_wali: z.string({ message: "Nomor HP wali wajib diisi" }).min(8, "Nomor HP wali minimal 8 digit").max(18, "Nomor HP wali tidak boleh lebih dari 18 karakter").regex(/^08\d{7,16}$/, "Nomor HP wali harus dimulai dari 08 dan angka"),
    parent_email: z.string({ message: "Email wali wajib diisi" }).email("Email wali tidak valid"),
    alamat_ortu_wali: z.string({ message: "Alamat wali wajib diisi" }).min(2, "Alamat wali wajib diisi"),
})

export const biodataSchema = z.object({
    ...studentSchemas.shape,
    ...parent.shape
})