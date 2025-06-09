import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDown, ChevronRight, ToggleLeftIcon } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className='px-2 py-0'>
            <SidebarGroupLabel>Inicio</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (item.children) {
                        const hasActiveChild = item.children.some(child => child.href === page.url);
                        const [isOpen, setIsOpen] = useState(hasActiveChild);
                        return (
                            <Collapsible
                                key={item.title}
                                open={isOpen}
                                onOpenChange={setIsOpen}
                                className='group/collapsible'
                            >
                                <SidebarGroup>
                                    <SidebarGroupLabel asChild>
                                        <CollapsibleTrigger>
                                            {item.title}
                                            <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180'/>
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <SidebarMenu>
                                            {item.children.map((child) => (
                                                <SidebarMenuItem key={child.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={child.href === page.url}
                                                        tooltip={{ children: child.title }}
                                                    >
                                                        <Link href={child.href || ''} prefetch>
                                                            {child.icon && <child.icon />}
                                                            <span>{child.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </CollapsibleContent>
                                </SidebarGroup>
                            </Collapsible>
                        );
                    } else {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={item.href === page.url}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href || ''} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
    /*return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Inicio</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton  
                            asChild isActive={item.href === page.url}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );*/
}
