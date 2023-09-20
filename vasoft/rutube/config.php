<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

return [
    'js' => [
        './dist/vasoft-rutube.bundle.js',
    ],
    'css' => [
        './dist/vasoft-rutube.bundle.css',
    ],
    'rel' => [
		'main.polyfill.core',
	],
    'skip_core' => true,
];
