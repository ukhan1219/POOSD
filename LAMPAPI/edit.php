
<?php
    $inData = getRequestInfo();

    $userId = $inData["userId"];
    $name = $inData["name"];
    $phone = $inData["phone"];
    $email = $inData["email"];
    
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    if($conn->connect_error){

        returnWithError($conn->connect_error);

    } else {

        $stmt = $conn->prepare("UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ? LIMIT 1 ");
        $stmt->bind_param("sssi", $name, $email, $phone, $userId); 

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