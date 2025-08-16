<?php
// Configuración de headers para CORS y JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración
$counterFile = 'data/counter.json';
$logFile = 'data/visits.log';

// Crear directorio data si no existe
if (!file_exists('data')) {
    mkdir('data', 0755, true);
}

// Función para obtener IP del cliente
function getClientIP() {
    $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($ipKeys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Función para leer datos del contador
function readCounterData($file) {
    if (!file_exists($file)) {
        return [
            'count' => 8536,
            'created' => date('Y-m-d H:i:s'),
            'last_updated' => date('Y-m-d H:i:s'),
            'daily_stats' => [],
            'unique_ips' => []
        ];
    }
    
    $data = json_decode(file_get_contents($file), true);
    if (!$data) {
        return [
            'count' => 8536,
            'created' => date('Y-m-d H:i:s'),
            'last_updated' => date('Y-m-d H:i:s'),
            'daily_stats' => [],
            'unique_ips' => []
        ];
    }
    
    return $data;
}

// Función para guardar datos del contador
function saveCounterData($file, $data) {
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

// Función para registrar visita en log
function logVisit($file, $ip, $userAgent, $count) {
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $ip,
        'user_agent' => $userAgent,
        'count' => $count
    ];
    
    $logLine = json_encode($logEntry) . "\n";
    file_put_contents($file, $logLine, FILE_APPEND | LOCK_EX);
}

// Función para verificar si es una visita única
function isUniqueVisit($data, $ip) {
    $today = date('Y-m-d');
    
    // Verificar si la IP ya visitó hoy
    if (isset($data['daily_stats'][$today]['ips']) && 
        in_array($ip, $data['daily_stats'][$today]['ips'])) {
        return false;
    }
    
    return true;
}

try {
    // Leer datos actuales
    $data = readCounterData($counterFile);
    $clientIP = getClientIP();
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $today = date('Y-m-d');
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Incrementar contador solo si es visita única
        if (isUniqueVisit($data, $clientIP)) {
            $data['count']++;
            $data['last_updated'] = date('Y-m-d H:i:s');
            
            // Actualizar estadísticas diarias
            if (!isset($data['daily_stats'][$today])) {
                $data['daily_stats'][$today] = [
                    'visits' => 0,
                    'ips' => []
                ];
            }
            
            $data['daily_stats'][$today]['visits']++;
            $data['daily_stats'][$today]['ips'][] = $clientIP;
            
            // Mantener solo los últimos 30 días de estadísticas
            $data['daily_stats'] = array_slice($data['daily_stats'], -30, null, true);
            
            // Agregar IP a la lista de IPs únicas (mantener solo las últimas 1000)
            if (!in_array($clientIP, $data['unique_ips'])) {
                $data['unique_ips'][] = $clientIP;
                $data['unique_ips'] = array_slice($data['unique_ips'], -1000);
            }
            
            // Guardar datos
            saveCounterData($counterFile, $data);
            
            // Registrar en log
            logVisit($logFile, $clientIP, $userAgent, $data['count']);
            
            // Respuesta exitosa
            echo json_encode([
                'success' => true,
                'count' => $data['count'],
                'message' => 'Visit counted',
                'timestamp' => $data['last_updated']
            ]);
        } else {
            // Visita ya contada hoy
            echo json_encode([
                'success' => true,
                'count' => $data['count'],
                'message' => 'Already counted today',
                'timestamp' => $data['last_updated']
            ]);
        }
    } else {
        // GET request - solo devolver el contador actual
        echo json_encode([
            'success' => true,
            'count' => $data['count'],
            'last_updated' => $data['last_updated'],
            'daily_visits' => $data['daily_stats'][$today]['visits'] ?? 0
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}
?>