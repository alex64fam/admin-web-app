import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Language } from "@/types";
import { Head, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MenuSquare } from "lucide-react";
import { useState } from "react";
import LanguageCreateForm from "./create";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LanguageEditForm from "./edit";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Idiomas',
        href: '/Admin/Idiomas',
    }
];

interface LanguagesTableProps {
    languages: Language[];
    flash?: {
        success?: string;
        error?: string;
    }
}

export default function languagesTable({ languages }: LanguagesTableProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);

    const handleDeleteLanguage = (languageId: number) => {
        router.delete(route('admin.languages.destroy', languageId), {
            onSuccess: () => {
                console.log('Genero eliminado');
                //router.visit(route('admin.genders.index'));
            },
            onError: () => {
                console.log('Error al eliminar el genero');
            }
        });
    };

    const handleCreateLanguage = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditLanguage = (language: Language) => {
        setEditingLanguage(language);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingLanguage(null);
    };

    const columns: ColumnDef<Language>[] = [
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
            accessorKey: 'name',
            header: 'Idioma'
        },
        {
            accessorKey: 'code',
            header: 'Codigo'
        },
        {
            accessorKey: 'is_active',
            header: 'Activo',
            cell: ({ row }) => {
                const isActive = row.original.is_active;
                return (
                    <>
                        {isActive ? (
                            <Badge
                                className="bg-green-500 h-4 min-w-4 rounded-full px-01 font-mono tabular-nums"
                                variant="secondary"
                            />
                        ) : (
                            <Badge
                                className="bg-red-500 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
                                variant="destructive"
                            />
                        )}
                    </>
                );
            }
        },
        {
            accessorKey: 'created_at',
            header: 'Fecha de creacion',
            cell: ({ row }) => {
                return new Date(row.original.created_at).toLocaleDateString();
            }
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const language = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 p-0">
                                <MenuSquare/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(language.id.toString())}>Copiar ID</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => handleEditLanguage(language)}>Editar</DropdownMenuItem>
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
                                        <AlertDialogAction onClick={() => handleDeleteLanguage(language.id)}>Sí, Eliminar</AlertDialogAction>
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
            <Head title="Idiomas"/>
            <Card className="m-2">
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={languages}
                        globalFilterPlaceholder="Buscar idioma..."
                        onCreateClick={handleCreateLanguage}
                        onCreateComponent={(props) =>
                            <LanguageCreateForm {...props}/>
                        }
                    />
                </CardContent>
            </Card>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar Idioma</DialogTitle>
                        <DialogDescription>
                            Modifica los campos del idioma seleccionado
                        </DialogDescription>
                    </DialogHeader>
                    {editingLanguage && (
                        <LanguageEditForm
                            onClose={handleCloseEditModal}
                            language={editingLanguage}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}