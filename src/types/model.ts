export type Parent = {
    id: number;
    created_at: string;
    updated_at: string;

    father_name: string;
    father_education: string;
    father_job: string;
    father_income: string;

    mother_name: string;
    mother_education: string;
    mother_job: string;
    mother_income: string;

    wali_name: string;
    alamat_ortu_wali: string;
    no_hp_ortu_wali: string;
    parent_email: string;

    student?: Student;
};

export const DEFAULT_PARENT = {
    // id: 0,
    // created_at: "",
    // updated_at: "",

    father_name: "",
    father_education: "",
    father_job: "",
    father_income: "",

    mother_name: "",
    mother_education: "",
    mother_job: "",
    mother_income: "",

    wali_name: "",
    alamat_ortu_wali: "",
    no_hp_ortu_wali: "",
    parent_email: "",

    // student: undefined as any,
};

export type Gender = "MALE" | "FEMALE";

export type BloodType = "A" | "B" | "AB" | "O" | "UNKNOWN";

export type TinggalBersama =
    | "ORANG_TUA"
    | "KAKEK_NENEK"
    | "PAMAN_BIBI"
    | "SAUDARA_KANDUNG"
    | "KERABAT"
    | "PANTI_PONTREN"
    | "LAINNYA";

export type StatusKeluarga = "ANAK_KANDUNG" | "ANAK_TIRI" | "ANAK_ANGKAT";

export type KeadaanOrtu = "LENGKAP" | "YATIM" | "PIATU" | "YATIM_PIATU";

export type Religion =
    | "ISLAM"
    | "CHRISTIAN"
    | "CATHOLIC"
    | "HINDU"
    | "BUDDHA"
    | "KONGHUCU"

export type Kewarganegaraan = 'WNI' | 'WNA';

export type Student = {
    id: number;
    created_at: string;
    updated_at: string;

    full_name: string;
    nisn: string;
    nik: string;
    asal_sekolah: string;
    gender: Gender;
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: Religion;
    keadaan_ortu: KeadaanOrtu;
    status_keluarga: StatusKeluarga;
    anak_ke: number;
    dari_bersaudara: number;
    tinggal_bersama: TinggalBersama;
    tinggal_bersama_lainnya: string;
    kewarganegaraan: Kewarganegaraan;
    rt: string;
    rw: string;
    desa_kelurahan: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    kode_pos: string;
    alamat_jalan: string;

    phone: string;
    email: string;
    photo: string;
    kartu_keluarga: string;
    akta_kelahiran: string;
    ijazah_skl: string;

    blood_type: BloodType;
    berat_kg: number;
    tinggi_cm: number;
    riwayat_penyakit: string;

    parent_id: number;
    parent: Parent;

    batch_id: number;
    batch: Batch;
};

export type Batch = {
    id: number;
    name: string;
    year: number;
    created_at: string;
    updated_at: string;
    students?: Student[];
};

export const DEFAULT_STUDENT = {
    // id: 0,
    // created_at: "",
    // updated_at: "",

    full_name: "",
    nisn: "",
    nik: "",
    asal_sekolah: "",
    gender: "MALE",
    tempat_lahir: "",
    tanggal_lahir: "",
    agama: "ISLAM",
    keadaan_ortu: "LENGKAP",
    status_keluarga: "ANAK_KANDUNG",
    anak_ke: 1,
    dari_bersaudara: 1,
    tinggal_bersama: "ORANG_TUA",
    tinggal_bersama_lainnya: "",
    kewarganegaraan: "WNI",
    rt: "",
    rw: "",
    desa_kelurahan: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    kode_pos: "",
    alamat_jalan: "",

    phone: "",
    email: "",
    photo: "",
    kartu_keluarga: "",
    akta_kelahiran: "",
    ijazah_skl: "",

    blood_type: "UNKNOWN",
    berat_kg: 0,
    tinggi_cm: 0,
    riwayat_penyakit: "",

    // parent_id: 0,
    parent: DEFAULT_PARENT,
};