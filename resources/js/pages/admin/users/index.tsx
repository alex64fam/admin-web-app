import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { User } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/Admin/Usuarios',
    },
];

interface Gender {
    id: number;
    key: string;
    name: string;
}

interface User {
    id: number;
    name: string;
    gender: Gender | null;
    email: string;
    created_at: string;
}

interface UsersTableProps {
    users: User[];
    flash?: {
        success?: string;
        error?: string;
    }
}

export default function UsersTable({ users }: UsersTableProps) {
    const { props } = usePage();
    const [searchTerm, setSearchTerm] = useState('');
    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return users;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return users.filter((user) => 
        user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.id.toString().includes(lowerCaseSearchTerm));
    }, [users, searchTerm]);

    const totalFilteredUsers = filteredUsers.length;

    const handleDeleteUser = (userId: number) => {
        router.delete(route('admin.users.destroy', userId), {
            onSuccess: (result) => {
                console.log("Usuario eliminado con éxito");
            },
            onError: () => {
                console.log('Error al eliminar el usuario');
            },
            preserveScroll: true,
        });
    }

    if (props.alert) {
        console.log(props);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className='my-5'>
                <Input
                    type='text'
                    placeholder='Buscar usuarios por nombre, email o ID'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='max-w-sm'
                />
                <Table>
                    <TableCaption>Lista de Usuarios</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Sexo</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Creado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredUsers.length > 0 ? ( // Muestra los usuarios filtrados
                        filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.gender ? user.gender.name : 'N/A'}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                            {/* <Button variant="outline" size="sm" className="mr-2">Editar</Button> */}

                            {/* Implementación del AlertDialog para eliminar */}
                            <AlertDialog>
                                {/* AlertDialogTrigger es el elemento que abre el modal. Aquí es tu botón "Eliminar". */}
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">Eliminar</Button>
                                </AlertDialogTrigger>
                                {/* AlertDialogContent es el contenido del modal */}
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario
                                            de nuestros servidores.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                <AlertDialogFooter>
                                    {/* AlertDialogCancel es el botón para cancelar la acción */}
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    {/* AlertDialogAction es el botón que confirma la acción. Aquí se llama a handleDeleteUser. */}
                                    <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                                    Sí, eliminar usuario
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        // Mensaje si no hay resultados de búsqueda
                        <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                            No se encontraron usuarios que coincidan con la búsqueda.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total de Usuarios</TableCell>
                            <TableCell className='text-right'>{totalFilteredUsers}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}