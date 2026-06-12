<?php
/**
 * Badrul Huda Academy - Live Content Management API
 * Stores data in database.json and handles base64 image uploads to /uploads directory.
 */

// Allow cross-origin requests for local testing / multi-origin setups
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$db_file = 'database.json';
$uploads_dir = 'uploads/';
$admin_token = 'BadrulHudaAdminToken123'; // Matches client header for authorization

// Helper to ensure database file exists
function init_db($file) {
    if (!file_exists($file)) {
        file_put_contents($file, json_encode([
            "news" => [],
            "gallery" => []
        ], JSON_PRETTY_PRINT));
    }
}

// Helper to load database
function load_db($file) {
    init_db($file);
    $content = file_get_contents($file);
    return json_decode($content, true) ?: ["news" => [], "gallery" => []];
}

// Helper to save database
function save_db($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Return all data
    echo json_encode(load_db($db_file));
    exit;
}

if ($method === 'POST') {
    // Authenticate POST requests
    $headers = getallheaders();
    $auth = '';
    
    // Look for authorization header (case-insensitive)
    foreach ($headers as $key => $value) {
        if (strtolower($key) === 'authorization') {
            $auth = $value;
            break;
        }
    }

    if ($auth !== $admin_token) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized access. Invalid admin token."]);
        exit;
    }

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || !isset($data['action'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid request payload or action missing."]);
        exit;
    }

    $db = load_db($db_file);

    switch ($data['action']) {
        case 'save_news':
            if (isset($data['news'])) {
                $db['news'] = $data['news'];
                save_db($db_file, $db);
                echo json_encode(["status" => "success", "message" => "News saved successfully"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "News payload is missing."]);
            }
            break;

        case 'save_gallery':
            if (isset($data['gallery'])) {
                $db['gallery'] = $data['gallery'];
                save_db($db_file, $db);
                echo json_encode(["status" => "success", "message" => "Gallery saved successfully"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Gallery payload is missing."]);
            }
            break;

        case 'upload_image':
            if (!isset($data['image']) || !isset($data['fileName'])) {
                http_response_code(400);
                echo json_encode(["error" => "Image data or file name missing."]);
                exit;
            }

            $base64_string = $data['image'];
            
            // Extract file extension and raw base64 data
            if (preg_match('/^data:image\/(\w+);base64,/', $base64_string, $type)) {
                $base64_string = substr($base64_string, strpos($base64_string, ',') + 1);
                $ext = strtolower($type[1]); // e.g., png, jpeg, jpg, webp

                if (!in_array($ext, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Invalid image type. Supported formats: jpg, jpeg, png, gif, webp."]);
                    exit;
                }

                $raw_data = base64_decode($base64_string);
                if ($raw_data === false) {
                    http_response_code(400);
                    echo json_encode(["error" => "Base64 decode failed."]);
                    exit;
                }
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Invalid image stream format."]);
                exit;
            }

            // Ensure uploads directory exists
            if (!file_exists($uploads_dir)) {
                mkdir($uploads_dir, 0777, true);
            }

            // Create a unique name to prevent collisions
            $safe_name = uniqid('img_', true) . '.' . $ext;
            $file_path = $uploads_dir . $safe_name;

            if (file_put_contents($file_path, $raw_data)) {
                echo json_encode([
                    "status" => "success",
                    "imageUrl" => $file_path
                ]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to write image to directory. Check folder permissions."]);
            }
            break;

        default:
            http_response_code(400);
            echo json_encode(["error" => "Unknown action: " . $data['action']]);
            break;
    }
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed."]);
?>
