console.log("Congratulations! You got node.js to run" + '\n');
var os = require('os-utils');

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


exports.platform = function(){ 
    return process.platform;
}
var ip = req.connection.remoteAddress;
console.log(ip);