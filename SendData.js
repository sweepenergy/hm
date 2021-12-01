
    var os = require('os-utils');
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var storage = require ("storage-device-info");
    var auth_user_id = "a0c17ccb-542b-42b6-89ce-02510ef11f24";
    var auth_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcnlwdG9fZGF0YSI6IlUyRnNkR1ZrWDE5UHhTMzFWSG5DcFdOUlFPcVJRTmNSL1R1YjI3dDRtbnBzU3oxNWZqMGhBOTI4S01GZjRCb2pnalNLellxVEYzU3NXOEJXcE9wNy9Gb1NMS3U3KzJnVGhXdWY3enhpaC9STDdBYngrNnhJSVdxZHZoaU9rcHpDcFp3bTFCZ09TejZIV3FYTDZNV0hsaXdCbjR0MFc5b3dOWjV0MVNSSHcvNFJobFVkYi85TEtKdm1mOWRlU01lS1BNZC80ZGg2SWZtR21jME5oUFh2QjZBZFI0Qnc2NDR2R3BOb1ArTlZyWE56YzJRQkxTWVIxU2VaUTMrTTdReGxrS3pwTWhieEtwL09pNXFFZFNXWnVCalU3dmdxWmRJWTFXZkVialJYYkk3RHFvL3ZKdDhML1NPZzQxV2VpRlAxWG41VGVrVDVZMHVNUG1MN01JLzFzVE1TS0E2UjFSazFTU2ovVDNhMUFHd2tPK1NaU1orbllOeU1kSytDdmFRSC8yNCtYVGVWajhFSXZqUkVJSVk2dGc9PSIsInNlc3Npb25faWQiOiJhMGMxN2NjYi01NDJiLTQyYjYtODljZS0wMjUxMGVmMTFmMjQiLCJzZXNzaW9uX3Rva2VuIjoiNmY5MjA5NjgtZWQxOS00NzMzLWI4ZGUtNmM3NzRhZTQ1NWVhIiwic2Vzc2lvbl9zY29wZSI6eyJnbG9iYWwiOlsiZ2V0Il0sImxvY2FsIjpbInBvc3Quc3RyZWFtIiwicHV0LnN0cmVhbSIsInBvc3QuZGlyZWN0b3J5IiwicHV0LmRpcmVjdG9yeSJdfSwiaWF0IjoxNjM4MDcxMzc3LCJleHAiOjE2MzgxMTQ1Nzd9.vAw4jtHCJEE8U7DvkzH6nSye-mik9AuWVawOp8S9ufWPTlm6F9lluWY4OXOeCu6uFGHG2GmLuRPZUF2ExvGlI4qSHBhTImKKJ7TCl1YbBZPrEY8iGLDefrgrBqE0_-cjVA7o3rlbamMY7gUMyub77fig7Hz3zFfvH_aaGr10W6YSHyVTRP-zo3o0vnOCj9jjYZiK133lZVolZ0IpefRNacE_s25OWWeXXaoXM-jU1MQzpAITHBrqDa8diS5dRaTEQ7gLEwRGXE4V8cDEz2nv442189DHPjaD8fWUPmdNZdkphiL-GEAdqYmfdGhHQIZ7_lD-OK-TBhVJCoRJyv94PA";
    var time;
    var cpus;
    var freestorage;
    var memory;
    var address;
    var directory_id;
    var create = 0;
    GetMetrics();
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
        "Storage": freestorage

    };
    console.log(metricinfo);
    console.log(status);
    //ConnectToAPI();
    if(create ==0){
    CreateDirectory();}
    //SendMetrics(metricinfo);
    //SendStatus(status);
};

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
    if(create == 0){
    var xmlhttp = new XMLHttpRequest();
    var URL  = "https://api.sweepapi.com/directory/"+directory_id+"/stream";
    xmlhttp.open("POST", URL, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(metricinfo))}
    else{

    }
}
function SendStatus(status){
    var xmlhttp = new XMLHttpRequest();
    let URL = "https://api.sweepapi.com/Directory" +
    xmlhttp.open("POST", URL, true)
    xmlhttp.setRequestHeader("Content-Type", "application/json", 'Authorization', auth_token);
    xmlhttp.send(JSON.stringify(status))
}

function CreateDirectory(){
    var data = JSON.stringify({
        "name": "MetricData"
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
          let ID = JSON.parse(this.responseText);
          directory_id = ID["id"];
        }
      });
      let URL = "https://api.sweepapi.com/directory/home";
      xhr.open("POST", URL,true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer "+auth_token); 
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    }

