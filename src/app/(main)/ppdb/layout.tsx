import { Toaster } from "@/components/ui/sonner";

export default function FullWidthPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Toaster />
            <div>{children}</div>
        </>
    );
}
