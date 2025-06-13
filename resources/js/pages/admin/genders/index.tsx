import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Gender, Language } from "@/types";
import { Head, router } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Edit, Edit2, MenuSquare } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import React from "react";
import GenderCreateForm from "./create";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GenderEditForm from "./edit";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Generos',
        href: '/Admin/Generos',
    }
];

interface GendersTableProps {
    genders: Gender[];
    activeLanguages: Language[];
    flash?: {
        success?: string;
        error?: string;
    }
}

export default function GendersTable({ genders, activeLanguages }: GendersTableProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editingGender, setEditingGender] = React.useState<Gender | null>(null);

    const handleDeleteGender = (genderId: number) => {
        router.delete(route('admin.genders.destroy', genderId), {
            onSuccess: () => {
                console.log('Genero eliminado');
                //router.visit(route('admin.genders.index'));
            },
            onError: () => {
                console.log('Error al eliminar el genero');
            }
        });
    };

    const handleCreateGender = () => {
        setIsCreateModalOpen(true);
        console.log('Abriendo modal de creación');
    };

    const handeEditGender = (gender: Gender) => {
        setEditingGender(gender);
        setIsEditModalOpen(true);
        console.log('Abriendo modal de edición');
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingGender(null);
    };

    const columns: ColumnDef<Gender>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
        },
        {
            accessorKey: 'key',
            header: 'Código'
        },
        {
            accessorKey: 'name',
            header: 'Nombre'
        },
        {
            accessorKey: 'created_at',
            header: 'Fecha creación',
            cell: ({ row }) => {
                const date = new Date(row.original.created_at);
                return date.toLocaleDateString();
            }
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const gender = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 p-0">
                                <MenuSquare/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(gender.id.toString())}>Copiar ID</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            {/*<DropdownMenuItem>Ver</DropdownMenuItem>*/}
                            <DropdownMenuItem onClick={() => handeEditGender(gender)}>
                                Editar
                            </DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <span className="text-red-500">Eliminar</span>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Está seguro de eliminar?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Eliminará permanentemente el registro.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteGender(gender.id)}>Sí, Eliminar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Generos"/>
            <Card className="m-2">
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={genders}
                        globalFilterPlaceholder="Buscar genero..."
                        onCreateClick={handleCreateGender}
                        onCreateComponent={(props) => 
                            <GenderCreateForm {...props} activeLanguages={activeLanguages}/>
                        }
                    />
                </CardContent>
            </Card>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar Género</DialogTitle>
                        <DialogDescription>
                            Modifica los campos del género seleccionado.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Solo renderiza el formulario si hay un género para editar */}
                    {editingGender && (
                        <GenderEditForm
                            onClose={handleCloseEditModal}
                            gender={editingGender}
                            activeLanguages={activeLanguages}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}