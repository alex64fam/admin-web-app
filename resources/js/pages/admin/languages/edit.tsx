import { Language } from "@/types";
import LanguageForm from '@/pages/admin/languages/form';

interface LanguageCreateFormProps {
    onClose: () => void;
    language: Language;
}

export default function LanguageEditForm({ onClose, language }: LanguageCreateFormProps) {
    return (
        <LanguageForm
            onClose={onClose}
            language={language}
        />
    );
}