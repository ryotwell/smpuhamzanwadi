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

    contactAddress: process.env.NEXT_PUBLIC_CONTACT_ADDRESS as string,
    contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE as string,
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL as string,
    contactMap: process.env.NEXT_PUBLIC_CONTACT_MAP as string,
    contactSocialMediaInstagram: process.env.NEXT_PUBLIC_CONTACT_SOCIALMEDIA_INSTAGRAM as string,
    contactSocialMediaFacebook: process.env.NEXT_PUBLIC_CONTACT_SOCIALMEDIA_FACEBOOK as string,
    contactSocialMediaYoutube: process.env.NEXT_PUBLIC_CONTACT_SOCIALMEDIA_YOUTUBE as string,

};