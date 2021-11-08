const board = document.querySelector(".board");
const boardletters = document.querySelector(".letters");
const boardnumbers = document.querySelector(".numbers");
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let index = 0;
let black = false;
let num = 1;
var turn = false;


//#region inicijalizacija Gridarasina
var Gridara = new Array(11);
for (let i = 0; i < 11; i++)
    for (let j = 0; j < 11; j++)
        Gridara[i] = new Array(11);
//#endregion


//Letters and Numbers
for (let i = 0; i < 10; i++) {

    let letter = document.createElement("li");
    letter.textContent = letters[i];
    boardletters.appendChild(letter);
    let numbers = document.createElement("li");
    numbers.textContent = num++;
    boardnumbers.appendChild(numbers);

}

var Pom1;
var Pom2;
//Inicijalizacija
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {

        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("black");
        //Za belu
        Gridara[i][j] = square;


        board.appendChild(square);

        square.onclick = () => {
            console.log("red je: ", i);
            console.log("kolona je: ", j);
            if (turn == false && square.childElementCount == 0) {
                let circle = document.createElement("div");
                circle.classList.add("lopticaBela");
                square.appendChild(circle);
                Gridara[i][j] = square;
                turn = !turn;
                Pom1 = i;
                Pom2 = j;
            }
            if (turn == true && square.childElementCount == 0 && (
                //Dijagonale
                (i == Pom1 - 1 && j == Pom2 + 1)// gore desno
                || (i == Pom1 - 1 && j == Pom2 - 1) // gore levo
                || (i == Pom1 + 1 && j == Pom2 - 1) //dole levo
                || (i == Pom1 + 1 && j == Pom2 + 1) //Dole desno
                || (Pom1 == i && Pom2 == j + 1) || (Pom1 == i && Pom2 == j - 1)//Horizontalno levo desno
                || (Pom1 == i + 1 && Pom2 == j) || (Pom1 == i - 1 && Pom2 == j) //Gore dole
            )
            ) {
                let circle = document.createElement("div");
                circle.classList.add("lopticaCrna");
                square.appendChild(circle);
                Gridara[i][j] = square;
                turn = !turn;
            }
        }

    }

}

//CheckHorizontalna
const Horizontala = (i, j) => {
    if (j <= 6)
        if (Gridara[i][j + 1].childElementCount > 0
            && Gridara[i][j + 2].childElementCount > 0
            && Gridara[i][j + 3].childElementCount > 0) {
            let P1 = Gridara[i][j + 1].firstChild;
            let P2 = Gridara[i][j + 2].firstChild;
            let P3 = Gridara[i][j + 3].firstChild;
            let P4 = Gridara[i][j].firstChild;
            if (P4.classList.contains("lopticaBela") == true
                && P1.classList.contains("lopticaBela") == true
                && P2.classList.contains("lopticaBela") == true
                && P3.classList.contains("lopticaBela") == true) {
                return true;
            }
            else return false;
        }
        else
            return false;
}

//Check Vertikalu
const Vertikala = (i, j) => {
    if (i >= 4)
        if (Gridara[i - 1][j].childElementCount > 0
            && Gridara[i - 2][j].childElementCount > 0
            && Gridara[i - 3][j].childElementCount > 0) {
            let P1 = Gridara[i - 1][j].firstChild;
            let P2 = Gridara[i - 2][j].firstChild;
            let P3 = Gridara[i - 3][j].firstChild;
            let P4 = Gridara[i][j].firstChild;

            if (P4.classList.contains("lopticaBela") == true
                && P1.classList.contains("lopticaBela") == true
                && P2.classList.contains("lopticaBela") == true
                && P3.classList.contains("lopticaBela") == true)
                return true;
            else
                return false;

        }
        else return false;
}

//Check desnu dijagonalu
const DesnaDiagonala = (i, j) => {
    if (j <= 6 && i >= 4)
        if (Gridara[i - 1][j + 1].childElementCount > 0
            && Gridara[i - 2][j + 2].childElementCount > 0
            && Gridara[i - 3][j + 3].childElementCount > 0) {
            let P1 = Gridara[i - 1][j + 1].firstChild;
            let P2 = Gridara[i - 2][j + 2].firstChild;
            let P3 = Gridara[i - 3][j + 3].firstChild;
            let P4 = Gridara[i][j].firstChild;

            if (P4.classList.contains("lopticaBela") == true
                && P1.classList.contains("lopticaBela") == true
                && P2.classList.contains("lopticaBela") == true
                && P3.classList.contains("lopticaBela") == true)
                return true;

            else
                return false;
        }
        else return false;
}

//Check Levu dijagonalu.
const LevaDiagonala = (i, j) => {
    if (j >= 4 && i >= 4)
        if (Gridara[i - 1][j - 1].childElementCount > 0
            && Gridara[i - 2][j - 2].childElementCount > 0
            && Gridara[i - 3][j - 3].childElementCount > 0) {
            let P1 = Gridara[i - 1][j - 1].firstChild;
            let P2 = Gridara[i - 2][j - 2].firstChild;
            let P3 = Gridara[i - 3][j - 3].firstChild;
            let P4 = Gridara[i][j].firstChild;

            if (P4.classList.contains("lopticaBela") == true
                && P1.classList.contains("lopticaBela") == true
                && P2.classList.contains("lopticaBela") == true
                && P3.classList.contains("lopticaBela") == true)
                return true;
            else return false;
        }
        else return false;

}

//Logika:
const Brojenje = () => {
    let BrojacPrekida = 0;
    for (let i = 1; i <= 10; i++)
        for (let j = 1; j <= 10; j++) {
            //Prvo proverimo da li trenutni element ima kruzic ,selam je ruzic
            if (Gridara[i][j].childElementCount > 0) {
                //Idemo direktno odma proveravanje za desno
                if (Horizontala(i, j) == true)
                    BrojacPrekida++;
                //Provera Vertikalno ka gore.
                if (Vertikala(i, j) == true)
                    BrojacPrekida++;
                //Provera Diagonelija  u desno
                if (DesnaDiagonala(i, j) == true)
                    BrojacPrekida++;
                //Dijagonala Levo
                if (LevaDiagonala(i, j) == true)
                    BrojacPrekida++;
            }
        }

    console.log("The number of Crossed paths: ", BrojacPrekida);
}









