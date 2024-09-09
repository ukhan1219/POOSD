<?php

    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {
        // Prepare the SQL statement to search for contacts by first name, last name, email, or phone
        $searchTerm = "%" . $inData["search"] . "%";
        $stmt = $conn->prepare("SELECT FirstName, LastName, Email, Phone FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR Phone LIKE ?) AND UserId = ?");
        $stmt->bind_param("sssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $inData["userId"]);
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
            $searchResults .= '{"firstName":"' . $row["FirstName"] . '", "lastName":"' . $row["LastName"] . '", "email":"' . $row["Email"] . '", "phone":"' . $row["Phone"] . '"}';
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
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
    
    function returnWithInfo($searchResults)
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson($retValue);
    }

?>
