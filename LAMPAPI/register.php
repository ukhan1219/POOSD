
<?php
    $inData = getRequestInfo();

    $firstName = $inData['firstName'];
    $lastName = $inData['lastName'];
    $username = $inData['username'];
    $password = $inData['password'];
    //$id = $inData['id'];

    $hashPassword = password_hash($password, PASSWORD_BCRYPT);
    
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    if($conn->connect_error){

        returnWithError($conn->connect_error);

    } else {

        $stmt = $conn->prepare("INSERT into users (firstName, lastName, username, password) VALUES (?,?,?,?)");
        $stmt->bind_param("ssss", $firstName, $lastName, $username, $password);
        
        if($stmt->execute()){


            $response = array("status" => "success", "message" => "Successful Register");
            sendResultInfoAsJson(json_encode($response));

        } else{

            returnWithError($stmt->error);

        }

        $stmt->close();
        $conn->close();

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