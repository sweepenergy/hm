console.log("Congratulations! You got node.js to run");
var os = require('os-utils');

os.cpuUsage(function(v){
    console.log( 'CPU Usage (%): ' + v+ '\n');
});

os.cpuFree(function(v){
    console.log( 'CPU Free (%): ' + v+ '\n');
});

console.log(os.freememPercentage());

exports.platform = function(){ 
    return process.platform;
}