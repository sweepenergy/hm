function GetDirectory(){
    let text = "<table border='1'><tr><th>Agent Number</th><th>Location</th><th>Status</th></tr>";
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    
    xhr.open("GET", "https://api.sweepapi.com/directory/home");
    
    xhr.send();
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
          let data = JSON.parse(this.responseText);
        let keys = Object.keys(data);
        for (let i = 0; i < 3; i++){
            text += "<th>" + data[keys[i]]+"</th>";
        
        }   
        text += "</table>"
        document.getElementById("Metrics").innerHTML = text;
        }
      });

}

function AgentStatus(){
    let text = "<table border='1'><tr><th>Agent Number</th><th>Location</th><th>Status</th></tr>";
    const xhttp = new XMLHttpRequest();
    const method = "GET";
    const url= "https://api.sweepapi.com/directory/home";
    const async = true;
    xhttp.open(method, url, async);
    xhttp.send();
    xhttp.onload = () => {
        let data = JSON.parse(xhttp.response);
        let keys = Object.keys(data);
        for (let i = 0; i < 3; i++){
            text += "<th>" + data[keys[i]]+"</th>";
        
        }   
        text += "</table>"
        document.getElementById("Metrics").innerHTML = text;
    }
    
}


function GetMetrics(){
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
