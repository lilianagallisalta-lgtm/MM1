<?php

return [
    'modules' => [
        'promotionCode',
        'user',
    ],

    'absoluteFiles' => [
    ],

    'rawFiles' => [
    ],

    'plainFiles' => [
    ],

    // Setter que se encargará de definir el archivo base, módulos, archivos absolutos, etc.
    'translationSetter' => Hawk\HkTranslation\TranslationSetter\HkTranslatorSetter::class,

    // Idiomas disponibles.
    'locales' => [
        'es_AR',
        'en',
    ],

    'fallback_locale' => 'es_AR',

    // Carpeta donde se encuentran los módulos.
    'modules_folder' => 'app/Modules',

    // Indica si debe usar una traducción base, sobre la cual se combinará cada
    // una de las traducciones que se carguen.
    'use_base' => false,

    // Carpeta donde se encuentra la traducción base.
    'base_folder' => 'app/Hawk/i18n/',
];