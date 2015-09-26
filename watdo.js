Events = new Mongo.Collection("events");

if (Meteor.isClient) {
	Template.body.helpers({
    	events: function() {
			$.getFeed({
				url: "events.xml",
				success: function(feed) {
					feed.find('item').each(function() {
						var el = $(this);
						console.log(el.find("title").text());
					});
				}
			});
   		}
  	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
    	// code to run on server at startup
	});
}

function eventful_search() {
    $.getScript("http://api.eventful.com/js/api", function() {
        var oArgs = {
            app_key: "JLX58nsZ3JnnXS2f",
            where: "Dekalb, IL",
            page_size: 100,
            "date": "Future",
            after_start_date: "Future",
        };
        EVDB.API.call("json/events/search", oArgs, function(oData) {
            console.log(oData);
        });
    });
}
