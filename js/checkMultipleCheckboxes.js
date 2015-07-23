var bindMultipleSelection = function(){
    var checkBoxes = $('.checkboxesClass');
    var lastChecked = null;
    checkBoxes.click(function(e){
        if(!lastChecked) {
            lastChecked = this;
            return;
        }

        if(e.shiftKey) {
            var start = checkBoxes.index(this);
            var end = checkBoxes.index(lastChecked);

            checkBoxes.slice(Math.min(start,end), Math.max(start,end)+ 1).prop('checked', lastChecked.checked);
            checkBoxes.trigger('change');

        }
        lastChecked = this;
    });
};

// USAGE:
// bindMultipleSelection();
// Now user will be able to select range of checkboxes using SHIFT key
