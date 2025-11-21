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
import { Batch } from "@/types/model"
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
import { APIPATHS } from "@/lib/constants"
import { Switch } from "@/components/ui/switch"

// Delete batch
async function deleteBatch(batchId: number) {
    if (!batchId) return;
    try {
        await axios.delete(`${APIPATHS.DELETEBATCH}/${batchId}`);
        toast.success("Batch deleted successfully.");
    } catch {
        toast.error("Failed to delete batch.");
    }
}

// Delete Action for batch
function BatchDeleteActions({ batch }: { batch: Batch }) {
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
                        onClick={() => navigator.clipboard.writeText(batch.id.toString())}
                    >
                        Copy batch ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/batchs/${batch.id}/edit`} scroll={true}>
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
                        Delete Batch Confirmation
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete batch &quot;<b>{batch.name}</b>&quot;? This action cannot be undone.
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
                            await deleteBatch(batch.id);
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

export const columns: ColumnDef<Batch>[] = [
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
        accessorKey: "name",
        header: "Nama Angkatan",
        cell: ({ row }) => (
            <div>{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "year",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tahun <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>{row.getValue("year")}</div>
        ),
    },
    {
        accessorKey: "is_active",
        header: "Aktif?",
        cell: ({ row }) => {
            const val = row.getValue("is_active")
            const [isActive, setIsActive] = React.useState(val ? true : false)

            const handleOnChange = () => {
                setIsActive(!isActive)
            }

            return (
                <Switch
                    id="is_active"
                    onClick={handleOnChange}
                    checked={isActive}
                />
            )
        },
    },
    {
        accessorKey: "start_date",
        header: "Tanggal Mulai",
        cell: ({ row }) => (
            <div>
                {row.getValue("start_date")
                    ? new Date(row.getValue("start_date") as string).toLocaleDateString()
                    : "-"}
            </div>
        ),
    },
    {
        accessorKey: "end_date",
        header: "Tanggal Selesai",
        cell: ({ row }) => (
            <div>
                {row.getValue("end_date")
                    ? new Date(row.getValue("end_date") as string).toLocaleDateString()
                    : "-"}
            </div>
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Dibuat <ArrowUpDown className="ml-2 h-4 w-4" />
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
        accessorKey: "updated_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Diupdate <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("updated_at")
                    ? new Date(row.getValue("updated_at") as string).toLocaleString()
                    : "-"}
            </div>
        ),
    },
    {
        accessorKey: "students",
        header: "Jumlah Siswa",
        cell: ({ row }) => {
            const students = row.getValue("students") as any[] | null;
            return <span>{students ? students.length : 0}</span>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const batch = row.original
            return <BatchDeleteActions batch={batch} />
        },
    },
]

export function DataTable({ data, meta }: { data: Batch[], meta: Meta }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const q = searchParams.get('q') ?? '';

    const [query, setQuery] = React.useState(q);
    const [sorting, setSorting] = React.useState<SortingState>([])

    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        year: false,
        created_at: false,
        updated_at: false,
    })
    const [rowSelection, setRowSelection] = React.useState({})

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query) {
                params.set('q', query);
            } else {
                params.delete('q');
            }
            router.push(`/admin/batchs?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timeout);
    }, [query, router, searchParams]);

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
            <div className="flex items-center py-4">
                <Input
                    placeholder="Cari nama angkatan..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="max-w-sm"
                />
                <Select
                    onValueChange={(value) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('limit', value);
                        params.set('page', '1');
                        router.push(`/admin/batchs?${params.toString()}`);
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
                            router.push(`/admin/batchs?${params.toString()}`);
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
                            router.push(`/admin/batchs?${params.toString()}`);
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
