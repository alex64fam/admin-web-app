import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Language } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";
import { toast } from "sonner";

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

    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const submitMethod = isEditMode ? put : post;
        const submitRoute = isEditMode ? route('admin.languages.update', language.id) : route('admin.languages.store');

        submitMethod(submitRoute, {
            onSuccess: () => {
                toast.success(`Idioma ${isEditMode ? 'actualizado' : 'creado'}`, {
                    description: `El idioma ha sido ${isEditMode ? 'modificado' : 'añadido'} exitosamente`,
                });
                onClose();
                reset();
                router.reload({ only: ['languages'] });
            },
            onError: (validationErrors) => {
                toast.error(`Error al ${isEditMode ? 'actualizar' : 'crear'} idioma`, {
                    description: 'Por favor, revise los campos e intenta de nuevo'
                });
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="code">Código (ej. 'es', 'en')</Label>
                <Input
                    id="code"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    className="w-full"
                    disabled={isEditMode}
                />
                {errors.code && <div className="text-ted-500 text-sm">{errors.code}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Nombre (ej. 'Español', 'English')</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full"
                />
                {errors.name && <div className="text-ted-500 text-sm">{errors.name}</div>}
            </div>
            <div className="flex items-center space-x-2 pt-4">
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', !!checked)}
                />
                <Label htmlFor="is_active">Activo</Label>
                {errors.is_active && <div className="text-ted-500 text-sm">{errors.is_active}</div>}
            </div>
            <div className="flex justify-end gap-2 pt-6">
                <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? (isEditMode ? 'Actualizando...' : 'Guardando...') : (isEditMode ? 'Actualizar' : 'Guardar')}
                </Button>
            </div>
        </form>
    );
}