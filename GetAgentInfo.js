function GetMetrics() {
    xhttp= new XMLHttpRequest();
    xhttp.open("GET","FOLDERLOCATION",true)
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           
}
};
}