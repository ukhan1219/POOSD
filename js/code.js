const urlBase = 'http://connectify.fyi/LAMPAPI';
const extension = 'php'

let userID = 0;
let firstName = "";
let lastName = "";
let contacts = [];

//  search function
function doSearch() {
    //  ensure correct user is logged in 
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
                contacts = jsonObject.results;

                let contactsBody = document.getElementById("contacts-body");
                contactsBody.innerHTML = "";
                //  for loop to list all contacts assigned to a user, and hidden elements to allow for editing of the contacts inline without having
                //  to navigate to a new page
                for (let i = 0; i < contacts.length; i++) {
                    let contact = contacts[i];
                    let row = document.createElement("tr");

                    //  assign contact id to the row data-id as well for easier indexing and passing contact id values to other functions which require it
                    row.setAttribute("data-id", contact.ID);
                    row.innerHTML = `
                        <td><span class="contact-name">${contact.name}</span><input type="text" class="edit-name hidden" value="${contact.name}"></td>
                        <td><span class="contact-email">${contact.email}</span><input type="text" class="edit-email hidden" value="${contact.email}"></td>
                        <td><span class="contact-phone">${contact.phone}</span><input type="text" class="edit-phone hidden" value="${contact.phone}"></td>
                        <td>
                            <button class="edit-btn" onclick="enableEditMode(${contact.ID})">Edit</button>
                            <button class="save-btn hidden" onclick="saveContact(${contact.ID})">Save</button>
                            <button class="cancel-btn hidden" onclick="cancelEdit(${contact.ID})">Cancel</button>
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


//  function to enable edit mode for a contact and subsequently change the buttons by looking for the correct contact and data id assigned earlier when 
//  returning all contacts
function enableEditMode(contactID) {
    let row = document.querySelector(`tr[data-id="${contactID}"]`)
    row.querySelectorAll('span').forEach(row => row.classList.add('hidden'));
    row.querySelectorAll('input').forEach(row => row.classList.remove('hidden'));
    row.querySelector('.edit-btn').classList.add('hidden');
    row.querySelector('.save-btn').classList.remove('hidden');
    row.querySelector('.cancel-btn').classList.remove('hidden');
}


//  function to cancel changes of the contact incase the user want to keep the contact as is 
function cancelEdit(contactID) {
    let row = document.querySelector(`tr[data-id="${contactID}"]`);
    row.querySelectorAll('span').forEach(rowElement => rowElement.classList.remove('hidden'));
    row.querySelectorAll('input').forEach(rowElement => rowElement.classList.add('hidden'));
    row.querySelector('.edit-btn').classList.remove('hidden');
    row.querySelector('.save-btn').classList.add('hidden');
    row.querySelector('.cancel-btn').classList.add('hidden');
}

//  save the changes the user made to the contact
function saveContact(contactID) {
    document.getElementById("contactEditResult").innerHTML = "";
    let row = document.querySelector(`tr[data-id="${contactID}"]`);
    let name = row.querySelector('.edit-name').value;
    let email = row.querySelector('.edit-email').value;
    let phone = row.querySelector('.edit-phone').value;

    let tmp = { ID: contactID, name: name, email: email, phone: phone, userID, userID };

    let payload = JSON.stringify(tmp);

    let url = urlBase + "/edit." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    //  API request delivery to update the contact information and success result
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                row.querySelector('.contact-name').textContent = name;
                row.querySelector('.contact-email').textContent = email;
                row.querySelector('.contact-phone').textContent = phone;

                row.querySelectorAll('span').forEach(rowElement => rowElement.classList.remove('hidden'));
                row.querySelectorAll('input').forEach(rowElement => rowElement.classList.add('hidden'));
                row.querySelector('.edit-btn').classList.remove('hidden');
                row.querySelector('.save-btn').classList.add('hidden');
                row.querySelector('.cancel-btn').classList.add('hidden');

                document.getElementById("contactEditResult").innerHTML = "Contact has been Edited successfully!";
                setTimeout(() => {
                    document.getElementById("contactEditResult").innerHTML = "";
                }, 3000);

            }
        };
        xhr.send(payload);
    }
    catch (err) {
        console.log(err.message);
    }


}

//  function to delete contact and ensuring the user truly wants to delete the contact
function deleteContact(contactID) {
    readCookie();
    var confirmDel = window.confirm("Are you sure you want to delete this contact?");

    if (confirmDel == 0) {
        return;
    }
    let tmp = { ID: contactID };
    // document.getElementById("contactDeleteResult").innerHTML = "";

    let payload = JSON.stringify(tmp);

    let url = urlBase + "/delete." + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    //  API request delivery to delete the contact information, and success result
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

//  function to create the contact bound to a user
function createContact() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    // document.getElementById("contactAddResult").innerHTML = "";

    readCookie();

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

    //  API request delivery to create a new contact and success result
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error && jsonObject.error !== "") {
                    document.getElementById("contactAddResult").innerHTML = jsonObject.error;
                } else {
                    document.getElementById("contactAddResult").innerHTML = "Contact has been added successfully!";
                    doSearch();
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                }
            }
        };
        xhr.send(payload);
    }
    catch (err) {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }

}

//  function to create a new user to the applicatoin 
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

    //  API request delivery to create a new user and success result
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


//  function to login an existing user to the applicatoin 
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

    //  API request delivery to check if user exists and log them in if they do, sand save cookies, or return error if they dont
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


//  save cookie funtion 
function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userID=" + userID + ";expires=" + date.toGMTString();
}

//  read cookie function to ensure the correct user is still logged in and allowing them to access only their contacts
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


//  logout function to gracefully log a user out
function doLogout() {
    userID = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

//  ensuring that the phone number that is entered follows the correct format
function formatPhoneNumber(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 10) {
        value = value.slice(0, 10);
    }

    if (value.length > 6) {
        value = `(${value.slice(0, 3)})-${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
        value = `(${value.slice(0, 3)})-${value.slice(3)}`;
    } else {
        value = `(${value}`;
    }

    input.value = value;
}

document.addEventListener('DOMContentLoaded', function () {
    let phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
});
