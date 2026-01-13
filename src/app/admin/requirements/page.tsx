"use client"

import { useEffect } from "react"
import { useRequirementStore } from "@/store/useRequirementStore"
import { columns } from "./comps/columns"
import { DataTable } from "./comps/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import Link from "next/link"

export default function RequirementsPage() {
    const { requirements, getRequirements, loading } = useRequirementStore()

    useEffect(() => {
        getRequirements()
    }, [getRequirements])

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">General Requirements</h1>
                <Button asChild>
                    <Link href="/admin/requirements/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Requirement
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataTable columns={columns} data={requirements} />
            )}
        </div>
    )
}
