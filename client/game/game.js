Template.game.show = function() {
  return client.game()!==undefined; 
}


Template.game.my_name = function(){
  return client.player().name;
}

Template.game.me = function(){
  if(Session.get('game.activeTab') === client.player()._id ){
    return true;
  }
  return false;
}

Template.game.submission = function(){
  if(!client.is_voting())return "";
  var selectedPlayerId = Session.get('game.activeTab');
  return client.selected_player_submission(selectedPlayerId);
}

Template.game.selected= function(){
  //returns selected if the current tab is our active tab and we are voting, else empty string
  return (client.is_voting() && this._id === Session.get('game.activeTab'))? 'selected' : '';
}

Template.game.voting = function() {
  return client.is_voting();
}


Template.clock.clock = function() {
  return client.timer().clock
}

Template.game.players = function() {
  return client.all_players();
}

Template.game.getActiveTab = function() {
  return Session.get('game.activeTab');
}

Template.game.events({
  'click nav.tabs > a': function(evt) {
    var id = $(evt.target).data('playerId');
    Session.set('game.activeTab', id);
    $(evt.target).attr('selected', 'selected');
  },

  'click label.approved': function(evt){
    var id = Session.get('game.activeTab');
    debugger;
    Players.update(id, {$inc: {votes: 1}})
  }
});

