<?php

namespace Database\Seeders;

use App\Models\RelationshipStatus as ModelsRelationshipStatus;
use App\Models\RelationshipStatusTranslation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RelationshipStatus extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $relationshipStatus = ModelsRelationshipStatus::create([
            'key' => 'relationship',
            'is_active' => true,
            'description' => 'Pareja noviazgo'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'es',
            'name' => 'Noviazgo'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'en',
            'name' => 'Relationship'
        ]);

        $relationshipStatus = ModelsRelationshipStatus::create([
            'key' => 'engaged',
            'is_active' => true,
            'description' => 'Pareja comprometida'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'es',
            'name' => 'Comprometida'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'en',
            'name' => 'Engaged'
        ]);

        $relationshipStatus = ModelsRelationshipStatus::create([
            'key' => 'married',
            'is_active' => true,
            'description' => 'Pareja casada'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'es',
            'name' => 'Casada'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'en',
            'name' => 'Married'
        ]);

        $relationshipStatus = ModelsRelationshipStatus::create([
            'key' => 'civil-union',
            'is_active' => true,
            'description' => 'Pareja en union libre'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'es',
            'name' => 'Union Libre'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'en',
            'name' => 'Civil Union'
        ]);

        $relationshipStatus = ModelsRelationshipStatus::create([
            'key' => 'complicated',
            'is_active' => true,
            'description' => 'Pareja en relacion complicada'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'es',
            'name' => 'Complicada'
        ]);
        RelationshipStatusTranslation::create([
            'relationship_status_id' => $relationshipStatus->id,
            'locale' => 'en',
            'name' => 'Complicated'
        ]);
    }
}
