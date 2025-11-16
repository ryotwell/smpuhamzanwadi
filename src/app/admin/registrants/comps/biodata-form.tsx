import { z } from 'zod'
import { biodataSchema } from "@/schemas/student";
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { JenisKelaminRadio, SelectControls, TanggalLahirPicker } from './form';

export type BiodataFields = z.infer<typeof biodataSchema>;

type IBiodataFormProps = {
    control: Control<BiodataFields>;
    errors: FieldErrors<BiodataFields>;
};

export const BiodataForm = ({
    control,
    errors,
}: IBiodataFormProps) => {
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

    const tinggal_bersama = useWatch({ control, name: "tinggal_bersama" });

    return (
        <form className="space-y-5">
            {textInput("full_name", "Nama Lengkap", "text", "Masukkan nama lengkap", true)}
            {textInput("nisn", "NISN")}
            {textInput("nik", "NIK")}
            {textInput("tempat_lahir", "Tempat Lahir", "text", "Contoh: Mataram")}
            <Controller
                control={control}
                name="tanggal_lahir"
                render={({ field }) => (
                    <TanggalLahirPicker
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.tanggal_lahir?.message as string | undefined}
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
                name="keadaan_ortu"
                render={({ field }) => (
                    <SelectControls.KeadaanOrtu
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.keadaan_ortu?.message as string | undefined}
                    />
                )}
            />
            <Controller
                control={control}
                name="status_keluarga"
                render={({ field }) => (
                    <SelectControls.StatusKeluarga
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.status_keluarga?.message as string | undefined}
                    />
                )}
            />
            <div className="flex justify-between space-x-5">
                {numberInput("anak_ke", "Anak Ke", "Anak ke")}
                {numberInput("dari_bersaudara", "Dari Bersaudara", "Dari bersaudara")}
            </div>
            <Controller
                control={control}
                name="tinggal_bersama"
                render={({ field }) => (
                    <SelectControls.TinggalBersama
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.tinggal_bersama?.message as string | undefined}
                    />
                )}
            />
            {tinggal_bersama === 'LAINNYA' && (
                textInput("tinggal_bersama_lainnya", "Tinggal Bersama Lainnya", "Tinggal Bersama Lainnya")
            )}
            <Controller
                control={control}
                name="blood_type"
                render={({ field }) => (
                    <SelectControls.BloodType
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.blood_type?.message as string | undefined}
                    />
                )}
            />
            {numberInput("berat_kg", "Berat (kg)", "Berat (kg)")}
            {numberInput("tinggi_cm", "Tinggi (cm)", "Tinggi (cm)")}
            {textInput("riwayat_penyakit", "Riwayat Penyakit")}
            {textInput("asal_sekolah", "Asal Sekolah")}
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
            {textInput("alamat_jalan", "Alamat Jalan")}
            {textInput("rt", "RT")}
            {textInput("rw", "RW")}
            {textInput("desa_kelurahan", "Desa/Kelurahan")}
            {textInput("kecamatan", "Kecamatan")}
            {textInput("kabupaten", "Kabupaten")}
            {textInput("provinsi", "Provinsi")}
            {textInput("kode_pos", "Kode Pos")}
            {textInput("phone", "Nomor HP", "text", "08xxxxxxxxxx")}
            {textInput("email", "Email (jika ada)", "email", "contoh@mail.com")}
        </form>
    );
}