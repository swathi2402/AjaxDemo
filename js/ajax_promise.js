let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromisecall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(methodType + " state changed called. Ready state: " + xhr.readyState + " Status: " + xhr.status);
            
                if(xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }
                else if(xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 client error or 500 server error!");
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
    });
}
const getUrl = "http://localhost:3000/employees/1";
makePromisecall("GET", getUrl, true)
            .then(responseText => {
                console.log("Get user data: ", responseText)
            })
            .catch(error => {
                console.log("GET ERROR Status: " + JSON.stringify(error));
            })

const deleteUrl = "http://localhost:3000/employees/4";
makePromisecall("DELETE", deleteUrl, false)
                .then(responseText => {
                    console.log("User deleted: ", responseText)
                })
                .catch(error => {
                    console.log("DELETE ERROR Status: " + JSON.stringify(error));
                });

const postUrl = "http://localhost:3000/employees/";
const empData = {"name": "Jame", "salary": "60000"};
makePromisecall("POST", postUrl, true, empData)
                .then(responseText => {
                    console.log("User added: ", responseText)
                })
                .catch(error => {
                    console.log("DELETE ERROR Status: " + JSON.stringify(error));
                });
