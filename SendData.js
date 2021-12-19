
    var os = require('os-utils');
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var storage = require ("storage-device-info");
    var auth_user_id = "a0c17ccb-542b-42b6-89ce-02510ef11f24";
    var auth_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcnlwdG9fZGF0YSI6IlUyRnNkR1ZrWDEveTY2QnhmVzFKNjNsdExYL3diMTlWb2IxL1FaR1lKbVBidjZyNFY3N3RiKzlCaGRUTWtKcmx0WDdLQ3RjRVk2SjM5T3JMWFVSV0dKWGp3STVLUVQ4OUo1dzVZaGhhNHFodkFrbmV0MDVjZHo2d2xjY21GRFVxdUYxa1NQODVjbDRubTErWjl5Tmh1QXlnTzNHc3A0aHk3QVphQjJzV3lYQW9ZZXNFMHVGM0w0ZklYalBkV3RzNHE5RTNKMVNlOUlrdEdyLzROL0tTNXhyU2cvSHJxWUlpWm1sZFE2N3g2SnZmZjFjcjNiYVdFSktQVUF1bTlOWDN6NkNoTFFLYUFyN3crVU1rc0NJTFVSNDlUanIvUElwMzFyRVJyWlhPSklWb0NQamVXMmg5bmpSZHhJM1FWVGtqSkFTWGxzL2ZzbzIvREhIN0FLL1k3M1Fpa1ZOeXBmNWVWWUE5dU4xL0VZcz0iLCJzZXNzaW9uX2lkIjoiMTA0M2MzZGQtNGNhNi00ZDkxLWJhODAtM2YzYmEzNDlkNmI1Iiwic2Vzc2lvbl90b2tlbiI6IjNhYjAxNGZhLWUwMGYtNDgxYy04YjI4LTdkMGU1NjEzNGQzZSIsInNlc3Npb25fc2NvcGUiOnsiZ2xvYmFsIjpbImdldCIsInBvc3QiLCJwdXQiXSwibG9jYWwiOltdfSwiaWF0IjoxNjM4MzIwMzc2fQ.T9I8nHQw5cSDHHUHvueivaeQPy54feBuhhhZueoQ4oMtQlLNS6xofTVW0pJv3iX0kpI1DOTJXSEDw1BlGXSN6tKCI7UeQ678UCSnb6hnTg5CwEQ6WHy8b6plMaY0KX_LBaMzr3dvWCJwqpPoxuYGebvnfxsTq7yvDO4e5cBOmWwmBWRfq5pipjD4Uevr_5-1Xcd1SUxe1qOrfg7BP4u6TnLovgUsvrUD6kcJNahrBCvzErxKruxMADe5WNTasIELPMsSqYCduXzgtL2Q9uDEwEUWWY7asRj9w9FfCSo8nNU93BVNSOT4v0vi3d5dWHjHE9P7zC4SDiBjeGcAe9Wv8g";
    var timestamp;
    var cpus;
    var freestorage;
    var memory;
    var address;
    var subdirectory_id;
    var main_directory_id;
    var streamid;
    startup();

   async function startup(){
    IPaddress();
     CreateMainDirectory()
    }
    setTimeout(function(){setInterval(GetMetrics,5000)},3000);
    //setTimeout(GetMetrics,3000);
function GetMetrics(){
    console.log(streamid)
    CPU();
    Inodes();
    Memory();
    freestorage=Storage();
   // Time();
    var status = {
        "IPaddress": address,
        "Time": timestamp
    };
    var metricinfo= {
        "CPU" : cpus,
        "Memory": memory,
        "Inodes": "20",
        "Storage": freestorage,
        "Bandwidth": "30"

    };
    setTimeout(function () {
   SendMetrics("CPU", cpus)
    SendMetrics("memory",memory)
   SendMetrics("inodes","20")
    SendMetrics("Storage",freestorage)}, 2500)

}
function Time(){
    timestamp = new Date().toISOString()
    var date = new Date(timestamp);
    console.log(date);
}
function CPU(){
    var os = require('os-utils');
    os.cpuUsage(function(v){
       console.log( 'CPU Usage (%): ' + v );
       //console.log(cpus);
       cpus = v;
    });
}
function Memory(){
    var os = require('os-utils');
    memory = os.freememPercentage();
    console.log(memory + "memory");
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

            freestorage =space.freeMegaBytes;
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
function SendMetrics(paramtext, sample){
    var data = JSON.stringify({
        "timestamp": timestamp,
        "sample": sample
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      let URL = "https://api.sweepapi.com/stream/"+streamid+"/ts/"+paramtext+"/dataset/one"
      xhr.open("POST", URL);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer "+auth_token);
      
      xhr.send(data);
    }

function CreateStream(){

    var data = {
        "directory_id": address,
        "name": address,
        "ts":[
            {
                "id": "CPU",
                "name": "CPU",
                "description": "CPU usage",
                "unit": "percentage",
                "type": "number"
            },
            {
                "id": "memory",
                "name": "memory",
                "description": "free memory",
                "unit": "MB",
                "type": "number"
            },
            {
                "id": "inodes",
                "name": "inodes",
                "description": "free memory",
                "unit": "MB",
                "type": "number"
            },
            {
                "id": "Storage",
                "name": "Storage",
                "description": "free memory",
                "unit": "MB",
                "type": "number"
            }
        ]
        
    }
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        console.log(this.responseText +" stream");
        let streamID = JSON.parse(this.responseText);
          streamid = streamID["status"];
          if(streamid == undefined){
            streamid = streamID["id"];
            //console.log(streamid);
        }
        else{
            if(streamid == "error_duplicate_name"){
                console.log("duplicate");
               GetStreamID();
          }}
      }
    });
    let URL = "https://api.sweepapi.com/directory/"+subdirectory_id+"/stream";
    
    xhr.open("POST", URL);
    xhr.setRequestHeader("Authorization", "Bearer "+auth_token);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify( data));
    
    }
function GetStreamID(){
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
    //console.log(this.responseText +" stream1");
    let streaminfo = JSON.parse(this.responseText)
    //console.log(streaminfo);
    let streamID = streaminfo["stream"]
   //console.log(streaminfo["stream"]);
    for(let i = 0; i < streamID.length; i++) {
        let check = streamID[i]
        if(check.name == address){
            streamid = check.id
            console.log(streamid); 
        }
    }
      }
    });
    let URL = "https://api.sweepapi.com/directory/" + subdirectory_id;
    
    xhr.open("GET", URL);
    xhr.setRequestHeader("Authorization", "Bearer "+auth_token);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send();

}
function CreateSubDirectory(){
    var data = JSON.stringify({
        "name": address
      });
      let URL = "https://api.sweepapi.com/directory/"+ main_directory_id;;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", async function() {
        if(this.readyState === 4) {
          //console.log(this.responseText);
          let subID = JSON.parse(this.responseText);
          subdirectory_id = subID["status"];
          if(subdirectory_id == undefined){
            subdirectory_id = subID["id"];
           // console.log(subdirectory_id);
            CreateStream();
  
        }
        else{
            if(subdirectory_id == "error_duplicate_name"){
               await GetSubDirectoryID();
          }}
        }
      });

      xhr.open("POST", URL);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer "+auth_token); 
      
      xhr.send(data);
}
function GetSubDirectoryID(){
    var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    let subID = JSON.parse(this.responseText)
    let sub = subID['directory']
    for(let i = 0; i < sub.length; i++) {
        let check = sub[i]
        if(check.name == address){
            subdirectory_id = check.id
           // console.log(subdirectory_id); 
            CreateStream();
            return subdirectory_id;
        }
    }
  }
});
let URL = "https://api.sweepapi.com/directory/" + main_directory_id;
xhr.open("GET", URL);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer "+auth_token);

xhr.send();
}
 function CreateMainDirectory(){
    var data = JSON.stringify({
        "name": "ServerMetrics"
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", async function() {
        if(this.readyState === 4) {
          //console.log(this.responseText);
          let ID = JSON.parse(this.responseText);
          main_directory_id = ID["status"];
          if(main_directory_id == undefined){
              main_directory_id = ID["id"];
              //console.log(main_directory_id);
              CreateSubDirectory();
              //return main_directory_id;

          }
          else{
          if(main_directory_id == "error_duplicate_name"){
             await MainDirectoryGet();
        }}
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
    let ID = JSON.parse(this.responseText)
    let main = ID['directory']
    for(var i = 0; i < main.length; i++) {
        let check = main[i]
        if(check.name == "ServerMetrics"){
            main_directory_id = check.id
           // console.log(main_directory_id);
            CreateSubDirectory();
            return main_directory_id;
        }
    }
  }
    });

    xhr.open("GET", "https://api.sweepapi.com/directory/home");
    xhr.setRequestHeader("Authorization", "Bearer "+auth_token); 
    xhr.send();
    }
