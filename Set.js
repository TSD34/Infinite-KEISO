var gamestart = 0;
var mag = 1;
const U_ja = [
    "", 
    "万", 
    "億", 
    "兆", 
    "京", 
    "垓", 
    "𥝱", 
    "穣", 
    "溝", 
    "澗", 
    "正", 
    "載", 
    "極", 
    "恒河沙", 
    "阿僧祇", 
    "那由他", 
    "不可思議", 
    "無量大数"
];
if (localStorage.getItem("InfiniteKEISO") === null) {
    var game = {};
    game.kasuamount = 0;
    game.keisopoint = 0;
    game.keiso = {}
    game.keiso.incre = 0
    game.keiso.step = 0
    game.keiso.amount = 1
    game.water = {}
    game.water.incre = 10
    game.water.amount = 0
    game.water.price = 70
    game.air = {}
    game.air.incre = 10
    game.air.amount = 0
    game.air.price = 150
    game.food = {}
    game.food.incre = 10
    game.food.amount = 0
    game.food.price = 30
} else {
    let json = localStorage.getItem("InfiniteKEISO");
	var game = JSON.parse(json);
    console.log(game);
    delete json;
    if (game.keisopoint === undefined) {
        game.keisopoint = game.kasuamount / 100
    }
}