
    var os = require('os-utils');
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var storage = require ("storage-device-info");
    var auth_user_id = "a0c17ccb-542b-42b6-89ce-02510ef11f24";
    var auth_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcnlwdG9fZGF0YSI6IlUyRnNkR1ZrWDEveTY2QnhmVzFKNjNsdExYL3diMTlWb2IxL1FaR1lKbVBidjZyNFY3N3RiKzlCaGRUTWtKcmx0WDdLQ3RjRVk2SjM5T3JMWFVSV0dKWGp3STVLUVQ4OUo1dzVZaGhhNHFodkFrbmV0MDVjZHo2d2xjY21GRFVxdUYxa1NQODVjbDRubTErWjl5Tmh1QXlnTzNHc3A0aHk3QVphQjJzV3lYQW9ZZXNFMHVGM0w0ZklYalBkV3RzNHE5RTNKMVNlOUlrdEdyLzROL0tTNXhyU2cvSHJxWUlpWm1sZFE2N3g2SnZmZjFjcjNiYVdFSktQVUF1bTlOWDN6NkNoTFFLYUFyN3crVU1rc0NJTFVSNDlUanIvUElwMzFyRVJyWlhPSklWb0NQamVXMmg5bmpSZHhJM1FWVGtqSkFTWGxzL2ZzbzIvREhIN0FLL1k3M1Fpa1ZOeXBmNWVWWUE5dU4xL0VZcz0iLCJzZXNzaW9uX2lkIjoiMTA0M2MzZGQtNGNhNi00ZDkxLWJhODAtM2YzYmEzNDlkNmI1Iiwic2Vzc2lvbl90b2tlbiI6IjNhYjAxNGZhLWUwMGYtNDgxYy04YjI4LTdkMGU1NjEzNGQzZSIsInNlc3Npb25fc2NvcGUiOnsiZ2xvYmFsIjpbImdldCIsInBvc3QiLCJwdXQiXSwibG9jYWwiOltdfSwiaWF0IjoxNjM4MzIwMzc2fQ.T9I8nHQw5cSDHHUHvueivaeQPy54feBuhhhZueoQ4oMtQlLNS6xofTVW0pJv3iX0kpI1DOTJXSEDw1BlGXSN6tKCI7UeQ678UCSnb6hnTg5CwEQ6WHy8b6plMaY0KX_LBaMzr3dvWCJwqpPoxuYGebvnfxsTq7yvDO4e5cBOmWwmBWRfq5pipjD4Uevr_5-1Xcd1SUxe1qOrfg7BP4u6TnLovgUsvrUD6kcJNahrBCvzErxKruxMADe5WNTasIELPMsSqYCduXzgtL2Q9uDEwEUWWY7asRj9w9FfCSo8nNU93BVNSOT4v0vi3d5dWHjHE9P7zC4SDiBjeGcAe9Wv8g";
    var time;
    var cpus;
    var freestorage;
    var memory;
    var address;
    var directory_id;
    var create = 0;
    GetMetrics();
    function startup(){
        CreateMainDirectory();
    }
function GetMetrics(){
    CPU();
    Inodes();
    Memory();
    IPaddress();
    freestorage=Storage();
    Time();
    var status = {
        "IPaddress": address,
        "Time": time
    };
    var metricinfo= {
        "CPU" : cpus,
        "Memory": memory,
        "Inodes": "20",
        "Storage": freestorage,
        "Bandwidth": "30"

    };
    console.log(metricinfo);
    console.log(status);
    if(create ==0){
    SendMetrics(cpus,time,"CPU");
    //SendStatus(status);
};}

function Time(){
let currentDate = new Date();
time = currentDate.getHours() + ":" + currentDate.getMinutes();
}
function CPU(){
    cpus=os.cpuUsage(function(v){
       // console.log( 'CPU Usage (%): ' + v );
        return v;
       // console.log(cpus);
    });
}
function Memory(){
    memory = os.freememPercentage();
}
function Inodes(){
    const { exec } = require("child_process");

exec("df -ih", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
}
function Storage(){
    storage.getPartitionSpace("/opt", function(error, space){
        if(error){
            console.log(error);
    
        }else{
    
            //This shows the storage space in megabytes
            console.log("Total Storage Space: " + space.totalMegaBytes + "\n");
            console.log("Free Storage Space: " + space.freeMegaBytes + "\n");
            return space.freeMegaBytes;
        }
    });
}
function IPaddress(){
    address
    // Provides a few basic operating-system related utility functions (built-in)
    ,os = require('os')
    // Network interfaces
    ,ifaces = os.networkInterfaces();
// Iterate over interfaces ...
for (var dev in ifaces) {

    // ... and find the one that matches the criteria
    var iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
    });

    if(iface.length > 0) address = iface[0].address;
}
}
function SendMetrics(metricinfo){
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});
let URL = "https://api.sweepapi.com/directory/"+directory_id+"/stream"
xhr.open("POST", URL);

xhr.send(metricinfo);
    }

function SendStatus(status){
    var xmlhttp = new XMLHttpRequest();
    let URL = "https://api.sweepapi.com/Directory" +
    xmlhttp.open("POST", URL, true)
    xmlhttp.setRequestHeader("Content-Type", "application/json", 'Authorization', auth_token);
    xmlhttp.send(JSON.stringify(status))
}
function CreateStream(){
var data = "{\n    \"directory_id\": \"directory_id\",\n    \"name\": \"Tasty Fresh Ball\",\n    \"ts\": [\n        {\n            \"id\": \"voltage_b\",\n            \"name\": \"Voltage b\",\n            \"description\": \"Voltage b amps\",\n            \"unit\": \"volts\",\n            \"type\": \"number\"\n        },\n        {\n            \"id\": \"current_b\",\n            \"name\": \"Current b\",\n            \"description\": \"Current b amps\",\n            \"unit\": \"amps\",\n            \"type\": \"number\"\n        },\n        {\n            \"id\": \"log_maintenance\",\n            \"name\": \"Maintenance Log\",\n            \"description\": \"Maintenance Log over time\",\n            \"unit\": \"unitless\",\n            \"type\": \"text\"\n        }\n    ]\n}";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.sweepapi.com/directory/directory_id/stream");
xhr.setRequestHeader("Authorization", "Bearer "+auth_token); 

xhr.send(data);
}
function CreateSubDirectory(){
    var data = JSON.stringify({
        "name": address
      });
      let URL = "https://api.sweepapi.com/directory/"+ main_directory_id;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
          let ID = JSON.parse(this.responseText);
          directory_id = ID["id"];
        }
      });
      
      xhr.open("POST", URL);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer "+auth_token); 
      
      xhr.send(data);
}


function CreateMainDirectory(){
    var data = JSON.stringify({
        "name": "ServerMetrics"
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
          let ID = JSON.parse(this.responseText);
          main_directory_id = ID[1];
          console.log(main_directory_id);
          if(main_directory_id == "error_duplicate_name"){
            console.log(main_directory_id);
            //MainDirectoryGet();
        }

        }
      });
      let URL = "https://api.sweepapi.com/directory/home";
      xhr.open("POST", URL,true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer "+auth_token); 
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    }

function MainDirectoryGet(){
 var xhr = new XMLHttpRequest();
 xhr.withCredentials = true;
 xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    let DirectoryInfo = JSON.parse(this.reponseText);
    let main = DirectioryInfo["Directory"];
    main_directory_id = main["id"];
  }
});

xhr.open("GET", "https://api.sweepapi.com/directory/home");
xhr.setRequestHeader("Authorization", "Bearer "+auth_token);

xhr.send();
    }
