import React from 'react';
import GenderForm from '@/pages/admin/genders/form'; // Importa el nuevo componente compartido
import { Gender, Language } from '@/types'; // Asegúrate de que Language esté importado

interface GenderCreateFormProps {
    onClose: () => void;
    gender: Gender;
    activeLanguages: Language[]; // Recibe los idiomas activos desde la página principal
}

export default function GenderCreateForm({ onClose, gender, activeLanguages }: GenderCreateFormProps) {
    // GenderForm internamente se encargará de si es modo creación o edición
    return (
        <GenderForm
            onClose={onClose}
            gender={gender}
            activeLanguages={activeLanguages}
            // No pasamos la prop 'gender', lo que indica modo creación
        />
    );
}
