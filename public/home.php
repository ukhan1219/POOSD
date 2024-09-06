<!DOCTYPE html>
<html>
<head>
    <title>Home Page</title>
    <style>
        /* Style for the black bar at the top */
        .top-bar {
            background-color: black;
            width: 100%;
            height: 50px;
            position: fixed;
            top: 0;
            left: 0;
        }

        /* Centering the content */
        body {
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50vh;
            background-color: #ffffff;
        }

        /* Spacing below the black bar */
        .content {
            margin-top: 60px; /* Pushes content below the black bar */
            text-align: center;
        }

        .button-container {
            margin-top: 20px;
        }

        .account-button {
            padding: 15px 30px;
            font-size: 18px;
            background-color: green;
            color: white;
            border: none;
            cursor: pointer;
            margin: 10px;
            border-radius: 5px;
        }

        .account-button:hover {
            background-color: darkgreen;
        }
    </style>
</head>
<body>
    <div class="top-bar"></div> <!-- Black bar at the top -->
    
    <div class="content">
        <h1>
            <img src="Connectify.png" alt="Logo" style="width: 200x; height: auto">
        </h1>
        <div class="button-container">
            <button class="account-button" onclick="window.location.href='signup.php';">Sign Up</button>
            <button class="account-button" onclick="window.location.href='login.php';">Login</button>
        </div>
    </div>
</body>
</html>
