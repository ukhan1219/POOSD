<?php

    $inData = getRequestInfo();
    
    $ID = $inData["ID"];

    $conn = new mysqli("localhost", "API", "APIPASSWORD", "connectify"); 
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        $stmt = $conn->prepare("DELETE FROM contacts WHERE ID = ?");
        $stmt->bind_param("s", $ID);
        $stmt->execute();
        $stmt->close();
        $conn->close();

        returnWithError("");
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
