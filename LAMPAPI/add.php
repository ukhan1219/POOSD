<?php
$inData = getRequestInfo();

$name = $inData["name"];
$email = $inData["email"];
$phone = $inData["phone"];
$userID = $inData["userID"];
// $dateCreated = date('Y-m-d H:i:s'); // Current date and time

$conn = new mysqli("localhost", "API", "APIPASSWORD", "connectify"); 

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, userID, dateCreated) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $userID, $dateCreated);
    
    if ($stmt->execute()) {
        $response = array("status" => "success", "message" => "Contact added successfully");
        sendResultInfoAsJson(json_encode($response));
    } else {
        returnWithError("Failed to add contact");
    }
    
    $stmt->close();
    $conn->close();
}

function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err) {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}
?>
