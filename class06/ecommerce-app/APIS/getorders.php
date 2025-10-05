<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit();
}

header('Content-Type: application/json');

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "r57_vue";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Prepare and execute the SQL statement to fetch orders
$sql = "SELECT id, name, phone, order_data, created FROM orders WHERE order_data IS NOT NULL AND order_data != 'null' ORDER BY created DESC";
$result = $conn->query($sql);

$orders = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Parse the order_data JSON
        $orderData = null;
        if (!empty($row['order_data']) && $row['order_data'] !== 'null') {
            $orderData = json_decode($row['order_data'], true);
        }
        
        // Add the order to the array
        $orders[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'order_data' => $orderData,
            'created' => $row['created']
        );
    }
    
    echo json_encode(['success' => true, 'orders' => $orders]);
} else {
    echo json_encode(['success' => true, 'orders' => array()]);
}

$conn->close();
?>