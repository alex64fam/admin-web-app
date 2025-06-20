import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Role } from "@/types";
import { Head } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MenuSquare } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/Admin/Roles',
    }
];

interface RolesTableProps {
    roles: Role[];
    flash?: {
        success?: string;
        error?: string;
    }
}

export default function rolesTable({ roles }: RolesTableProps) {
    const columns: ColumnDef<Role>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    ID <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        {
            accessorKey: 'name',
            header: 'Nombre',
        },
        {
            accessorKey: 'guard_name',
            header: 'Guard'
        },
        {
            accessorKey: 'actions',
            cell: ({ row }) => {
                const role = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 p-0">
                                <MenuSquare/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.id.toString())}>Copiar ID</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <AlertDialogTrigger asChild>
                                
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles"/>
            <Card className="m-2">
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={roles}
                        globalFilterPlaceholder="Buscar rol..."
                    />
                </CardContent>
            </Card>
        </AppLayout>
    );
}