export type Parent = {
    id: number;
    createdAt: string;
    updatedAt: string;

    fatherName?: string;
    fatherEducation?: string;
    fatherJob?: string;
    fatherIncome?: string;

    motherName?: string;
    motherEducation?: string;
    motherJob?: string;
    motherIncome?: string;

    parentEmail?: string;

    waliName?: string;
    alamatOrtuWali?: string;
    noHpOrtuWali?: string;

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
    | "OTHER";

export type Student = {
    id: number;
    createdAt: string;
    updatedAt: string;

    fullName: string;
    nisn?: string;
    nik?: string;
    asalSekolah?: string;
    gender: Gender;
    tempatLahir?: string;
    tanggalLahir?: string;
    agama?: Religion;
    keadaanOrtu?: KeadaanOrtu;
    statusKeluarga?: StatusKeluarga;
    anakKe?: number;
    dariBersaudara?: number;
    tinggalBersama?: TinggalBersama;
    tinggalBersamaLainnya?: string;
    kewarganegaraan?: string;
    alamatJalan?: string;
    rt?: string;
    rw?: string;
    desaKelurahan?: string;
    kecamatan?: string;
    kabupaten?: string;
    provinsi?: string;
    kodePos?: string;
    phone?: string;
    email?: string;
    photo?: string;
    kartuKeluarga?: string;
    aktaKelahiran?: string;
    ijazahSKL?: string;

    bloodType?: BloodType;
    beratKg?: number;
    tinggiCm?: number;
    riwayatPenyakit?: string;

    parentId?: number;
    parent?: Parent;
};