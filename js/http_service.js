function makePromisecall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {          
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

        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
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

const getElement = document.querySelector('#get_services');
const getUrl = "http://localhost:3000/employees/1";
makePromisecall("GET", getUrl, true)
            .then(responseText => {
                getElement.textContent = "Get user data: " + responseText;
            })
            .catch(error => {
                getElement.textContent = "GET ERROR Status: " + JSON.stringify(error);
            })

const deleteElement = document.querySelector('#delete_services');            
const deleteUrl = "http://localhost:3000/employees/4";
makePromisecall("DELETE", deleteUrl, false)
                .then(responseText => {
                    deleteElement.textContent = "User deleted: " + responseText;
                })
                .catch(error => {
                    deleteElement.textContent = "DELETE ERROR Status: " + JSON.stringify(error);
                });

const postElement = document.querySelector('#post_services');
const postUrl = "http://localhost:3000/employees/";
const empData = {"name": "Jame", "salary": "60000"};
makePromisecall("POST", postUrl, true, empData)
                .then(responseText => {
                    postElement.textContent = "User added: " + responseText;
                })
                .catch(error => {
                    postElement.textContent = "POST ERROR Status: " + JSON.stringify(error);
                });
