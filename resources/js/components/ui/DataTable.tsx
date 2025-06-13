import {
    ColumnDef,
    getCoreRowModel,
    ColumnFiltersState,
    SortingState,
    useReactTable,
    VisibilityState,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender
} from  '@tanstack/react-table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, PlusCircle } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    globalFilterPlaceholder?: string;
    showColumnVisibilityToggle?: boolean;
    onCreateClick?: () => void;
    onCreateComponent?: React.FC<{ onClose: () => void }>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    globalFilterPlaceholder = 'Buscar...',
    showColumnVisibilityToggle = true,
    onCreateClick,
    onCreateComponent: CreateFormComponent
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]); // Ordenamiento
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]); // Filtros de columna
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const  [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    return (
        <div className='w-full'>
            <div className='flex items-center py-4'>
                <Input
                    placeholder={globalFilterPlaceholder}
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('name')?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />

                {onCreateClick && CreateFormComponent && (
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={onCreateClick}>
                                <PlusCircle className='mr-2 h-4 w-4'/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                                <DialogTitle>Crear Nuevo Elemento</DialogTitle>
                                <DialogDescription>
                                    Completa los campos para añadir un nuevo registro.
                                </DialogDescription>
                            </DialogHeader>
                            {React.createElement(CreateFormComponent, { onClose: handleCloseCreateModal})}
                        </DialogContent>
                    </Dialog>
                )}

                {showColumnVisibilityToggle && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='ml-auto'>
                                Columnas <ChevronDown className='ml-2 h-4 w-4'/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className='capitalize'
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => 
                                                column.toggleVisibility(!!value) // !!value convierte el valor en un booleano
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            <div className='rounded-md border'>
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
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
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
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No se encontraron registros
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}