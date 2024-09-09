<?php

    $inData = getRequestInfo();
    
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $phone = $inData["phone"];
    $userId = $inData["userId"];

    // Connect to the database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        // Prepare the SQL statement to delete the contact based on multiple fields
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE FirstName=? AND LastName=? AND Email=? AND Phone=? AND UserId=?");
        $stmt->bind_param("sssss", $firstName, $lastName, $email, $phone, $userId);

        // Execute the deletion and check if any rows were affected
        if ($stmt->execute() && $stmt->affected_rows > 0) 
        {
            returnWithSuccess("Contact deleted successfully");
        } 
        else 
        {
            returnWithError("No contact found with the provided details");
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }
    
    function returnWithError( $err )
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithSuccess( $message )
    {
        $retValue = '{"success":"' . $message . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }

?>
