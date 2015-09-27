Events = new Mongo.Collection("events");

if (Meteor.isClient) {
	Template.body.helpers({
		events: function() {
            $.get("events.xml", function (data) {
                $(data).find("item").each(function () { // or "item" or whatever suits your feed
                    var el = $(this);
                    Events.insert({
                        title: el.find("title").text(),
                        date: el.find("pubdate").text(),
                        link: el.find("link").text(),
                        description: el.find("description").text()
                    });
                });
            });
    		return Events.find({});
    	}
  	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
 //    	var Twit = Meteor.npmRequire('twit');
 //        var items = {};
 // //        $.getJSON("secret.json", function(data) {
 // //            $.each(data, function(key, val) {
 // //                items[key] = val;
 // //            });
 // //        });
 // //        var T = new Twit({
 // //            consumer_key: items["consumer_key"],
 // //            consumer_secret: items["consumer_secret"],
 // //            access_token: items["access_token"],
 // //            access_token_secret: items["access_token_secret"]
 // //        });
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