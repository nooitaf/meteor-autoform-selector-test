Books = new Mongo.Collection('books');
Books.attachSchema(
  new SimpleSchema({
    title: {
      type: String
    },
    tags: {
      type: [String],
      optional: true
    }
  })
)

Tags = new Mongo.Collection('tags');
Tags.attachSchema(
  new SimpleSchema({
    name: {
      type: String
    }
  })
)

if (Meteor.isClient) {

  UI.registerHelper("tagList", function(){
      return Tags.find({},{sort:{name:1}}).map(function(itm){
          return {
              label:itm.name,
              value:itm._id
          }
      })
  })

  Template.hello.helpers({
    book: function () {
      return Books.findOne({title:"testbook"});
    },
    stringify: function(book){
      return JSON.stringify(book, null, '  ');
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Tags.findOne()) {
      Tags.insert({name:"tag1"});
      Tags.insert({name:"tag2"});
      Tags.insert({name:"tag3"});
    }
    if (!Books.findOne()) {
      Books.insert({title:"testbook"});
    }
  });
}
