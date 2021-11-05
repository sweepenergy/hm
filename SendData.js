var data = { 
    "IP": "3",
    "totalmemory": "3",
    "freememory": "3",
    }
function Send(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "SWEEPAPI");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data))
}