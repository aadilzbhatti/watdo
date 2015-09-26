function get_events() {
	events = [];
	$.get("events.xml", function (data) {
    	$(data).find("item").each(function () { // or "item" or whatever suits your feed
        	var el = $(this);
        	var result = {
        		title: el.find("title").text(),
        		date: el.find("pubdate").text(),
        		link: el.find("link").text(),
        		description: el.find("description").text()
        	};
        	console.log("------------------------");
        	console.log("title      : " + el.find("title").text());
        	console.log("date     : " + el.find("pubdate").text());
        	console.log("description: " + el.find("description").text());
       		events.push(result);
    	});
	});
	return events
}