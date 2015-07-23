var addDataToForm = function(data, form){
    for(var key in data){
      $('<input />').attr('type', 'hidden')
          .attr('name', key)
          .attr('value', data[key])
          .appendTo(form);
    }
    return form;
};


// USAGE:
// $('#myForm').submit(function(e){
//     var ninjaField = $('#ninjaField').is(':checked');
//     var ninjaFields = {
//         'ninjaField': ninjaField
//     };
//     addDataToForm(ninjaFields, e.target);
// });
