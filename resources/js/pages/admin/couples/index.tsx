import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Parejas',
        href: '/Admin/Couples',
    }
];

interface CouplesTableProps {
    couples: Couple[];
}
