function start() {
    if (gamestart === 0) {
        document.getElementById("startimg").style.display = "none";
        document.getElementById("background").style.display = "block";
        document.getElementById("game-content").style.display = "block";
        gamestart = 1
        process();
    }
}
function process() {
    if (game.keiso.step === 0) {
        let watermax = ( game.water.amount + game.water.incre * 4 ) / 8
        let airmax = ( game.air.amount + game.air.incre * 4 ) / 4
        let foodmax = ( game.food.amount + game.food.incre * 4 ) / 16
        game.keiso.incre = Math.floor( Math.min ( game.keiso.amount, watermax, airmax, foodmax) )
    }
    game.water.amount += ( game.water.incre / 20 - game.keiso.incre / 10)
    game.air.amount += ( game.air.incre / 20 - game.keiso.incre / 20)
    game.food.amount += ( game.food.incre / 20 - game.keiso.incre / 5)
    game.water.amount = Math.round( game.water.amount * 10) / 10
    game.air.amount = Math.round( game.air.amount * 10) / 10
    game.food.amount = Math.round( game.food.amount * 10) / 10
    if (5 < game.keiso.step && game.keiso.step < 25) {
        document.getElementById("plusdis").style.opacity = 1 - ( game.keiso.step - 5 ) / 20;
    } else if (game.keiso.step === 25) {
        document.getElementById("plusdis").style.visibility = "hidden";
        document.getElementById("plusdis").style.opacity = 1;
    }
    if (game.keiso.step === 79) {
        game.keiso.step = 0
        game.keiso.incre = Math.floor(game.keiso.incre * mag)
        game.keiso.amount +=  game.keiso.incre
        if (game.keiso.incre > 1) {
            document.getElementById("plusdis").innerText = "+" + unit(game.keiso.incre) + "KEISOs";
        } else {
            document.getElementById("plusdis").innerText = "+" + game.keiso.incre + "KEISO";
        }
        document.getElementById("plusdis").style.visibility = "visible";
    } else {
        game.keiso.step ++
    }
    display();
    setTimeout(process, 50)
}
function display() {
    mag = Math.log10(game.keisopoint + 10) * 12 - 11
    if (game.keiso.amount > 1) {
        document.getElementById("KEISO").innerText = unit(game.keiso.amount) + "KEISOs";
    } else {
        document.getElementById("KEISO").innerText = unit(game.keiso.amount) + "KEISO";
    }
    document.getElementById("water").innerText = "水:" + unit(game.water.amount) + "(+" + unit(game.water.incre) + "/s)";
    document.getElementById("air").innerText = "酸素:" + unit(game.air.amount) + "(+" + unit(game.air.incre) + "/s)";
    document.getElementById("food").innerText = "養分:" + unit(game.food.amount) + "(+" + unit(game.food.incre) + "/s)";
    document.getElementById("greenrect").style.width = ( game.keiso.step * 10 ) + "px";
    document.getElementById("prog").innerText = ( Math.round(game.keiso.step * 125) / 100 ) + "%";
    document.getElementById("cost0").innerText = unit(game.water.price) + "KEISOs";
    document.getElementById("cost1").innerText = unit(game.air.price) + "KEISOs";
    document.getElementById("cost2").innerText = unit(game.food.price) + "KEISOs";
    document.getElementById("KEISOkasu").innerText = "合計" + unit(game.kasuamount) + " KEISOUsを力久に売った";
    document.getElementById("KEISOpoint").innerText = "KEISOpoint:" + unit(game.keisopoint) + "P";
    document.getElementById("mag").innerText = "KEISOの生産:" + unit(mag) + "x";
    if (game.keiso.amount >= 100) {
        document.getElementById("KEISOkasu").style.display = "block";
        document.getElementById("KEISOpoint").style.display = "block";
        document.getElementById("mag").style.display = "block";
        document.getElementById("kasu").innerText = "力久に売る";
        document.getElementById("cost3").innerText = "100 KEISOUs";
        document.getElementById("kasubutton").style.top = "192px";
        document.getElementById("save").style.top = "475px";
        if (game.keiso.amount >= 10000) {
            if (document.getElementById("kasu2").style.display === "none") {
                document.getElementById("kasu2").style.display = "block";
                document.getElementById("kasubutton").style.width = "410px";
            }
            if (game.keiso.amount >= 1000000) {
                if (document.getElementById("kasu3").style.display === "none") {
                    document.getElementById("kasu3").style.display = "block";
                    document.getElementById("kasubutton").style.width = "614px";
                }
                if (game.keiso.amount >= 100000000) {
                    if (document.getElementById("kasu4").style.display === "none") {
                        document.getElementById("kasu4").style.display = "block";
                        document.getElementById("kasubutton").style.width = "818px";
                    }
                }
            }
        }
    }
}
function up(t) {
    switch (t) {
        case 0:
            if (game.keiso.amount >= game.water.price) {
                game.keiso.amount -= game.water.price
                game.water.incre = Math.round(game.water.incre * 1.5)
                game.water.price = Math.round(game.water.price * 1.7)
                display();
            }
            break;
        case 1:
            if (game.keiso.amount >= game.air.price) {
                game.keiso.amount -= game.air.price
                game.air.incre = Math.round(game.air.incre * 1.5)
                game.air.price = Math.round(game.air.price * 1.7)
                display();
            }
            break;
        case 2:
            if (game.keiso.amount >= game.food.price) {
                game.keiso.amount -= game.food.price
                game.food.incre = Math.round(game.food.incre * 1.5)
                game.food.price = Math.round(game.food.price * 1.7)
                display();
            }
            break;
    }
}
function kasu(t) {
    switch (t) {
        case 0:
            if (game.keiso.amount >= 100) {
                game.keiso.amount -= 100
                game.kasuamount += 100
                game.keisopoint += 1
                display();
            }
            break;
        case 1:
            if (game.keiso.amount >= 10000) {
                game.keiso.amount -= 10000
                game.kasuamount += 10000
                game.keisopoint += 100
                display();
            }
            break;
        case 2:
            if (game.keiso.amount >= 1000000) {
                game.keiso.amount -= 1000000
                game.kasuamount += 1000000
                game.keisopoint += 10000
                display();
            }
            break;
        case 3:
            if (game.keiso.amount >= 100000000) {
                game.keiso.amount -= 100000000
                game.kasuamount += 100000000
                game.keisopoint += 1000000
                display();
            }
            break;
    }
}
function save() {
    let json = JSON.stringify(game, undefined, 1);
	localStorage.setItem('InfiniteKEISO', json);
}
function unit(x) {
    if (x < 1000) {
        return Math.round(x * 100) / 100;
    } else {
        let z_1 = 10 ** Math.floor(Math.log10(x) - 3);
        let z_2 = Math.floor(Math.log10(x) / 4);
        let z_3 = Math.round(x / z_1) * z_1 / 10 ** (z_2 * 4);
        z_3 = Math.round(z_3 * 100) / 100
        return z_3 + U_ja [z_2];
    }
}