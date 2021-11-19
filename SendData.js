var data = { 
    "IP": "3",
    "totalmemory": "3",
    "freememory": "3",
    }
function GetMetrics(){
    
}
function Send(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://127.0.0.1:5000/");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data))
}

function Update(){
    <meta http-equiv="refresh" content="60" ></meta>
}