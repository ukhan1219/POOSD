<?php

    $inData = getRequestInfo();
    $userID = $inData["userID"];
    $searchTerm = "%" . $inData["userSearch"] . "%";
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost", "API", "APIPASSWORD", "connectify");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        
        $stmt = $conn->prepare("SELECT ID, name, email, phone FROM contacts WHERE userID = ? AND LOWER(name) LIKE ?");
        $stmt->bind_param("is", $userID, $searchTerm);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        while($row = $result->fetch_assoc())
        {
            if ($searchCount > 0) 
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"ID":"' . $row["ID"] . '", "name":"' . $row["name"] . '", "email":"' . $row["email"] . '", "phone":"' . $row["phone"] . '"}';
        }
        
        if ($searchCount == 0) 
        {
            returnWithError("No Records Found");
        } 
        else 
        {
            returnWithInfo($searchResults);
        }
        
        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }
    
    function returnWithError($err)
    {
        $retValue = '{"id":0,"name":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
    
    function returnWithInfo($searchResults)
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson($retValue);
    }

?>
