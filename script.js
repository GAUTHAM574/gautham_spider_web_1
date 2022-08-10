document.getElementById('start_butt').addEventListener("click", filldetails);
var player_1 = [0, 0, 0, 0, 0];
var player_2 = [0, 0, 0, 0, 0];
let ind = 0;
let score = 30;

//defining names of player
var name1;
var name2;

function filldetails() {

    document.querySelector('.body').style = "background-image:url(bg-2.jpg);background-repeat:no-repeat";
    document.getElementById('input_box').style.display = "none";
    document.getElementById('game').style.display = "flex";
    document.getElementById('score_board_body').style="display:none";


    //displaying name
    name1 = document.getElementById('p1_name').value
    document.getElementById('player_1_box').innerHTML = name1;

    name2 = document.getElementById('p2_name').value
    document.getElementById('player_2_box').innerHTML = name2;

    var numbers = document.getElementById('numbers');
    numbers.style = "display:flex;justify-content:space-around";

    // calling the game
    startgame();

}

function startgame() {
    ind = 0;
    player_1 = [0, 0, 0, 0, 0];
    player_2 = [0, 0, 0, 0, 0];

    //declaring score
    score = 30;

    ; //resetting all images to default
    for (i of document.querySelectorAll('img')) {
        i.src = 'man_0.jpg';
    }



    //function when the generate number button is pressed
    document.getElementById('rand_num').addEventListener("click", () => {

        //generating a random number less than 6
        var num = Math.round(Math.random() * 4 + 1);

        //finding which player is playing
        var player_id = (ind % 2) + 1;
        if (player_id == 1) {
            if (player_1[num - 1] < 6) {
                player_1[num - 1] = player_1[num - 1] + 1;

                var box = document.getElementById(`p1-b${num}`)
                box.innerHTML = `<img src='man_${player_1[num-1]}.jpg'>`;
            }
            //checking for player 1 whether he won
            if (player_1[num - 1] == 6) {
                check(player_id);
            }
        } else {
            if (player_2[num - 1] < 6) {
                player_2[num - 1] = player_2[num - 1] + 1;

                var box = document.getElementById(`p2-b${num}`);
                box.innerHTML = `<img src='man_${player_2[num-1]}.jpg'>`;
            }


            //checking if player 2 won
            if (player_2[num - 1] == 6) {
                check(player_id);
            }

        }

        //increasing the index variable 
        ind = ind + 1;

        //displaying the generated number 
        document.getElementById('disp_num').innerHTML = num;



    })

}

//function for checking
function check(player_id) {
    var res = 0;
    //list of the respective player 
    var player;
    if (player_id == 1) {
        player = player_1
    } else {
        player = player_2;
    }

    for (i = 0; i < 5; i++) {
        if (player[i] == 6)
            res++;
    }

    if (res == 5) {
        dispresults();
    }
}

//displaying results and starting new game
function dispresults() {
    console.log('winner is', (ind % 2) + 1, ind);
    if (ind % 2 == 0) {
        for (i = 0; i < 5; i++) {
            score = score - player_2[i];
        }
        localStorage.setItem(name1, score.toString());

        alert("winner is " + name1 + "with score " + score + "\n pressing ok will lead to new game");
        for (i of document.querySelectorAll('img')) {
            i.src = 'man_0.jpg';
        }

        startgame();
    }

    if (ind % 2 == 1) {
        for (i = 0; i < 5; i++) {
            score = score - player_1[i];
        }
        localStorage.setItem(name2, score.toString());

        alert("winner is " + name2 + "with score " + score + "\n pressing ok will lead to new game");
        for (i of document.querySelectorAll('img')) {
            i.src = 'man_0.jpg';
        }

        startgame();
    }
}
document.getElementById('reset').addEventListener('click', () => {
        console.log('reset');
        alert("pressing ok will start a new game");
        location.reload();
    }

)