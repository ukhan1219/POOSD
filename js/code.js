const urlBase = 'http://connectify.fyi/LAMPAPI';
const extension = 'php'

// DELETE ALERT BOXESSSSSSSSS AFTER!!!!!!!!!!
// ^^^^^^^^^

let userID = 0;
let firstName = "";
let lastName = "";


// NEED SAVE EDIT OR CANCEL EDIT?


// SAMPLE HTML FILE FOR LANDING PAGE CONTACT TABLE:
{/* <table id="contacts-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody id="contacts-body">
        <!-- contacts will be displayed here -->
    </tbody>
</table> */}

// SAMPLE BUTTONS TO BE CODED INTO HTML FILE WITH THE TABLE:
// <button class="edit-btn" onclick="editContact(${contact.ID})">Edit</button>
// <button class="delete-btn" onclick="deleteContact(${contact.ID})">Delete</button>



function doSearch() {
    readCookie();

    let url = urlBase + "/search." + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let tmp = { userID, userID };

    let payload = JSON.stringify(tmp);

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                let contacts = jsonObject.results;

                let contactsBody = document.getElementById("contacts-body");
                contactsBody.innerHTML = "";

                for (let i = 0; i < contacts.length; i++) {
                    let contact = contacts[i];
                    let row = document.createElement("tr");
                    row.innerHTML = `
                    <td>${contact.email}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td>
                        <button class="edit-btn" onclick="editContact(${contact.ID})">Edit</button>
                        <button class="delete-btn" onclick="deleteContact(${contact.ID})">Delete</button>
                    </td>
                `;
                    contactsBody.appendChild(row);
                }
            }
        };
        xhr.send(payload);
    }
    catch (err) {
        console.log(err.message);
    }
}

function editContact(contactID) {
    readCookie();

    let name = prompt("Enter new name:");
    let email = prompt("Enter new email:");
    let phone = prompt("Enter new phone:");

    document.getElementById("contactEditResult").innerHTML = "";

    if (name == "" || email == "" || phone == "") {
        alert("Please fill all fields!");
        return;
    }

    let tmp = { ID: contactID, name: name, email: email, phone: phone, userID, userID };

    let payload = JSON.stringify(tmp);

    let url = urlBase + "/edit." + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                doSearch();
                document.getElementById("contactEditResult").innerHTML = "Contact has been edited successfully!";
            }
        };
        xhr.send(payload);
    }
    catch (err) {
        console.log(err.message);
    }
}

function deleteContact(contactID) {
    readCookie();

    let tmp = { ID: contactID };
    document.getElementById("contactDeleteResult").innerHTML = "";

    let payload = JSON.stringify(tmp);

    let url = urlBase + "/delete." + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                doSearch();
                document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted successfully!";
            }
        };
        xhr.send(payload);
    }
    catch (err) {
        console.log(err.message);
    }
}

function createContact() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    document.getElementById("contactAddResult").innerHTML = "";

    readCookie();

    // ADD EXTRA USERID CHECK LOGIN BLOCK>??


    if (name == "" || phone == "" || email == "") {
        alert("Please fill all fields!");
        return;
    }

    let tmp = { name: name, phone: phone, email: email, userID, userID };

    let payload = JSON.stringify(tmp);

    let url = urlBase + "/add." + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error && jsonObject.error !== "") {
                    
                    document.getElementById("contactAddResult").innerHTML = jsonObject.error;
                } else {
                    
                    document.getElementById("contactAddResult").innerHTML = "Contact has been added successfully!";
                    doSearch();
                }
            }
        };
        xhr.send(payload);
    }
    catch (err) {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }

}

function doRegister() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    document.getElementById("registerResult").innerHTML = "";
    if (firstName === "" || lastName === "" || username === "" || password === "") {
        alert("Fill out all field please!");
        return;
    }

    let tmp = { firstName: firstName, lastName: lastName, username: username, password: password };

    let payload = JSON.stringify(tmp);

    let url = urlBase + "/register." + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                err = jsonObject.err
                document.getElementById("registerResult").innerHTML = "User has been created successfully!";
                window.location.href = "login.html";
            }
        };
        xhr.send(payload);
    } catch (err) {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

function doLogin() {
    userID = 0;
    firstName = "";
    lastName = "";

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    document.getElementById("loginResult").innerHTML = "";

    let tmp = { username: username, password: password };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userID = jsonObject.id;

                if (userID < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "account.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userID=" + userID + ";expires=" + date.toGMTString();
}

function readCookie() {
    userID = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userID") {
            userID = parseInt(tokens[1].trim());
        }
    }

    if (userID < 0) {
        alert("You are not logged in!");
        window.location.href = "login.html";
    }
}

function doLogout() {
    userID = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function formatPhoneNumber(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 digits
    }

    // Format the value as (XXX)-XXX-XXXX
    if (value.length > 6) {
        value = `(${value.slice(0, 3)})-${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
        value = `(${value.slice(0, 3)})-${value.slice(3)}`;
    } else {
        value = `(${value}`;
    }

    input.value = value;
}

// Attach the formatPhoneNumber function to the input element
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
});
