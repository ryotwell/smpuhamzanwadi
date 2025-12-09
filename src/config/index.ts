export const config = {
    appName: process.env.NEXT_PUBLIC_APP_NAME as string,
    appLogo: process.env.NEXT_PUBLIC_APP_LOGO as string,
    appLogoPanjang: process.env.NEXT_PUBLIC_APP_LOGO_PANJANG as string,
    appLogoPanjangBw: process.env.NEXT_PUBLIC_APP_LOGO_PANJANGBW as string,

    baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
    apiUrl: process.env.NEXT_PUBLIC_API_URL as string,

    tinyMCEApiKey: process.env.NEXT_PUBLIC_TINYMCE_APIKEY as string,

    kepalaSekolah: process.env.NEXT_PUBLIC_KEPALASEKOLAH as string,
    kepalaSekolahPhoto: process.env.NEXT_PUBLIC_KEPALASEKOLAH_PHOTO as string,
    sambutan: process.env.NEXT_PUBLIC_SAMBUTAN as string,
};