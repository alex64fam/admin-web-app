import LanguageForm from "@/pages/admin/languages/form";

interface LanguageCreateFormProps {
    onClose: () => void;
}

export default function LanguageCreateForm({ onClose }: LanguageCreateFormProps) {
    return (
        <LanguageForm onClose={onClose}/>
    );
}