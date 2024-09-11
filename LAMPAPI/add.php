<?php
$inData = getRequestInfo();

$name = $inData["name"];
$email = $inData["email"];
$phone = $inData["phone"];
$userID = $inData["userID"];

$conn = new mysqli("localhost", "API", "APIPASSWORD", "connectify");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Check if a contact with the same email or phone already exists for this user
    $stmt = $conn->prepare("SELECT ID FROM contacts WHERE (email = ? OR phone = ?) AND userID = ?");
    $stmt->bind_param("ssi", $email, $phone, $userID); // userID should be an integer
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Contact with the same email or phone already exists
        returnWithError("A contact with this email or phone already exists.");
    } else {
        // Insert the new contact
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, userID) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $name, $email, $phone, $userID); // Ensure data types match
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            returnWithSuccess("Contact added successfully!");
        } else {
            returnWithError("Error adding contact.");
        }
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

function returnWithSuccess($message) {
    $retValue = '{"message":"' . $message . '"}';
    sendResultInfoAsJson($retValue);
}
