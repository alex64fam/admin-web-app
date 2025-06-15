import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm, router } from '@inertiajs/react';
import { Gender, Language, GenderTranslation } from '@/types';
import { toast } from 'sonner';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface GenderFormProps {
    onClose: () => void;
    gender?: Gender; // Opcional: si se pasa, estamos en modo edición
    activeLanguages: Language[];
}

export default function GenderForm({ onClose, gender, activeLanguages }: GenderFormProps) {
    const isEditMode = !!gender; // Determina si estamos en modo edición
    const defaultLocale = 'es'; // Define tu idioma base por defecto

    // Ordenar los idiomas para que el idioma base aparezca primero
    const sortedLanguages = [...activeLanguages].sort((a, b) => {
        if (a.code === defaultLocale) return -1;
        if (b.code === defaultLocale) return 1;
        return a.name.localeCompare(b.name);
    });

    const initialNames: { [key: string]: string } = {};
    sortedLanguages.forEach(lang => {
        const existingTranslation = isEditMode
            ? gender?.translations?.find((t: GenderTranslation) => t.locale === lang.code)
            : undefined;
        initialNames[lang.code] = existingTranslation ? existingTranslation.name : '';
    });

    // Inicializa el formulario con los datos del género si está en modo edición, o vacíos si es creación
    const { data, setData, post, put, processing, errors, reset } = useForm({
        key: isEditMode ? gender.key : '',
        is_active: isEditMode ? gender.is_active : true,
        description: isEditMode ? (gender.description || '') : '',
        names: initialNames,
    });

    // Estado para gestionar el idioma seleccionado en el dropdown
    const [selectedLanguageCode, setSelectedLanguageCode] = React.useState(
        sortedLanguages.length > 0 ? sortedLanguages[0].code : ''
    );

    // useEffect para re-inicializar el formulario si el 'gender' prop cambia (en modo edición)
    // o para asegurar que el idioma seleccionado por defecto sea válido.
    useEffect(() => {
        const newInitialNames: { [key: string]: string } = {};
        sortedLanguages.forEach(lang => {
            const existingTranslation = isEditMode
                ? gender?.translations?.find((t: GenderTranslation) => t.locale === lang.code)
                : undefined;
            newInitialNames[lang.code] = existingTranslation ? existingTranslation.name : '';
        });

        setData({
            key: isEditMode ? gender.key : '',
            is_active: isEditMode ? gender.is_active : true,
            description: isEditMode ? (gender.description || '') : '',
            names: newInitialNames,
        });

        // Asegura que el idioma seleccionado por defecto exista en la lista actual de idiomas
        if (sortedLanguages.length > 0 && !sortedLanguages.some(lang => lang.code === selectedLanguageCode)) {
             setSelectedLanguageCode(sortedLanguages[0].code);
        }

    }, [gender, activeLanguages, isEditMode]); // Dependencias: gender, activeLanguages, isEditMode

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitMethod = isEditMode ? put : post;
        const submitRoute = isEditMode ? route('admin.genders.update', gender.id) : route('admin.genders.store');

        submitMethod(submitRoute, {
            onSuccess: () => {
                toast.success(`Género ${isEditMode ? 'actualizado' : 'creado'}`, {
                    description: `El género ha sido ${isEditMode ? 'modificado' : 'añadido'} exitosamente.`,
                });
                onClose();
                reset(); // Resetea el formulario después de guardar
                router.reload({ only: ['genders'] });
            },
            onError: (validationErrors) => {
                toast.error(`Error al ${isEditMode ? 'actualizar' : 'crear'} género`, {
                    description: 'Por favor, revisa los campos e intenta de nuevo.',
                });
                console.error('Errores de validación:', validationErrors);
            },
        });
    };

    const currentLanguage = sortedLanguages.find(lang => lang.code === selectedLanguageCode);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* Campo 'key' */}
            <div className="space-y-2">
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
            <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full"
                />
                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

            {/* Selector de idioma y campo de nombre dinámico */}
            {sortedLanguages.length > 0 && (
                <div className="space-y-4 pt-4">
                    <Label htmlFor="language-select">Seleccionar Idioma</Label>
                    <Select onValueChange={setSelectedLanguageCode} value={selectedLanguageCode}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Selecciona un idioma" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortedLanguages.map(lang => (
                                <SelectItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {currentLanguage && (
                        <div className="space-y-2 mt-4">
                            <Label htmlFor={`name-${currentLanguage.code}`}>
                                Nombre en {currentLanguage.name}
                                {/* Indicador de campo obligatorio si tu backend lo requiere para este idioma */}
                                {currentLanguage.code === defaultLocale && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            <Input
                                id={`name-${currentLanguage.code}`}
                                value={data.names[currentLanguage.code] || ''}
                                onChange={(e) => setData('names', { ...data.names, [currentLanguage.code]: e.target.value })}
                                className="w-full"
                                placeholder={`Nombre del género en ${currentLanguage.name}`}
                            />
                            {errors[`names.${currentLanguage.code}`] && (
                                <div className="text-red-500 text-sm">{errors[`names.${currentLanguage.code}`]}</div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Campo 'is_active' */}
            <div className="flex items-center space-x-2 pt-4">
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
