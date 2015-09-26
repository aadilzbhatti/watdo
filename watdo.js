Events = new Mongo.Collection("events");

if (Meteor.isClient) {
  Template.body.helpers({
    events: function() {
    	$.get("events.xml", function (data) {
    		$(data).find("item").each(function () { 
       			var el = $(this);
        		Events.insert({
        			title: el.find("title").text(),
        			date: el.find("pubdate").text(),
        			link: el.find("link").text(),
        			description: el.find("description").text()
        		});
        		console.log("------------------------");
        		console.log("title      : " + el.find("title").text());
        		console.log("date     : " + el.find("pubdate").text());
        		console.log("description: " + el.find("description").text());
    		});
		});
        eventful_search();
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
    $.getScript("http://api.eventful.com/js/api", function()
    {
        var oArgs = {
            app_key: "JLX58nsZ3JnnXS2f",

            where: "Dekalb, IL",

            page_size: 100,

            "date": "Next week",
        
            after_start_date: "Future",

            sort_order: "date",

        };
        EVDB.API.call("json/events/search", oArgs, function(oData)
        {
            console.log(oData);
            for (i = 0; i < oData.events.event.length; i++)
            {
        		Events.insert({
        			title: oData.events.event[i].title,
        			date: oData.events.event[i].start_time,
        			link: oData.events.event[i].url,
        			description: oData.events.event[i].description
        		});
            }
        });
    });
}
