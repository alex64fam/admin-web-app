import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    children?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface GenderTranslation {
    id: number;
    gender_id: number;
    locale: string;
    name: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Gender {
    id: number;
    key: string;
    is_active: boolean;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    translations: GenderTranslation[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    role: string;
    is_active: boolean;
    description: string;
    created_at: string;
    updated_at: string;
    pivot?: {
        role_id: number;
        user_id: number;
        created_at: string;
        updated_at: string;
    }
    [key: string]: unknown; // This allows for additional properties...
}

export interface User {
    id: number;
    name: string;
    username: string;
    gender: Gender | null;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    birthday?: string;
    avatar?: string;
    is_active: boolean;
    email_verified_at: string | null;
    roles: Roles[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Language {
    id: number;
    code: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}