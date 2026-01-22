"use client";

import { Toaster } from "@/components/ui/sonner";
import { useBatchStore } from "@/store/useBatchStore";
import { useEffect } from "react";

export default function FullWidthPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { getActiveBatch } = useBatchStore();
    useEffect(() => {
        getActiveBatch();
    }, [getActiveBatch]);
    return (
        <>
            <Toaster />
            <div>{children}</div>
        </>
    );
}
