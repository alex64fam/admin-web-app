import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup, SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Dog, Folder, LayoutGrid, LucideMessageCircleDashed, LucideScrollText, Ruler, Store, ToyBrickIcon, User, UserCheck2Icon, UsersRoundIcon, WalletCards } from 'lucide-react';
import AppLogo from './app-logo';

const checkPermission = (userPermissions: string[] | undefined, requiredPermissions: string | string[] | null | undefined): boolean => {
    if (!requiredPermissions) {
        return true; // No permissions required, allow access
    }
    if (!userPermissions || userPermissions.length === 0) {
        return false; // User has no permissions, deny access
    }
    if (Array.isArray(requiredPermissions)) {
        return requiredPermissions.some(permission => userPermissions.includes(permission));
    } else {
        return userPermissions.includes(requiredPermissions);
    }
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        permission: null
    },
    {
        title: 'Usuarios',
        permission: ['user.view', 'couple.view', 'pet.view', 'clothing.view'],
        children: [
            {
                title: 'Usuarios de aplicación',
                href: '/admin/allUsers',
                icon: User,
                permission: 'user.view',
            },
            {
                title: 'Parejas',
                href: '/admin/relationships',
                icon: UsersRoundIcon,
                permission: 'couple.view',
            },
            {
                title: 'Mascotas',
                href: '/admin/pets',
                icon: Dog,
                permission: 'pet.view',
            },
            {
                title: 'Pertenencias',
                href: '/admin/clothes',
                icon: ToyBrickIcon,
                permission: 'clothing.view',
            }
        ]
    },
    {
        title: 'Tienda',
        permission: ['product.view'],
        children: [
            {
                title: 'Productos',
                href: '/admin/products',
                icon: Store,
                permission: 'product.view',
            }
        ]
    },
    {
        title: 'Catálogos',
        permission: ['language.view', 'gender.view'],
        children: [
            {
                title: 'Idiomas',
                href: '/admin/languages',
                icon: LucideMessageCircleDashed,
                permission: 'language.view',
            },
            {
                title: 'Generos',
                href: '/admin/genders',
                icon: LucideScrollText,
                permission: 'gender.view',
            }
        ]
    },
    {
        title: 'Sistema',
        permission: ['admin.view', 'role.view', 'permission.view'],
        children: [
            {
                title: 'Administradores',
                href: '/admin/users',
                icon: User,
                permission: 'admin.view',
            },
            {
                title: 'Roles',
                href: '/admin/roles',
                icon: UserCheck2Icon,
                permission: 'role.view',
            },
            {
                title: 'Permisos',
                href: '/admin/permissions',
                icon: Ruler,
                permission: 'permission.view',
            }
        ]
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
        permission: null,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
        permission: null,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    console.log(auth);
    const userPermissions = auth.user?.permissions.map(permission => permission.name);
    auth.user?.roles.map(role => { // Anexa los permisos de los roles al usuario
        role.permissions.map((permission: { name: string }) => {
            if (!userPermissions?.includes(permission.name)) {
                userPermissions?.push(permission.name);
            }
        });
    });
    console.log(userPermissions);
    const filterNavItemsByPermission = (items: NavItem[]): NavItem[] => {
        return items.filter(item => {
            const isVisible = checkPermission(userPermissions, item.permission);
            if (isVisible && item.children) {
                const filteredChildren = filterNavItemsByPermission(item.children);
                if (filteredChildren.length > 0) {
                    return { ...item, children: filteredChildren };
                } else {
                    return false;
                }
            }
            return isVisible;
        }).map(item => {
            if (item.children) {
                return { ...item, children: filterNavItemsByPermission(item.children) };
            }
            return item;
        });
    };

    const filteredMainNavItems = filterNavItemsByPermission(mainNavItems);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
