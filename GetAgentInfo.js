function AgentStatus(){
    
}

function GetMetrics() {
    window.location.href='./MetricInformation.html'
    xhttp= new XMLHttpRequest();
    let text = "<table border= '1><tr><th>Name</th><th>Grade</th></tr>";
    xhttp.open("GET","http://127.0.0.1:5000/all",true)
    xhttp.send()
    xhttp.onload = function(){
        let data = JSON.parse(xhttp.reponse);
        let keys = Object.keys(data);
        for(let i =0;i<keys.length;i++){
            text += "<tr><td>" +keys[i] +"</td><td>" + data[keys[i]] + "</td></tr>";
        }
        text += "</table>"
        document.getElementById("Metrics").innerHTML = text;
    
    }
}

function ShowGrades(){
    window.location.href='./MetricInformation.html'
    const xhttp = new XMLHttpRequest();
    const method = "GET";  // Could be GET, POST, PUT, DELETE, etc.
    let text = "<table border='1'><tr><th>Name</th><th>Grade</th></tr>";
    const url= "http://127.0.0.1:5000/all";
    const async = true;   // asynchronous (true) or synchronous (false) – don’t use synchronous
    xhttp.open(method, url, async);
    xhttp.send();
    xhttp.onload = () => {
        let data = JSON.parse(xhttp.response);
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++){
            text += "<tr><td>" + keys[i] + "</td><td>" + data[keys[i]] + "</td></tr>";
        }    
        text += "</table>"
        document.getElementById("Metrics").innerHTML = text;
    }
 }