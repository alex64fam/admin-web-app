// resources/js/Components/GenderCreateForm.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox'; // Para el campo is_active
import { Textarea } from '@/components/ui/textarea'; // Para el campo description
import { useForm, router } from '@inertiajs/react'; // Importamos 'router' para recargar la página si es necesario
import { Language } from '@/types'; // Asegúrate de que tu interfaz Language esté definida en types.d.ts
//import { useToast } from '@/components/ui/use-toast'; // Para mostrar notificaciones (toasts) de éxito/error

interface GenderCreateFormProps {
    onClose: () => void; // Función para cerrar el modal
    activeLanguages: Language[]; // Recibe los idiomas activos desde la página principal
}

export default function GenderCreateForm({ onClose, activeLanguages }: GenderCreateFormProps) {
    const { toast } = useToast(); // Inicializamos el hook de toast

    // Inicializamos el objeto 'names' con un campo vacío para cada idioma activo
    const initialNames: { [key: string]: string } = {};
    activeLanguages.forEach(lang => {
        initialNames[lang.code] = '';
    });

    // Usamos useForm de Inertia para manejar el estado del formulario y el envío
    const { data, setData, post, processing, errors, reset } = useForm({
        key: '',
        is_active: true, // Por defecto, activo
        description: '',
        names: initialNames, // Objeto para almacenar los nombres por idioma (ej: { es: 'Hombre', en: 'Male' })
    });

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.genders.store'), { // Ruta POST a tu controlador de Laravel
            onSuccess: () => {
                toast({
                    title: 'Género creado',
                    description: 'El nuevo género ha sido añadido exitosamente.',
                });
                onClose(); // Cierra el modal
                reset(); // Limpia los campos del formulario
                router.reload({ only: ['genders'] }); // Recarga solo la prop 'genders' para actualizar la tabla sin recargar toda la página
            },
            onError: (validationErrors) => {
                toast({
                    title: 'Error al crear género',
                    description: 'Por favor, revisa los campos e intenta de nuevo.',
                    variant: 'destructive',
                });
                console.error('Errores de validación:', validationErrors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Campo 'key' (Clave interna) */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="key" className="text-right">
                    Clave
                </Label>
                <Input
                    id="key"
                    value={data.key}
                    onChange={(e) => setData('key', e.target.value)}
                    className="col-span-3"
                />
                {errors.key && <div className="col-span-4 text-red-500 text-sm">{errors.key}</div>}
            </div>

            {/* Campo 'description' */}
            <div className="grid grid-cols-4 items-start gap-4"> {/* items-start para alinear la etiqueta con Textarea */}
                <Label htmlFor="description" className="text-right pt-2">
                    Descripción
                </Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="col-span-3"
                />
                {errors.description && <div className="col-span-4 text-red-500 text-sm">{errors.description}</div>}
            </div>

            {/* Campos 'name' dinámicos por idioma */}
            <h3 className="col-span-4 text-lg font-semibold mt-4 mb-2">Nombres por Idioma</h3>
            {activeLanguages.map(lang => (
                <div key={lang.code} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`name-${lang.code}`} className="text-right">
                        Nombre ({lang.name})
                    </Label>
                    <Input
                        id={`name-${lang.code}`}
                        value={data.names[lang.code] || ''} // Aseguramos que siempre sea un string
                        onChange={(e) => setData('names', { ...data.names, [lang.code]: e.target.value })}
                        className="col-span-3"
                    />
                    {/* Para errores de campos anidados, se usa la notación de punto en el string */}
                    {errors[`names.${lang.code}`] && (
                        <div className="col-span-4 text-red-500 text-sm">{errors[`names.${lang.code}`]}</div>
                    )}
                </div>
            ))}

            {/* Campo 'is_active' (Activo) */}
            <div className="grid grid-cols-4 items-center gap-4 mt-4">
                <div className="col-start-2 col-span-3 flex items-center space-x-2">
                    <Checkbox
                        id="is_active"
                        checked={data.is_active}
                        onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                    />
                    <Label htmlFor="is_active">
                        Activo
                    </Label>
                </div>
                {errors.is_active && <div className="col-span-4 text-red-500 text-sm">{errors.is_active}</div>}
            </div>

            {/* Botones de acción del formulario */}
            <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    );
}