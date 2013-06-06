////////// Server only logic //////////



Meteor.startup(function() {
  var query = Players.find({
    looking: true
  });
  var handle = query.observeChanges({
    added: function() {
      debugger;
      if(global.remaining_players() <=0 ){
        console.log('new game')
        Meteor.call('start_new_game');
      }
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
      {$set: {game_id: game_id, looking: false}},
      {multi: true});

    var p = Players.find({game_id: game_id},
                        {fields: {_id: true, name: true}}).fetch();
    Games.update({_id: game_id}, {$set: {players: p}});

    //Window down the game clock
    var clock = 30;
    var interval = Meteor.setInterval(function() {
      clock -=1;
      Games.update(game_id, {$set: {clock: clock}});
    }, 1000);
  }
});

