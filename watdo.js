Events = new Mongo.Collection("events");

if (Meteor.isClient) {
  Template.body.helpers({
    events: function() {
        eventful_search();
        $.get("events.xml", function (data) {
            $(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
                var result = {
                    title: el.find("title").text(),
                    date: el.find("pubdate").text(),
                    link: el.find("link").text(),
                    description: el.find("description").text()
                };
            });
        });
      	return Events.find({});
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

            "date": "Next week",
        
            after_start_date: "Future",

            sort_order: "date",
        };
        EVDB.API.call("json/events/search", oArgs, function(oData) {
            console.log(oData);
            for (i = 0; i < oData.events.event.length; i++)
            {
              fullDescription = oData.events.event[i].description;
              dArray = fullDescription.split(" ");
              summary = "";
              if(dArray.length >= 15) {
                for(j = 0; j <  15; j++) {
                  summary += " " + dArray[j];
                }
              }
              summary += "...";
        		Events.insert({
        			title: oData.events.event[i].title,
        			date: oData.events.event[i].start_time,
        			link: oData.events.event[i].url,
        			description: summary
        		});
            }
        });
    });
}