import { Language } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";

interface LanguageFormProps {
    onClose: () => void;
    language?: Language;
}

export default function LanguageForm({ onClose, language }: LanguageFormProps) {
    const isEditMode = !!language;
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        code: isEditMode ? language.code : '',
        name: isEditMode ? language.name : '',
        is_active: isEditMode ? language.is_active : true
    });

    useEffect(() => {
        if (isEditMode && language) {
            setData({
                code: language.code,
                name: language.name,
                is_active: language.is_active
            });
        } else if (!isEditMode) {
            reset();
            setData('is_active', true);
        }
    }, [language, isEditMode]);

    /*
    const handleSubmit = (e: FormEvent) {
        e.preventDefault();
        
        const submitMethod = isEditMode ? put : post;
        const submitRoute = isEditMode ? route('admin.languages.update', language.id) : route('admin.languages.store');

        submitMethod(submitRoute, {
            onSuccess
        });
    }*/
}