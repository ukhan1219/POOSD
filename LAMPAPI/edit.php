
<?php
    $inData = getRequestInfo();

    $userId = $inData["userId"];
    $name = $inData["name"];
    $phone = $inData["phone"];
    $email = $inData["email"];

    /*
    if(empty($userId) || !is_numeric($userId)){

        returnWithError("Invalid userId");

    }
    */
    
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    if($conn->connect_error){

        returnWithError($conn->connect_error);

    } else {

        $stmt = $conn->prepare("UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ? LIMIT 1 ");
        $stmt->bind_param("sssi", $name, $email, $phone, $userId); //Maybe remove i

        if($stmt->execute()){


            $response = array("status" => "success", "message" => "Successful Contact Edit");
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