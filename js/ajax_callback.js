let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAJAXcall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(methodType + " state changed called. Ready state: " + xhr.readyState + " Status: " + xhr.status);
        if(xhr.readyState == 4) {
            if(xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            }
            else if(xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server error!");
            }
        }
    }
    xhr.open(methodType, url, async);
    if(data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else 
        xhr.send();
    console.log(methodType + " request sent to server");
}
const getUrl = "http://localhost:8000/employees/1";
function getUserDetails(data) {
    console.log("Get user data :" + data)
}
makeAJAXcall("GET", getUrl, getUserDetails);

const deleteUrl = "http://localhost:8000/employees/4";
function UserDeleted(data) {
    console.log("User deleted " + data)
}
makeAJAXcall("DELETE", deleteUrl, UserDeleted, false);

const postUrl = "http://localhost:8000/employees/";
const empData = {"name": "Jame", "salary": "60000"};
function userAdded(data) {
    console.log("User added" + data)
}
makeAJAXcall("POST", postUrl, userAdded, true, empData);
