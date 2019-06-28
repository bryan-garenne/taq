
var col;
var li;
var nb = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
var fleches = [38, 40, 37, 39];
var move = [];
var verifWin = [];
var i = 0;

var  d = 0;
function creatTable() {
    for (li = 1; li<5; li++){
        $('table').append('<tr class="'+'ligne'+li+'"></tr>');

        for (col = 0; col < 4; col++) {
            $('.ligne'+li+'').append('<td><div class="cercle ' + 'col'+col + ' li'+li + ' plein "><img src="medias/manchot/m' + nb[i] + '.jpg"><p>' + nb[i] + '</p></div></td>');
            i++;
        }
    }

    $('div.col3.li4').removeClass('plein').addClass('vide').html("");
}
creatTable();
var liVide = parseInt($('.vide').attr('class').split(' ')[2].substr(2,1));
var colVide = parseInt($('.vide').attr('class').split(' ')[1].substr(3,1));

///////////////////////////////////////// MOUVEMENTS
function moveUp() {
    if (liVide < 4) {
        liVide++;
    }
}

function moveDown() {
    if (liVide > 1) {
        liVide--;
    }
}

function moveLeft() {
    if (colVide < 3) {
        colVide++;
    }
}

function moveRight() {
    if (colVide > 0) {
        colVide--;
    }
}


function moves(depl) {
    if (depl === 38) {
        // up arrow
        moveUp();
    }
    else if (depl === 40) {
        // down arrow
        moveDown();
    }
    else if (depl === 37) {
        // left arrow
        moveLeft();

    }
    else if (depl === 39) {
        // right arrow
        moveRight();
    }
    return depl;
}



///////////////////////////////////////// MELANGE DU PC
function deplacePc(melange) {
    moves(melange);
    changeClass();
}

function error(move) {
    let check = 0;
    if (move === 38 && liVide === 4){
        check++;
    }

    if (move === 40 && liVide === 1){
        check++;
    }

    if (move === 37 && colVide === 3){
        check++;
    }

    if (move === 39 && colVide === 0){
        check++;
    }

    return check;
}

function random() {
    for (let d = 0; d < 100; d++) {
        let melange = fleches[Math.floor(Math.random()*4)];
        let check = error(melange);
        if (check === 0){
            deplacePc(melange);
            move.push(melange);
        }
    }

    // let melange = fleches[2];
    // for (let l = 0; l < 3; l++) {
    //     deplacePc(melange);
    //
    // }
    // melange = fleches[0];
    // for (let r = 0; r < 3; r++) {
    //     deplacePc(melange);
    //
    // }
}

///////////////////////////////////////// MOUVEMENTS DU JOUEUR
function checkKey(e) {

   error(e.keyCode);

    // let check = error(e.keyCode);

    let check = error(e.keyCode);
    if (check === 0){
        moves(e.keyCode);
        move.push(e.keyCode);
    }

    changeClass();


    verifW();

}

function changeClass() {
    $('.vide').html($('.cercle.col'+ colVide + '.li' + liVide).html());
    $('.vide').removeClass('vide').addClass('plein');
    $('.cercle.col'+ colVide + '.li' + liVide).removeClass('plein').addClass('vide');
    $('.vide').html("");
}

function verifW() {
    for (w = 0; w < 15; w++) {
        verifWin.push($('div p').eq(w).html());
    }
    var suite = 0;
    for (t = 0; t < 15; t++) {
        if (verifWin[t] === nb[t]){
            suite++;

        }
    }

    if (suite === 15) {
        // $('table td').css('margin', '0').css('padding', '0');
        // $('.col3.li4').html('<img src="medias/manchot/m16.jpg">');
        console.log("WIN");
    }
    verifWin = [];
}

$( "button.resolve" ).click(function() { // 38 haut, 40 bas, 37 gauche, 39 droite
    move.reverse();
    for (let r = 0; r < move.length; r++) {
        if (move[r] === 38) {
            move[r] = 40;
        } else if (move[r] === 40) {
            move[r] = 38;
        } else if (move[r] === 37) {
            move[r] = 39;
        } else if (move[r] === 39) {
            move[r] = 37;
        }
    }

    // setInterval(moveLent, 200);
    let ID = setInterval(function(){
        moveLent();
        if (d > move.length) {
            clearInterval(ID);
            // $('table td').css('margin', '0').css('padding', '0');
            // $('.col3.li4').html('<img src="medias/manchot/m16.jpg">');
        }
    }, 200);
});

// $('.changeImg').click(function() {
//     for (let i = 0; i < nb.length; i++) {
//         console.log(nb[i]);
//         $('img').attr('src','medias/chamois/c' + nb[i] + '.jpg');
//
//
//     }
//
// });

random();

function moveLent() {
    console.log(move[d]);
        moves(move[d]);
        changeClass();
    d++;
}


document.onkeydown = checkKey;
