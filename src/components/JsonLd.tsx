import { config } from '@/config';
import { OrganizationJsonLd } from 'next-seo';

export default function JsonLd() {
    return (
        <>
            <OrganizationJsonLd
                type="Organization"
                logo={config.appLogo}
                legalName={config.appName}
                name={config.appName}
                address={{
                    streetAddress: config.contactAddress,
                    addressLocality: 'Pancor',
                    addressRegion: 'Nusa Tenggara Barat',
                    postalCode: '83612',
                    addressCountry: 'ID',
                    "@type": "PostalAddress"
                }}
                contactPoint={[
                    {
                        telephone: config.contactPhone,
                        contactType: 'customer service',
                        email: config.contactEmail,
                        "@type": "ContactPoint"
                    },
                ]}
                sameAs={[
                    config.contactSocialMediaFacebook,
                    config.contactSocialMediaInstagram,
                    config.contactSocialMediaYoutube,
                ].filter(Boolean)}
                url={config.baseUrl}
            />
        </>
    );
}
