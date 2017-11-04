var friendsData = require("../data/friends.js");
var path = require("path");

var idealDifference = 0;


module.exports = function(app){

  app.get("/api/friends", function(req, res){
    res.json(friendsData);
  });



  app.post("/api/friends", function(req, res){
    var allFriendDifferences = [];
    //loops through each friend
    for(i = 0; i < friendsData.length; i++){
      var friendDifference = 0;
      //loops through each score for given friend
      for(j = 0; j < friendsData[i].scores; j++){
        friendDifference += Math.abs(friendsData[i].scores[j] - req.body.scores[j]);
      }
      allFriendDifferences.push(friendDifference);

    }
    
    function indexOfSmallest(a) {
      var lowest = 0;
      for (var i = 1; i < a.length; i++) {
       if (a[i] < a[lowest]) lowest = i;
      }
      return lowest;
     }

     var bestFriendIndex = indexOfSmallest(allFriendDifferences);
     var bestFriend = friendsData[bestFriendIndex];

      friendsData.push(req.body);
      res.json(bestFriend);
    


    });

};
