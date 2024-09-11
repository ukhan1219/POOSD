
<?php
    $inData = getRequestInfo();

    $firstName = $inData['firstName'];
    $lastName = $inData['lastName'];
    $username = $inData['username'];
    $password = $inData['password'];
    //$id = $inData['id'];

// LOOKIE HERE

    $hashPassword = password_hash($password, PASSWORD_BCRYPT);
    
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "connectify"); 

    if($conn->connect_error){

        returnWithError($conn->connect_error);

    } else {

        $stmt = $conn->prepare("INSERT into users (firstName, lastName, username, password) VALUES (?,?,?,?)");
        $stmt->bind_param("ssss", $firstName, $lastName, $username, $password);
        
        if($stmt->execute()){

            $stmt->close();
            $conn->close();
            returnWithError("");

        } else{

            returnWithError($stmt->error);

        }

    }

    function getRequestInfo() {
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
	

?>