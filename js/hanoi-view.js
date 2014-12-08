(function() {
  if(typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }
  
  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.bindEvents();
    this.towerArray = []
  }
  
  View.prototype.bindEvents = function () {
    this.$el.on("click", ".tower", this.makeMove.bind(this));
  };
  
  View.prototype.makeMove = function (event) {
    var $tower = $(event.currentTarget);
    var pileNum = parseInt($tower.data("p"));
    this.towerArray.push(pileNum);
    
    if (this.towerArray.length === 2) {
      var startTower = this.towerArray[0], endTower = this.towerArray[1];

      if (this.game.isValidMove(startTower, endTower)) {
        this.game.move(startTower, endTower);
        this.render();
      } else {
        alert("Invalid Move!!!");
      }
      
      this.towerArray = [];
    }
    
    if (this.game.isWon()) {
      alert("You've won!!!");
    }
  };
  
  View.prototype.setupTowers = function () {
    var towers = this.game.towers;
    var megaString = "";
    
    for (var i = 0; i < towers.length; i++) {
      megaString += "<div class='tower' data-p=" + i + " style='display: flex; flex-direction: column-reverse; float: left; width:50px; height:150px; border: 1px solid black'>"
      for (var j = 0; j < towers[i].length; j++) {
        megaString += "<div class='disc' style='width: 50px; height: 48px; border: 1px solid black; background-color: orange;'>" +
                       towers[i][j] + "</div>"
      }
      
      megaString += "</div>"
    }
    
    this.$el.append(megaString);
  };
  
  View.prototype.render = function () {
    this.$el.children().remove();
    this.setupTowers();
  }
  
})();