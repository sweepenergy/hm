function Send(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify())
}