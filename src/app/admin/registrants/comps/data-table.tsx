"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Batch, Student } from "@/types/model"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "@/lib/axios"
import { toast } from "sonner"
import Link from "next/link"

// Import shadcn/ui dialog
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Meta } from "@/types/api"
import { getAgamaLabel, getJenisKelaminLabel } from "@/lib/model/student"
import { APIPATHS } from "@/lib/constants"
import { getBatches } from "../../batches/actions"

// Delete students
async function deleteStudent(studentId: number) {
    if (!studentId) return;
    try {
        await axios.delete(`${APIPATHS.DELETESTUDENT}/${studentId}`);
        toast.success("Student deleted successfully.");
    } catch {
        toast.error("Failed to delete student.");
    }
}

// Delete Action for student
function StudentDeleteActions({ student }: { student: Student }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(student.id.toString())}
                    >
                        Copy student ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem asChild>
                        <Link href={`/admin/registrants/${student.id}`} scroll={true}>
                            Show
                        </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/registrants/${student.id}/edit`} scroll={true}>
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onSelect={e => e.preventDefault()}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Confirmation
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete student &quot;<b>{student.full_name}</b>&quot;? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={async () => {
                            setLoading(true);
                            await deleteStudent(student.id);
                            setLoading(false);
                            setOpen(false);
                            router.refresh?.();
                        }}
                        disabled={loading ? true : false}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export const columns: ColumnDef<Student>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "full_name",
        header: "Nama Lengkap",
        cell: ({ row }) => (
            <div>{row.getValue("full_name")}</div>
        ),
    },
    {
        accessorKey: "nisn",
        header: "NISN",
        cell: ({ row }) => (
            <div>{row.getValue("nisn")}</div>
        ),
    },
    {
        accessorKey: "nik",
        header: "NIK",
        cell: ({ row }) => (
            <div>{row.getValue("nik")}</div>
        ),
    },
    {
        accessorKey: "asal_sekolah",
        header: "Asal Sekolah",
        cell: ({ row }) => (
            <div>{row.getValue("asal_sekolah")}</div>
        ),
    },
    {
        accessorKey: "gender",
        header: "Jenis Kelamin",
        cell: ({ row }) => (
            <div className="capitalize">{getJenisKelaminLabel(row.getValue("gender")) ?? row.getValue("gender")}</div>
        ),
    },
    {
        accessorKey: "tanggal_lahir",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tgl Lahir
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("tanggal_lahir")
                    ? new Date(row.getValue("tanggal_lahir") as string).toLocaleDateString()
                    : "-"}
            </div>
        ),
    },
    {
        accessorKey: "agama",
        header: "Agama",
        cell: ({ row }) => (
            <div>
                {getAgamaLabel(row.getValue("agama") as string) ?? row.getValue("agama")}
            </div>
        ),
    },
    {
        accessorKey: "phone",
        header: "No HP",
        enableHiding: true,
        cell: ({ row }) => (
            <div>{row.getValue("phone")}</div>
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Didaftarkan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("created_at")
                    ? new Date(row.getValue("created_at") as string).toLocaleString()
                    : "-"}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const student = row.original
            return <StudentDeleteActions student={student} />
        },
    },
]

export function DataTable({ data, meta }: { data: Student[], meta: Meta }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const q = searchParams.get('q') ?? '';
    const batchIdFromParams = searchParams.get('batch') ?? '';

    const [query, setQuery] = React.useState(q);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [batches, setBatches] = React.useState<Batch[]>([])
    const [selectedBatchId, setSelectedBatchId] = React.useState<string>(batchIdFromParams);

    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        phone: false,
        agama: false,
    })
    const [rowSelection, setRowSelection] = React.useState({})

    const handleGetBatches = async () => {
        const data = await getBatches(1, 99999)

        if(data) {
            setBatches(data.data as Batch[])
        }
    }

    // Update query param for search on change
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query) {
                params.set('q', query);
            } else {
                params.delete('q');
            }
            // Also re-apply batch filter (if needed)
            if (selectedBatchId) {
                params.set('batch', selectedBatchId);
            } else {
                params.delete('batch');
            }
            router.push(`/admin/registrants?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, router, searchParams]);

    // Update param when select batch changes
    React.useEffect(() => {
        // Only trigger if value changes (not on initial mount to avoid double render)
        if (selectedBatchId !== (searchParams.get('batch') ?? "")) {
            const params = new URLSearchParams(searchParams.toString());
            if (selectedBatchId) {
                params.set('batch', selectedBatchId);
            } else {
                params.delete('batch');
            }
            router.push(`/admin/registrants?${params.toString()}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBatchId]);

    React.useEffect(() => {
        handleGetBatches()
    }, [])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Search name or NISN..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="max-w-sm"
                />
                {/* Select Batch */}
                <Select
                    value={selectedBatchId}
                    onValueChange={(value) => {
                        setSelectedBatchId(value);
                        // batch is being handled by useEffect!
                    }}
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Pilih Gelombang" />
                    </SelectTrigger>
                    <SelectContent>
                        {batches.map((batch) => (
                            <SelectItem key={batch.id} value={batch.id.toString()}>
                                {batch.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('limit', value);
                        params.set('page', '1');
                        router.push(`/admin/registrants?${params.toString()}`);
                    }}
                    value={meta.limit?.toString() ?? "10"}
                >
                    <SelectTrigger className="w-[100px] ml-auto">
                        <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                    </SelectContent>
                </Select>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-2">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No data found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getSelectedRowModel().rows.length} of{" "}
                    {table.getRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('page', (meta.page - 1).toString());
                            router.push(`/admin/registrants?${params.toString()}`);
                        }}
                        disabled={meta.page <= 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('page', (meta.page + 1).toString());
                            router.push(`/admin/registrants?${params.toString()}`);
                        }}
                        disabled={!meta.limit || table.getRowModel().rows.length < meta.limit}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
