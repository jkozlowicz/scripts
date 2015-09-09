// Downloaded from: https://github.com/twitter/typeahead.js
// Requires typeahead nad bloodhound to be included

// Assumes that /ajax?username returns list of all usernames (prefetch is mandatory when using remote option!!)
// And assumes that /ajax?username=%QUERY returns list of usernames matching the QUERY
// Results returned from backend should have following format: [{"value": "fred"}, {"value": "customer1"}, {"value": "123123"}, {"value": "jakub"}, {"value": "testu"}, {"value": "janusz"}]

function() {
    var usernames = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.value);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: '/ajax?username',
        remote: {
            url: '/ajax?username=%QUERY',
            filter: function( items ) {
                var results = [],
                    tmpItems = [];

                for( var i = 0; i < items.length; i++ ) {

                    var item = items[i];
                    if ( !_.contains(tmpItems, item.value) ) {


                        tmpItems.push(item.value);
                        results.push(item);
                    }

                }

                return results;
            },
            wildcard: '%QUERY'
        }
    });

    usernames.initialize();

    $('.username-wrapper .typeahead').typeahead(
        {
            minLength: 1,
            highlight: true
        },
        {
            displayKey: 'value',
            source: usernames.ttAdapter()
        }
    );
}();

// A necessary modification so that results are displayed correctly is
// on line 1719 in typeahead.bundle.js
        function async(suggestions) {
            suggestions = suggestions || [];
            if (!canceled && rendered < that.limit) {
                that.cancel = $.noop;

                suggestions = (suggestions || []).slice(0, that.limit);
                rendered = suggestions.length;
                that._append(query, suggestions);

                that.async && that.trigger("asyncReceived", query);
            }
        }

// In order for this to work with Bootstrap 3, following CSS has to be included:

/**********************************************************
 *     typeahead.js v0.11.1 - twitter bootstrap v3.3.5    *
 **********************************************************/

/*root typeahead class*/
.twitter-typeahead {
    display: inherit !important;
    width: 100%;
}

.twitter-typeahead .tt-input[disabled] {
  background-color : #eeeeee !important;
}

/*Added to input that's initialized into a typeahead*/
.twitter-typeahead .tt-input {

}

/*Added to hint input.*/
.twitter-typeahead .hint {

}

/*Added to menu element*/
.twitter-typeahead .tt-menu {
  width: 100%;
  max-height: 500px;
  overflow-y: scroll;
  border: 1px solid #cccccc;

  -moz-box-shadow: 12px 14px 30px -7px #616161;
  -webkit-box-shadow: 12px 14px 30px -7px #616161;
  box-shadow: 12px 14px 30px -7px #616161;
}

/*Added to dataset elements*/
.twitter-typeahead .tt-dataset {

}

/*dded to suggestion elements*/
.twitter-typeahead .tt-suggestion {
  padding: 3px 20px;
  white-space: nowrap;
}

/*Added to menu element when it contains no content*/
.twitter-typeahead .tt-empty {
  background-color: white;
}

/*Added to menu element when it is opened*/
.twitter-typeahead .tt-open {
  background-color: white;
}

/*Added to suggestion element when menu cursor moves to said suggestion*/
.twitter-typeahead .tt-suggestion:hover,
.twitter-typeahead .tt-suggestion:focus,
.twitter-typeahead .tt-cursor {
  cursor: hand !important;
  background-color: #337ab7;
  color: white;
}

/*Added to the element that wraps highlighted text*/
.twitter-typeahead .tt-highlight {

}
