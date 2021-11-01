console.log("Congratulations! You got node.js to run" + '\n');
var os = require('os-utils');

var storage = require ("storage-device-info");


//This gets the CPU Usage at a certain point
os.cpuUsage(function(v){
    console.log('CPU Usage (%): ' + v+ '\n');
});

//This gets the CPU Free at a certain point 
os.cpuFree(function(v){
    console.log('CPU Free (%): ' + v+ '\n');
});

//This gets the average load or bandwith
console.log('Average Load: ' + os.loadavg(0.01) + '\n');

//This gets the Total Memmory of the system
console.log('Total Memmory: ' + os.totalmem() + '\n')

//This gets the Free Memmory of the system
console.log('Free Memmory: ' + os.freemem() + '\n')

//This is the total free memmory percentage taken from CPU Usage and CPU Free
console.log('Total Free Memmory (%): ' + os.freememPercentage() + '\n');


//This gets the total storage and the free storage on the given machine
storage.getPartitionSpace("/opt", function(error, space){

    if(error){

        console.log(error);

    }else{

        //This shows the storage space in megabytes
        console.log("Total Storage Space: " + space.totalMegaBytes + "\n")
        console.log("Free Storage Space: " + space.freeMegaBytes + "\n");
    }
});
    

var
    // Local ip address that we're trying to calculate
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

// Print the result
console.log('IP Address: ' + address + '\n');
