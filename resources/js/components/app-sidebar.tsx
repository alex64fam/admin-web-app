import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Dog, Folder, LayoutGrid, LucideMessageCircleDashed, LucideScrollText, Ruler, Store, ToyBrickIcon, User, UserCheck2Icon, UsersRoundIcon, WalletCards } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Usuarios',
        children: [
            {
                title: 'Usuarios de aplicación',
                href: '/admin/allUsers',
                icon: User,
            },
            {
                title: 'Parejas',
                href: '/admin/relationships',
                icon: UsersRoundIcon,
            },
            {
                title: 'Mascotas',
                href: '/admin/pets',
                icon: Dog,
            },
            {
                title: 'Pertenencias',
                href: '/admin/clothes',
                icon: ToyBrickIcon,
            }
        ]
    },
    {
        title: 'Tienda',
        children: [
            {
                title: 'Productos',
                href: '/admin/products',
                icon: Store,
            }
        ]
    },
    {
        title: 'Catálogos',
        children: [
            {
                title: 'Idiomas',
                href: '/admin/languages',
                icon: LucideMessageCircleDashed,
            },
            {
                title: 'Generos',
                href: '/admin/genders',
                icon: LucideScrollText,
            }
        ]
    },
    {
        title: 'Sistema',
        children: [
            {
                title: 'Administradores',
                href: '/admin/users',
                icon: User,
            },
            {
                title: 'Roles',
                href: '/admin/roles',
                icon: UserCheck2Icon,
            },
            {
                title: 'Permisos',
                href: '/admin/permissions',
                icon: Ruler,
            }
        ]
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
