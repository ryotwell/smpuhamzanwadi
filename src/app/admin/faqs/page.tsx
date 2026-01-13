"use client"

import { useEffect } from "react"
import { useFaqStore } from "@/store/useFaqStore"
import { columns } from "./comps/columns"
import { DataTable } from "./comps/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function FaqsPage() {
    const { faqs, getFaqs, loading } = useFaqStore()

    useEffect(() => {
        getFaqs()
    }, [getFaqs])

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
                <Button asChild>
                    <Link href="/admin/faqs/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add FAQ
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataTable columns={columns} data={faqs} />
            )}
        </div>
    )
}
