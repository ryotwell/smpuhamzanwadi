export type Post = {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    description: string;
    content: string;
    published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    category: string;
};

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
    batch: Batch | null;
};

export type Batch = {
    id: number;
    name: string;
    jalur: "PRESTASI" | "REGULER" | string;
    is_active: boolean;
    start_date?: string | null;
    end_date?: string | null;
    created_at: string;
    updated_at: string;
    students: Student[] | null;
};

export type CurriculumCategory =
    | "EXTRACURRICULAR"
    | "PROGRAM UNGGULAN"
    | "KO-CULLICULAR";

export type Curriculum = {
    id: number;
    name: string;
    image?: string | null;
    category?: CurriculumCategory | null;
    description?: string | null;
    created_at: string;
    updated_at: string;
};

export type Facility = {
    id: number;
    name: string;
    image?: string | null;
    description?: string | null;
    created_at: string;
    updated_at: string;
}

// export const DEFAULT_STUDENT = {
//     full_name: "",
//     nisn: "",
//     nik: "",
//     asal_sekolah: "",
//     gender: "MALE",
//     tempat_lahir: "",
//     tanggal_lahir: "",
//     agama: "ISLAM",
//     keadaan_ortu: "LENGKAP",
//     status_keluarga: "ANAK_KANDUNG",
//     anak_ke: 1,
//     dari_bersaudara: 1,
//     tinggal_bersama: "ORANG_TUA",
//     tinggal_bersama_lainnya: "",
//     kewarganegaraan: "WNI",
//     rt: "",
//     rw: "",
//     desa_kelurahan: "",
//     kecamatan: "",
//     kabupaten: "",
//     provinsi: "",
//     kode_pos: "",
//     alamat_jalan: "",

//     phone: "",
//     email: "",
//     photo: "",
//     kartu_keluarga: "",
//     akta_kelahiran: "",
//     ijazah_skl: "",

//     blood_type: "UNKNOWN",
//     berat_kg: 0,
//     tinggi_cm: 0,
//     riwayat_penyakit: "",

//     // parent_id: 0,
//     parent: DEFAULT_PARENT,
// };

export const DEFAULT_PARENT = {
    father_name: "Rohsan Samsul Hadi",
    father_education: "SMA",
    father_job: "Petani",
    father_income: "",

    mother_name: "Seniwati",
    mother_education: "SMA",
    mother_job: "Petani",
    mother_income: "",

    wali_name: "Rohsan Samsul Hadi",
    alamat_ortu_wali: "Masbagik",
    no_hp_ortu_wali: "081234567890",
    parent_email: "rohsan@gmail.com",

    // student: undefined as any,
};

export const DEFAULT_STUDENT = {
    full_name: "Zulzario Zaeri",
    nisn: "3333333333",
    nik: "3333333333999999",
    asal_sekolah: "SD Negeri 123",
    gender: "MALE",
    tempat_lahir: "Masbagik, 21 Januari 2000",
    tanggal_lahir: "2000-01-21",
    agama: "ISLAM",
    keadaan_ortu: "LENGKAP",
    status_keluarga: "ANAK_KANDUNG",
    anak_ke: 1,
    dari_bersaudara: 1,
    tinggal_bersama: "ORANG_TUA",
    tinggal_bersama_lainnya: "",
    kewarganegaraan: "WNI",
    rt: "12",
    rw: "12",
    desa_kelurahan: "Masbagik",
    kecamatan: "Masbagik",
    kabupaten: "Masbagik",
    provinsi: "Masbagik",
    kode_pos: "12345",
    alamat_jalan: "Masbagik",

    phone: "081234567890",
    email: "zulzariozaeri@gmail.com",

    photo: "/upload/pas-foto/1762981667280-a014122425e5e4d3449531d02a8160bb.jpg",
    kartu_keluarga: "/upload/ijazah/1762993757073-1a441fd13fedefe3625b9fb361508e14.pdf",
    akta_kelahiran: "/upload/ijazah/1762993757073-1a441fd13fedefe3625b9fb361508e14.pdf",
    ijazah_skl: "/upload/ijazah/1762993757073-1a441fd13fedefe3625b9fb361508e14.pdf",

    blood_type: "UNKNOWN",
    berat_kg: 0,
    tinggi_cm: 0,
    riwayat_penyakit: "",

    // parent_id: 0,
    parent: DEFAULT_PARENT,
};

export type Requirement = {
    id: number;
    description: string;
    created_at: string;
    updated_at: string;
};

export type Faq = {
    id: number;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
};