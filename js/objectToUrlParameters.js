var extractParams = function(data){

    for (var key in data) {
        if(data.hasOwnProperty(key) && (data[key] === "" || data[key] === 'undefined' || data[key] === null)){
            delete data[key];
        }
    }

    return $.param(data);
};


// USAGE:
// var data = {
//      requestType: "farerequest", requestedBy: "jakub", version: "3.70",
//      dateFrom: "", dateTo: ""
// }
// extractParams(data);
// => requestType=farerequest&requestedBy=jakub&version=3.70
