function startGame(){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/startGame", false);
    xhr.send();

    console.log(xhr.status);
    console.log(xhr.statusText);

}

function sendAnswer (option){
 var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/submitAnswer?optionId="+option, false);
    xhr.send();

    console.log(xhr.status);
    console.log(xhr.statusText);

}