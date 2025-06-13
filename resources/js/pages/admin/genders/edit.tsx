import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm, router } from '@inertiajs/react';
import { Gender, Language, GenderTranslation } from '@/types';
import { toast } from 'sonner'; // Usamos sonner directamente

interface GenderEditFormProps {
    onClose: () => void;
    gender: Gender;
    activeLanguages: Language[];
}

export default function GenderEditForm({ onClose, gender, activeLanguages }: GenderEditFormProps) {
    const initialNames: { [key: string]: string } = {};
    activeLanguages.forEach(lang => {
        const existingTranslation = gender.translations?.find((t: GenderTranslation) => t.locale === lang.code);
        initialNames[lang.code] = existingTranslation ? existingTranslation.name : '';
    });

    const { data, setData, put, processing, errors, reset } = useForm({
        key: gender.key,
        is_active: gender.is_active,
        description: gender.description || '',
        names: initialNames,
    });

    useEffect(() => {
        const newInitialNames: { [key: string]: string } = {};
        activeLanguages.forEach(lang => {
            const existingTranslation = gender.translations?.find((t: GenderTranslation) => t.locale === lang.code);
            newInitialNames[lang.code] = existingTranslation ? existingTranslation.name : '';
        });

        setData({
            key: gender.key,
            is_active: gender.is_active,
            description: gender.description || '',
            names: newInitialNames,
        });
    }, [gender, activeLanguages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.genders.update', gender.id), {
            onSuccess: () => {
                toast.success('Género actualizado', {
                    description: 'El género ha sido modificado exitosamente.',
                });
                onClose();
                router.reload({ only: ['genders'] });
            },
            onError: (validationErrors) => {
                toast.error('Error al actualizar género', {
                    description: 'Por favor, revisa los campos e intenta de nuevo.',
                });
                console.error('Errores de validación:', validationErrors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-4"> {/* Usamos space-y para espaciado vertical entre campos */}
            {/* Campo 'key' */}
            <div className="space-y-2"> {/* Apila label e input verticalmente */}
                <Label htmlFor="key">Clave</Label>
                <Input
                    id="key"
                    value={data.key}
                    onChange={(e) => setData('key', e.target.value)}
                    className="w-full"
                />
                {errors.key && <div className="text-red-500 text-sm">{errors.key}</div>}
            </div>

            {/* Campo 'description' */}
            <div className="space-y-2"> {/* Apila label y textarea verticalmente */}
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full"
                />
                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

            {/* Campos 'name' dinámicos por idioma */}
            <h3 className="text-lg font-semibold pt-4 pb-2">Nombres por Idioma</h3>
            {activeLanguages.map(lang => (
                <div key={lang.code} className="space-y-2"> {/* Apila label e input verticalmente para cada idioma */}
                    <Label htmlFor={`name-${lang.code}`}>Nombre ({lang.name})</Label>
                    <Input
                        id={`name-${lang.code}`}
                        value={data.names[lang.code] || ''}
                        onChange={(e) => setData('names', { ...data.names, [lang.code]: e.target.value })}
                        className="w-full"
                    />
                    {errors[`names.${lang.code}`] && (
                        <div className="text-red-500 text-sm">{errors[`names.${lang.code}`]}</div>
                    )}
                </div>
            ))}

            {/* Campo 'is_active' */}
            <div className="flex items-center space-x-2 pt-4"> {/* Diseño simple para el checkbox */}
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', !!checked)}
                />
                <Label htmlFor="is_active">
                    Activo
                </Label>
            </div>
            {errors.is_active && <div className="text-red-500 text-sm">{errors.is_active}</div>}

            {/* Botones de acción del formulario */}
            <div className="flex justify-end gap-2 pt-6"> {/* Alinea botones a la derecha y añade padding-top */}
                <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Actualizando...' : 'Actualizar'}
                </Button>
            </div>
        </form>
    );
}