import React from "react";
import { RequirementForm } from "../comps/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create New Requirement | Admin",
    description: "Admin panel page to create a new requirement.",
};

export default function CreateRequirement() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6">
                <RequirementForm formMode="CREATE" />
            </div>
        </div>
    );
}
