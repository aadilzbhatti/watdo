Events = new Mongo.Collection("events");

if (Meteor.isClient) {
	Template.body.helpers({
		events: function() {
            eventful_search();
            add_static_events();
    		return Events.find({});
    	}
  	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
        //var twitter = get_twitter();
	});
}

function descToSummary(fullDescription) {
    dArray = fullDescription.split(" ");
    summary = "";
    if(dArray.length >= 15) {
        for(j = 0; j <  15; j++) {
            summary += " " + dArray[j];
        }
    } else return fullDescription;
    summary += "...";
    return summary;
}

function eventful_search() {
    var items = {};
    $.getJSON("secret.json", function(data) {
        $.each(data, function(key, val) {
            items[key] = val;
        });
    });
    $.getScript("http://api.eventful.com/js/api", function() {
        var oArgs = {
            app_key: items["evenful_api_key"],
            where: "Dekalb, IL",
            page_size: 100,
            "date": "Next week",
            after_start_date: "Future",
            sort_order: "date",
            image_sizes: "block250",
        };
        console.log(oArgs.app_key);
        EVDB.API.call("json/events/search", oArgs, function(oData) {
            console.log(oData);
            for (i = 0; i < oData.events.event.length; i++)
            {
                var summary = descToSummary(oData.events.event[i].description);
                if (oData.events.event[i].image != null) {
        		    Events.insert({
        			    title: oData.events.event[i].title,
        			    date: oData.events.event[i].start_time,
        			    link: oData.events.event[i].url,
        			    description: summary,
                        picture: oData.events.event[i].image.block250.url,
        		    });
                } else {
        		    Events.insert({
        			    title: oData.events.event[i].title,
        			    date: oData.events.event[i].start_time,
        			    link: oData.events.event[i].url,
        			    description: summary,
        		    });
                }
            }
        });
    });
}

function add_static_events() {
    feeds = [
        'events.xml',
        'cob.xml', 
        'honors-capstone.xml', 
        'honors-icc.xml'
    ];
    feeds.forEach(function(entry) {
        $.get(entry, function (data) {
            $(data).find("item").each(function () {
                var el = $(this);
                var summary = descToSummary(el.find("description").text());
                if (Events.find({title: el.find("title").text()}).count() > 0) {
                    Events.insert({
                        title: el.find("title").text(),
                        date: el.find("pubDate").text(),
                        link: el.find("link").text(),
                        description: summary
                    });
                }
            });
        });
    });
}