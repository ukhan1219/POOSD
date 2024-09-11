<?php

    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost", "API", "APIPASSWORD", "connectify");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        // Prepare the SQL statement to search for contacts by first name, last name, email, or phone
        $searchTerm = "%" . $inData["search"] . "%";
        $stmt = $conn->prepare("SELECT name, email, phone FROM contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR Phone LIKE ?) AND userID = ?");
        $stmt->bind_param("i", $inData["userID"]);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        // Building the search results as a JSON array
        while($row = $result->fetch_assoc())
        {
            if ($searchCount > 0) 
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"name":"' . $row["name"] . '", "email":"' . $row["email"] . '", "phone":"' . $row["phone"] . '"}';
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
