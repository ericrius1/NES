////////// Server only logic //////////



Meteor.startup(function() {
  var query = Players.find({
    looking: true
  });
  var handle = query.observeChanges({
    added: function() {
    }
  });
});

Meteor.methods({

  start_new_game: function(){
    console.log("new game started")
    //create a new game
    var game_id = Games.insert({});

    //Move everyone who declared themselves ready in the lobby into the game
    Players.update({game_id: null, looking:true},
      {$set: {game_id: game_id}},
      {multi: true});
    //Once we have moved these players into a new game, 
    //set numPlayersLooking back to 0
    numPlayersLooking = 0;
  }

});