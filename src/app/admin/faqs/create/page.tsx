import React from "react";
import { FaqForm } from "../comps/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create New FAQ | Admin",
    description: "Admin panel page to create a new FAQ.",
};

export default function CreateFaq() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6">
                <FaqForm formMode="CREATE" />
            </div>
        </div>
    );
}
