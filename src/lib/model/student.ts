type Option = { value: string; label: string };

const createLabelFunction = (options: Option[]) => (value: string) =>
    options.find(opt => opt.value === value)?.label ?? value;

const createValueFunction = (options: Option[]) => (label: string) =>
    options.find(opt => opt.label === label)?.value ?? label;

export const JENIS_KELAMIN_OPTIONS: Option[] = [
    { value: "MALE", label: "Laki-laki" },
    { value: "FEMALE", label: "Perempuan" },
];
export const getJenisKelaminLabel = createLabelFunction(JENIS_KELAMIN_OPTIONS);
export const getJenisKelaminValue = createValueFunction(JENIS_KELAMIN_OPTIONS);

export const AGAMA_OPTIONS: Option[] = [
    { value: "ISLAM", label: "Islam" },
    { value: "CHRISTIAN", label: "Kristen" },
    { value: "CATHOLIC", label: "Katolik" },
    { value: "HINDU", label: "Hindu" },
    { value: "BUDDHA", label: "Buddha" },
    { value: "KONGHUCU", label: "Konghucu" },
];
export const getAgamaLabel = createLabelFunction(AGAMA_OPTIONS);
export const getAgamaValue = createValueFunction(AGAMA_OPTIONS);

export const KEADAAN_ORTU_OPTIONS: Option[] = [
    { value: "LENGKAP", label: "Lengkap" },
    { value: "YATIM", label: "Yatim" },
    { value: "PIATU", label: "Piatu" },
    { value: "YATIM_PIATU", label: "Yatim Piatu" },
];
export const getKeadaanOrtuLabel = createLabelFunction(KEADAAN_ORTU_OPTIONS);
export const getKeadaanOrtuValue = createValueFunction(KEADAAN_ORTU_OPTIONS);

export const STATUS_KELUARGA_OPTIONS: Option[] = [
    { value: "ANAK_KANDUNG", label: "Anak Kandung" },
    { value: "ANAK_TIRI", label: "Anak Tiri" },
    { value: "ANAK_ANGKAT", label: "Anak Angkat" },
];
export const getStatusKeluargaLabel = createLabelFunction(STATUS_KELUARGA_OPTIONS);
export const getStatusKeluargaValue = createValueFunction(STATUS_KELUARGA_OPTIONS);

export const TINGGAL_BERSAMA_OPTIONS: Option[] = [
    { value: "ORANG_TUA", label: "Orang Tua" },
    { value: "KAKEK_NENEK", label: "Kakek Nenek" },
    { value: "PAMAN_BIBI", label: "Paman Bibi" },
    { value: "SAUDARA_KANDUNG", label: "Saudara Kandung" },
    { value: "KERABAT", label: "Kerabat" },
    { value: "PANTI_PONTREN", label: "Panti Pontren" },
    { value: "LAINNYA", label: "Lainnya" },
];
export const getTinggalBersamaLabel = createLabelFunction(TINGGAL_BERSAMA_OPTIONS);
export const getTinggalBersamaValue = createValueFunction(TINGGAL_BERSAMA_OPTIONS);

export const BLOOD_TYPE_OPTIONS: Option[] = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "AB", label: "AB" },
    { value: "O", label: "O" },
    { value: "UNKNOWN", label: "Tidak Tahu" },
];
export const getBloodTypeLabel = createLabelFunction(BLOOD_TYPE_OPTIONS);
export const getBloodTypeValue = createValueFunction(BLOOD_TYPE_OPTIONS);

export const KEWARGANEGARAAN_OPTIONS: Option[] = [
    { value: "WNI", label: "Warga Negara Indonesia (WNI)" },
    { value: "WNA", label: "Warga Negara Asing (WNA)" },
];
export const getKewarganegaraanLabel = createLabelFunction(KEWARGANEGARAAN_OPTIONS);
export const getKewarganegaraanValue = createValueFunction(KEWARGANEGARAAN_OPTIONS);

export const PENDIDIKAN_OPTIONS: Option[] = [
    { value: "TIDAK_SEKOLAH", label: "Tidak Sekolah" },
    { value: "SD", label: "SD/Sederajat" },
    { value: "SMP", label: "SMP/Sederajat" },
    { value: "SMA", label: "SMA/Sederajat" },
    { value: "D3", label: "D3" },
    { value: "S1", label: "S1" },
    { value: "S2", label: "S2" },
    { value: "S3", label: "S3" },
];
export const getPendidikanLabel = createLabelFunction(PENDIDIKAN_OPTIONS);
export const getPendidikanValue = createValueFunction(PENDIDIKAN_OPTIONS);

export const PEKERJAAN_OPTIONS: Option[] = [
    { value: "TIDAK_BEKERJA", label: "Tidak Bekerja" },
    { value: "PETANI", label: "Petani" },
    { value: "BURUH", label: "Buruh" },
    { value: "PEDAGANG", label: "Pedagang" },
    { value: "PNS", label: "PNS" },
    { value: "TNI_POLRI", label: "TNI/POLRI" },
    { value: "SWASTA", label: "Swasta" },
    { value: "WIRAUSAHA", label: "Wirausaha" },
    { value: "LAINNYA", label: "Lainnya" },
];
export const getPekerjaanLabel = createLabelFunction(PEKERJAAN_OPTIONS);
export const getPekerjaanValue = createValueFunction(PEKERJAAN_OPTIONS);

export const PENGHASILAN_OPTIONS: Option[] = [
    { value: "<=1000000", label: "≤ Rp1.000.000" },
    { value: "1000001-3000000", label: "Rp1.000.001 - Rp3.000.000" },
    { value: "3000001-5000000", label: "Rp3.000.001 - Rp5.000.000" },
    { value: "5000001-10000000", label: "Rp5.000.001 - Rp10.000.000" },
    { value: ">10000000", label: "> Rp10.000.000" },
];
export const getPenghasilanLabel = createLabelFunction(PENGHASILAN_OPTIONS);
export const getPenghasilanValue = createValueFunction(PENGHASILAN_OPTIONS);