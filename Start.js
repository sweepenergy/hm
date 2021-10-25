console.log("Congratulations! You got node.js to run");
var os = require('os-utils');

os.cpuUsage(function(v){
    console.log( 'CPU Usage (%): ' + v+ '\n');
});
exports.platform = function(){ 
    return process.platform;
}