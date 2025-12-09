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
import Image from "next/image"

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
import { Curriculum } from "@/types/model"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { collectMessages, showError, showSuccess } from "@/lib/utils"
import { useCurriculumStore } from "@/store/useCurriculumStore"

function CurriculumDeleteActions({ curriculum }: { curriculum: Curriculum }) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const { deleteCurriculum, loading } = useCurriculumStore()

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
                        onClick={() => navigator.clipboard.writeText(curriculum.id.toString())}
                    >
                        Copy curriculum ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/curriculums/${curriculum.id}/edit`} scroll={true}>
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
                        Hapus Kurikulum
                    </DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus kurikulum &quot;<b>{curriculum.name}</b>&quot;? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={async () => {
                            const success = await deleteCurriculum(curriculum.id)
                            if (success) {
                                showSuccess('Kurikulum berhasil dihapus')
                                setOpen(false);
                                router.refresh?.();
                            } else {
                                showError('Gagal menghapus kurikulum')
                            }
                        }}
                        disabled={loading}
                    >
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const getCategoryLabel = (category: string | null | undefined) => {
    switch (category) {
        case "EXTRACURRICULAR":
            return "Ekstrakurikuler";
        case "PROGRAM UNGGULAN":
            return "Program Unggulan";
        case "KO-CULLICULAR":
            return "Ko-Kurikuler";
        default:
            return "-";
    }
};

export const columns: ColumnDef<Curriculum>[] = [
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
        header: "Nama Kurikulum",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "category",
        header: "Kategori",
        cell: ({ row }) => (
            <div>{getCategoryLabel(row.getValue("category"))}</div>
        ),
    },
    {
        accessorKey: "image",
        header: "Gambar",
        cell: ({ row }) => {
            const image = row.getValue("image") as string | null | undefined;
            if (!image) return <div className="text-gray-400">-</div>;
            
            const imageSrc = image.startsWith('http') 
                ? image 
                : image.startsWith('/') 
                    ? image 
                    : `/${image}`;
            
            return (
                <div className="relative w-16 h-16 rounded overflow-hidden border">
                    <Image
                        src={imageSrc}
                        alt={row.original.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "description",
        header: "Deskripsi",
        cell: ({ row }) => {
            const description = row.getValue("description") as string | null | undefined;
            if (!description) return <div className="text-gray-400">-</div>;
            return (
                <div className="max-w-md truncate" title={description}>
                    {description}
                </div>
            );
        },
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const curriculum = row.original
            return <CurriculumDeleteActions curriculum={curriculum} />
        },
    },
]

export function DataTable() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const q = searchParams.get('q') ?? '';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '10';

    const [query, setQuery] = React.useState(q);
    const [sorting, setSorting] = React.useState<SortingState>([])

    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        category: false,
        image: false,
        description: false,
        created_at: false,
        updated_at: false,
    })
    const [rowSelection, setRowSelection] = React.useState({})

    const { curriculums, meta, getCurriculums } = useCurriculumStore()

    React.useEffect(() => {
        getCurriculums({ page, limit, q })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, q])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query) {
                params.set('q', query);
            } else {
                params.delete('q');
            }
            router.push(`/admin/curriculums?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timeout);
    }, [query, router, searchParams]);

    const table = useReactTable({
        data: curriculums,
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
                    placeholder="Cari nama kurikulum..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="max-w-sm"
                />
                <Select
                    onValueChange={(value) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('limit', value);
                        params.set('page', '1');
                        router.push(`/admin/curriculums?${params.toString()}`);
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
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getSelectedRowModel().rows.length} dari{" "}
                    {table.getRowModel().rows.length} baris dipilih.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('page', (meta.page - 1).toString());
                            router.push(`/admin/curriculums?${params.toString()}`);
                        }}
                        disabled={meta.page <= 1}
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('page', (meta.page + 1).toString());
                            router.push(`/admin/curriculums?${params.toString()}`);
                        }}
                        disabled={!meta.limit || table.getRowModel().rows.length < meta.limit}
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>
        </div>
    )
}

