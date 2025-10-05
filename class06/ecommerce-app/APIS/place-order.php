<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);
// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit();
}
header('Content-Type: application/json');

// Get the raw POST data
$rawData = file_get_contents('php://input');
$orderData = json_decode($rawData, true);
// Validate the input
if (!isset($orderData['name']) || !isset($orderData['phone']) || !isset($orderData['cart'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    exit;
}

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

// Prepare and execute the SQL statement to insert the order
$stmt = $conn->prepare("INSERT INTO orders (name, phone, order_data) VALUES (?, ?, ?)");
$name = $orderData['name'];
$phone = $orderData['phone'];
$orderJson = json_encode($orderData['cart']);

$stmt->bind_param("sss", $name, $phone, $orderJson);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error placing order: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>