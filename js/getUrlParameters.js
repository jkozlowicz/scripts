function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        var key = tmparr[0],
            val = tmparr[1];
        if(val !== ''){
            params[key] = decodeURIComponent(val);
        }
    }
    return params;
}

function getUrlParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}


// Usage:
// http://localhost:8000/requests?requestType=farerequest&requestedBy=jakub&version=3.70
// => Object {requestType: "farerequest", requestedBy: "jakub", version: "3.70"}
