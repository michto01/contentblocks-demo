//
// Url to your REST CMS web service 'find' interface. This is the method that checks if a content block already exists.
// The service should accept GET/POST/PUT/UPDATE/DELETE with a JSON object. [id] will be replaced by the CMS content block id.
// Example: http://your.service.com/api/findById?id=[id]
//
var restUrl = 'http://red-ant.herokuapp.com/v1/nest/find?q={"@subject": "[id]"}';
var apiKey = 'contentblocksdemo'; // Unique key for the demo REST web service, red-ant.herokuapp.com. If you use the demo service, change this key to be unique. If using your own service, you can leave this blank.

$(document).ready(function () {
    $('body').midgardCreate({
        metadata: {
            midgardTags: {}
        },
        collectionWidgets: {
            'default': 'midgardCollectionAdd',
            'skos:related': null
        },
		state: 'edit'
    });

    // Set a simpler editor for title fields
    $('body').midgardCreate('configureEditor', 'title', 'halloWidget', {
        plugins: {
            halloformat: {},
            halloblacklist: {
                tags: ['br']
            }
        }
    });

    $('body').midgardCreate('setEditorForProperty', 'dcterms:title', 'title');

    // Disable editing of author fields
    $('body').midgardCreate('setEditorForProperty', 'dcterms:author', null);
});

// Backbone.sync
Backbone.sync = function (method, model, options) {
	// Read-only mode for demo.
	options.success(model);
};

CommonManager = {
    encodeId: function (id) {
        id = id.replace(/\./g, '_p').replace(/\//g, '_s');

        return id;
    },

    decodeId: function (id) {
        id = id.replace(/_p/g, '.').replace(/_s/g, '/');

        return id;
    },

    addApiKey: function (model, apikey) {
        if (apiKey.length > 0) {
            model['apiKey'] = apiKey;

            // Copy original stringify method.
            model.toJSONOld = model.toJSON;

            // Override method to include apiKey.
            model.toJSON = function () {
                var j = model.toJSONOld();
                j.apiKey = model.apiKey;

                return j;
            }
        }
    }
};