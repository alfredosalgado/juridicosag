<?php
// Configuración del contador de visitas
return [
    // Configuración básica
    'base_count' => 8536,
    'data_directory' => 'data',
    'counter_file' => 'data/counter.json',
    'log_file' => 'data/visits.log',
    
    // Configuración de seguridad
    'allowed_origins' => ['*'], // Cambiar por tu dominio en producción
    'rate_limit' => [
        'enabled' => true,
        'max_requests' => 10,
        'time_window' => 3600 // 1 hora
    ],
    
    // Configuración de limpieza
    'cleanup' => [
        'keep_days' => 30,
        'max_ips' => 1000,
        'max_log_size' => 10485760 // 10MB
    ],
    
    // Configuración de estadísticas
    'stats' => [
        'track_user_agents' => true,
        'track_referrers' => true,
        'daily_stats' => true
    ]
];
?>