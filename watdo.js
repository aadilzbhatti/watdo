if (Meteor.isClient) {
  Template.body.helpers({
    events: [
      {text: "Event 1"},
      {text: "Event 2"},
      {text: "Event 3"}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
