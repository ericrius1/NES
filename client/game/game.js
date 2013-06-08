Template.game.show = function() {
  return client.game()!==undefined; 
}

Template.game.my_name = function(){
  return client.player().name;
}

Template.game.me = function(){
  if(Session.get('game.activeTab') ===client.player()._id ){
    return true;
  }
  return false;
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
  }
});

