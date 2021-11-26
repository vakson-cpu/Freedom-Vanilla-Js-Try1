const board = document.querySelector(".board");
const boardletters = document.querySelector(".letters");
const boardnumbers = document.querySelector(".numbers");
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let index = 0;
let black = false;
let num = 1;
var turn = false; //False Bela
//#region inicijalizacija Gridarasina
var Gridara = new Array(11);
var PoteziVert = new Array(11);
var PoteziHort = new Array(11);
var PoteziDDijag = new Array(11);
var PoteziLDijag = new Array(11);

for (let i = 0; i < 11; i++)
  Gridara[i] = new Array(11);

for (let i = 0; i < 11; i++) {
  PoteziVert[i] = new Array(11);
  PoteziHort[i] = new Array(11);
  PoteziDDijag[i] = new Array(11);
  PoteziLDijag[i] = new Array(11);
}
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
//Pamte poslednji potez i prvi turn
var Pom1;
var Pom2;
var FirstMove = true;

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
      if (turn == false && square.childElementCount == 0 && FirstMove == true) {
        //Prvi Potez beli
        let circle = document.createElement("div");
        circle.classList.add("lopticaBela");
        square.appendChild(circle);
        Gridara[i][j] = square;
        Pom1 = i;
        Pom2 = j;
        FirstMove = false;
        turn = !turn;
      }
      if (Puno(Gridara, Pom1, Pom2) == true) { //Ako je prethodna puna bila onda cepamo dje bilo
        if (turn == false) {
          if (square.childElementCount == 0) {
            let circle = document.createElement("div");
            circle.classList.add("lopticaBela");
            square.appendChild(circle);
            Gridara[i][j] = square;
            Pom1 = i;
            Pom2 = j;
            turn = !turn;
            Brojenje();
          }
        }
        else {
          if (square.childElementCount == 0) {
            let circle = document.createElement("div");
            circle.classList.add("lopticaCrna");
            square.appendChild(circle);
            Gridara[i][j] = square;
            Pom1 = i;
            Pom2 = j;
            turn = !turn;
            Brojenje();
          }
        }
      }
      if (Uslof(i, j, square, turn) == 2) {
        let circle = document.createElement("div");
        circle.classList.add("lopticaBela");
        square.appendChild(circle);
        Gridara[i][j] = square;
        turn = !turn;
        Pom1 = i;
        Pom2 = j;
        Brojenje();
      }
      if (Uslof(i, j, square, turn) == 1) {
        let circle = document.createElement("div");
        circle.classList.add("lopticaCrna");
        square.appendChild(circle);
        Gridara[i][j] = square;
        turn = !turn;
        Pom1 = i;
        Pom2 = j;

        Brojenje();
      }
    };
  }
}
//AKo su sva polja oko i jotog puna
function Puno(Gridara, i, j) {

  //Kada smo blizu cosadi kada smo blizu bantova.

  if (i == 10 && j == 10) { //donje desno
    if (
      Gridara[i - 1][j].childElementCount > 0 && //Vert Iznad
      Gridara[i][j - 1].childElementCount > 0 && //levo
      Gridara[i - 1][j - 1].childElementCount > 0  //leva gornja
    ) return true;
  }
  else if (i == 1 && j == 1) { //Gornje levo
    if (Gridara[i + 1][j].childElementCount > 0 && //Vertikano ispod]
      Gridara[i][j + 1].childElementCount > 0 && //desno
      Gridara[i + 1][j + 1].childElementCount > 0 //desna donja
    ) return true;
  }//Kada smo bilo gde pri samom vrhu.

  else if (i == 1 && j == 10) { //Gornji Desni
    if (Gridara[i + 1][j].childElementCount > 0 && //Vertikano ispod]
      Gridara[i][j - 1].childElementCount > 0 && //levo
      Gridara[i + 1][j - 1].childElementCount > 0 //leva donja
    ) return true;
  }
  else if (i == 10 && j == 1) {
    if (
      Gridara[i - 1][j].childElementCount > 0 && //Vert Iznad
      Gridara[i][j + 1].childElementCount > 0 && //desno
      Gridara[i - 1][j + 1].childElementCount > 0 //desna gornja
    ) return true;
  }
  //Dole
  else if(i==10){
    if (
      Gridara[i - 1][j].childElementCount > 0 && //Vert Iznad
      Gridara[i][j - 1].childElementCount > 0 && //levo
      Gridara[i][j + 1].childElementCount > 0 && //desno
      Gridara[i - 1][j - 1].childElementCount > 0 && //leva gornja
      Gridara[i - 1][j + 1].childElementCount > 0 //desna gornja
    ) return true;
  }
  //Gore
  else if (i == 1) {
    if (
      Gridara[i + 1][j].childElementCount > 0 && //Vertikano ispod]
      Gridara[i][j - 1].childElementCount > 0 && //levo
      Gridara[i][j + 1].childElementCount > 0 && //desno
      Gridara[i + 1][j - 1].childElementCount > 0 && //leva donja
      Gridara[i + 1][j + 1].childElementCount > 0 //desna donja
    )
      return true;
  }

  //Levo 
  else if(j==1){
    if (Gridara[i + 1][j].childElementCount > 0 && //Vertikano ispod]
      Gridara[i - 1][j].childElementCount > 0 && //Vert Iznad
      Gridara[i][j + 1].childElementCount > 0 && //desno
      Gridara[i - 1][j + 1].childElementCount > 0 && //desna gornja
      Gridara[i + 1][j + 1].childElementCount > 0 //desna donja
    ) return true;
  }
  //desno
  else if(j==10){
    if (Gridara[i + 1][j].childElementCount > 0 && //Vertikano ispod]
      Gridara[i - 1][j].childElementCount > 0 && //Vert Iznad
      Gridara[i][j - 1].childElementCount > 0 && //levo
      Gridara[i - 1][j - 1].childElementCount > 0 && //leva gornja
      Gridara[i + 1][j - 1].childElementCount > 0  //leva donja
    )return true;
  }
  //kada smo bilo gde okruzeni
  else if (Gridara[i + 1][j].childElementCount > 0 && //Vertikano ispod]
    Gridara[i - 1][j].childElementCount > 0 && //Vert Iznad
    Gridara[i][j - 1].childElementCount > 0 && //levo
    Gridara[i][j + 1].childElementCount > 0 && //desno
    Gridara[i - 1][j - 1].childElementCount > 0 && //leva gornja
    Gridara[i - 1][j + 1].childElementCount > 0 && //desna gornja
    Gridara[i + 1][j - 1].childElementCount > 0 && //leva donja
    Gridara[i + 1][j + 1].childElementCount > 0 //desna donja
  ) return true;
  else return false;

}
//Uslov gde moze da se pomera  na osnovu trenutnog poteza
const Uslof = (i, j, square, turn) => {
  if (turn == true) {

    if (
      square.childElementCount == 0 &&
      //Dijagonale
      ((i == Pom1 - 1 && j == Pom2 + 1) || // gore desno
        (i == Pom1 - 1 && j == Pom2 - 1) || // gore levo
        (i == Pom1 + 1 && j == Pom2 - 1) || //dole levo
        (i == Pom1 + 1 && j == Pom2 + 1) || //Dole desno
        (Pom1 == i && Pom2 == j + 1) ||
        (Pom1 == i && Pom2 == j - 1) || //Horizontalno levo desno
        (Pom1 == i + 1 && Pom2 == j) ||
        (Pom1 == i - 1 && Pom2 == j)) //Gore dole
    )
      return 1;
    else return 0;
  }
  if (turn == false) {
    if (
      FirstMove == false &&
      square.childElementCount == 0 &&
      //Dijagonale
      ((i == Pom1 - 1 && j == Pom2 + 1) || // gore desno
        (i == Pom1 - 1 && j == Pom2 - 1) || // gore levo
        (i == Pom1 + 1 && j == Pom2 - 1) || //dole levo
        (i == Pom1 + 1 && j == Pom2 + 1) || //Dole desno
        (Pom1 == i && Pom2 == j + 1) ||
        (Pom1 == i && Pom2 == j - 1) || //Horizontalno levo desno
        (Pom1 == i + 1 && Pom2 == j) ||
        (Pom1 == i - 1 && Pom2 == j)) //Gore dole
    )
      return 2;
    else return 0;
  }
};

//#region Uslovi
//Regular checker
//Da li sadrzi 4 u nizu tu boju
function KontejnBoju(P1, P2, P3, P4, val) {
  if (
    P4.classList.contains(val) == true &&
    P1.classList.contains(val) == true &&
    P2.classList.contains(val) == true &&
    P3.classList.contains(val) == true
  )
    return true;
  else return false;
}

//#region Dodavanje i micanje boja za horizontalu

function DodajBojuHor(Gridara, i, j, val) {
  Gridara[i][j + 1].classList.add(val);
  Gridara[i][j + 2].classList.add(val);
  Gridara[i][j + 3].classList.add(val);
  Gridara[i][j].classList.add(val);
  PoteziHort[i][j] = val;
  PoteziHort[i][j + 1] = val;
  PoteziHort[i][j + 2] = val;
  PoteziHort[i][j + 3] = val;

}
function MiciHor(Gridara, i, j, val) {
  Gridara[i][j].classList.remove(val);
  Gridara[i][j + 1].classList.remove(val);
  Gridara[i][j + 2].classList.remove(val);
  Gridara[i][j + 3].classList.remove(val);
  PoteziHort[i][j] = null;
  PoteziHort[i][j + 1] = null;
  PoteziHort[i][j + 2] = null;
  PoteziHort[i][j + 3] = null;
}
//#endregion

//CheckHorizontalna

const HoriPom = (Gridara, i, j, val1, val2) => {
  let P1 = Gridara[i][j + 1].firstChild;
  let P2 = Gridara[i][j + 2].firstChild;
  let P3 = Gridara[i][j + 3].firstChild;
  let P4 = Gridara[i][j].firstChild;
  if (j != 1) var P5 = Gridara[i][j - 1].firstChild;
  //Kad nam je j u nedozvoljene opsege
  else var P5 = null;
  //Proverimo da li su 4 zaredom loptice bijele.
  if (KontejnBoju(P1, P2, P3, P4, val1) == true) {
    let bully = false;
    //Ako jesu proveravamo da li postoji peta i ako postoji da li je i ona bijela ali ta ball more bit i crna
    if (j != 1) {
      if (P5 != null) {
        bully = P5.classList.contains(val1);
        if (bully == true) {
          P5.classList.remove(val2);
          MiciHor(Gridara, i, j, val2); //MacinjemoCrnu
          return false;
        }
        if (bully == false) {
          if (j + 4 <= 10) {
            if (Gridara[i][j + 4].childElementCount > 0) {
              let pp = Gridara[i][j + 4].firstChild;
              if (pp.classList.contains(val1)) {
                pp.classList.remove(val2);
                MiciHor(Gridara, i, j, val2); //MacinjemoCrnu
                return false;
              }
            }
          }
          DodajBojuHor(Gridara, i, j, val2);
          return true;
        }
      } //Slucaj kad nema prethodnika a nije prva.
      else {
        if (j + 4 <= 10) {
          if (Gridara[i][j + 4].childElementCount > 0) {
            let pp = Gridara[i][j + 4].firstChild;
            if (pp.classList.contains(val1)) {
              pp.classList.remove(val2);
              MiciHor(Gridara, i, j, val2); //MacinjemoCrnu
              return false;
            }
          }
        }
        DodajBojuHor(Gridara, i, j, val2);
        return true;
      }
    } //Ako je prvi element u pitnaju proveri  da nema mozda 5 ispred.
    else {
      if (j + 4 <= 10) {
        if (Gridara[i][j + 4].childElementCount > 0) {
          let pp = Gridara[i][j + 4].firstChild;
          if (pp.classList.contains(val1)) {
            pp.classList.remove(val2);
            MiciHor(Gridara, i, j, val2); //MacinjemoCrnu
            return false;
          }
        }
      }
      DodajBojuHor(Gridara, i, j, val2);
      return true;
    }
  }
}
const Horizontala = (i, j) => {
  if (j <= 7) {
    //Ostao mi slucaj kad imamo da nema J+1 prvu i prethodnu.
    if (
      Gridara[i][j + 1].childElementCount > 0 &&
      Gridara[i][j + 2].childElementCount > 0 &&
      Gridara[i][j + 3].childElementCount > 0
    ) {
      if (HoriPom(Gridara, i, j, "lopticaBela", "blacks") || HoriPom(Gridara, i, j, "lopticaCrna", "bela"))
        return true;
      else
        return false;

    }
    else return false;
  }
}
function DodajBojuVert(Gridara, i, j, val) {
  Gridara[i][j].classList.add(val);
  Gridara[i + 1][j].classList.add(val);
  Gridara[i + 2][j].classList.add(val);
  Gridara[i + 3][j].classList.add(val);
  PoteziVert[i + 1][j] = val;
  PoteziVert[i + 2][j] = val;
  PoteziVert[i + 3][j] = val;
  PoteziVert[i][j] = val;
}

function MiciVertikal(Gridara, i, j, val) {
  Gridara[i][j].classList.remove(val);
  Gridara[i + 1][j].classList.remove(val);
  Gridara[i + 2][j].classList.remove(val);
  Gridara[i + 3][j].classList.remove(val);
  PoteziVert[i + 1][j] = null;
  PoteziVert[i + 2][j] = null;
  PoteziVert[i + 3][j] = null;
  PoteziVert[i][j] = null;

}

function ZaVertikalce(Gridara, i, j, val1, val2) {
  let P1 = Gridara[i + 1][j].firstChild;
  let P2 = Gridara[i + 2][j].firstChild;
  let P3 = Gridara[i + 3][j].firstChild;
  let P4 = Gridara[i][j].firstChild;
  var P5;
  if (i - 1 >= 1) P5 = Gridara[i - 1][j].firstChild;
  //Ispred onaj element.
  else P5 = null;
  if (KontejnBoju(P1, P2, P3, P4, val1) == true) {
    let bully = false; //znaci gledamo da li ima sledbenika ili nema ako ima....
    if (i != 1) {
      if (P5 != null) {
        bully = P5.classList.contains(val1); //Ako ona iznad je bijela onda i nju i sve
        if (bully == true) {
          MiciVertikal(Gridara, i, j, val2); //MacinjemoCrnu
          Gridara[i - 1][j].classList.remove(val2);
          return false;
        }
        if (bully == false) {
          //Slucaj kada je iza Crna loptica ali ima ispred 4 petu belu.
          if (i + 4 <= 10) {
            if (Gridara[i + 4][j].childElementCount > 0) {
              let pp = Gridara[i + 4][j].firstChild;
              if (pp.classList.contains(val1)) {
                MiciVertikal(Gridara, i, j, val2);
                Gridara[i + 4][j].classList.remove(val2);
                return false;
              }
            }
          }
          DodajBojuVert(Gridara, i, j, val2);
          return true;
        }
      } else {
        if (i + 4 <= 10) {
          if (Gridara[i + 4][j].childElementCount > 0) {
            let pp = Gridara[i + 4][j].firstChild;
            if (pp.classList.contains(val1)) {
              MiciVertikal(Gridara, i, j, val2);
              Gridara[i + 4][j].classList.remove(val2);
              return false;
            }
          }
        }
        DodajBojuVert(Gridara, i, j, val2);
        return true;
      }
    } else {
      if (i + 4 <= 10) {
        if (Gridara[i + 4][j].childElementCount > 0) {
          let pp = Gridara[i + 4][j].firstChild;
          if (pp.classList.contains(val1)) {
            MiciVertikal(Gridara, i, j, val2);
            Gridara[i + 4][j].classList.remove(val2);
            return false;
          }
        }
      }
      DodajBojuVert(Gridara, i, j, val2);
      return true;
    }
  } else return false;
}

//Check Vertikalu
//Slucaj kada imamo iznad prve jos jednu belu,kada nemamo ali imamo dole +4
const Vertikala = (i, j) => {
  if (i <= 7)
    if (
      Gridara[i + 1][j].childElementCount > 0 &&
      Gridara[i + 2][j].childElementCount > 0 &&
      Gridara[i + 3][j].childElementCount > 0
    ) {
      var brojac = 0;
      if (
        ZaVertikalce(Gridara, i, j, "lopticaBela", "blacks") == true ||
        ZaVertikalce(Gridara, i, j, "lopticaCrna", "bela") == true
      )
        brojac++;
      if (brojac != 0) return true;
    } else return false;
};

//Check desnu dijagonalu

//Dodaj Boju
function DodajBojuDD(Gridara, i, j, val) {
  Gridara[i][j].classList.add(val);
  Gridara[i - 1][j + 1].classList.add(val);
  Gridara[i - 2][j + 2].classList.add(val);
  Gridara[i - 3][j + 3].classList.add(val);
  PoteziDDijag[i][j] = val;
  PoteziDDijag[i - 1][j + 1] = val;
  PoteziDDijag[i - 2][j + 2] = val;
  PoteziDDijag[i - 3][j + 3] = val;
}

function MiciDijagonalu(Gridara, i, j, val) {
  Gridara[i][j].classList.remove(val);
  Gridara[i - 1][j + 1].classList.remove(val);
  Gridara[i - 2][j + 2].classList.remove(val);
  Gridara[i - 3][j + 3].classList.remove(val);
  PoteziDDijag[i][j] = null;
  PoteziDDijag[i - 1][j + 1] = null;
  PoteziDDijag[i - 2][j + 2] = null;
  PoteziDDijag[i - 3][j + 3] = null;
}

function DDPom(Gridara, i, j, val1, val2) {
  let P1 = Gridara[i - 1][j + 1].firstChild;
  let P2 = Gridara[i - 2][j + 2].firstChild;
  let P3 = Gridara[i - 3][j + 3].firstChild;
  let P4 = Gridara[i][j].firstChild;
  var P5; //Prethodnu proveravamo ukoliko nije prvi potez.
  if (i - 4 >= 1 && j + 4 <= 10) P5 = Gridara[i - 4][j + 4].firstChild;
  else P5 = null;
  if (KontejnBoju(P1, P2, P3, P4, val1)) {
    if (i != 4) {
      if (P5 != null) {
        bully = P5.classList.contains(val1); //Ako ona iznad je bijela onda i nju i sve
        if (bully == true) {
          MiciDijagonalu(Gridara, i, j, val2); //MacinjemoCrnu
          return false;
        }
        if (bully == false) {
          if (Gridara[i + 1][j - 1].childElementCount > 0) {
            let pp = Gridara[i + 1][j - 1].firstChild;
            if (pp.classList.contains(val1)) {
              MiciDijagonalu(Gridara, i, j, val2);
              return false;
            }
          }
          DodajBojuDD(Gridara, i, j, val2);
          return true;
        }
      } else {
        if (i + 1 <= 10 && j - 1 >= 1) {
          //Ako je prvi na tabeli onda on nema prethodnika proverimo mi lijepo njegoovg slijedbenika.
          if (Gridara[i + 1][j - 1].childElementCount > 0) {
            let pp = Gridara[i + 1][j - 1].firstChild;
            if (pp.classList.contains(val1)) {
              MiciDijagonalu(Gridara, i, j, val2);
              return false;
            }
          }
        }
        DodajBojuDD(Gridara, i, j, val2);
        return true;
      }
    } else {
      if (i + 1 <= 10 && j - 1 >= 1) {
        //Ako je prvi na tabeli onda on nema prethodnika proverimo mi lijepo njegoovg slijedbenika.
        if (Gridara[i + 1][j - 1].childElementCount > 0) {
          let pp = Gridara[i + 1][j - 1].firstChild;
          if (pp.classList.contains(val1)) {
            MiciDijagonalu(Gridara, i, j, val2);
            return false;
          }
        }
      }
    }
    DodajBojuDD(Gridara, i, j, val2);
    return true;
  }
}
const DesnaDiagonala = (i, j) => {
  if (j <= 7 && i >= 4)
    if (
      Gridara[i - 1][j + 1].childElementCount > 0 &&
      Gridara[i - 2][j + 2].childElementCount > 0 &&
      Gridara[i - 3][j + 3].childElementCount > 0
    ) {
      var br = 0;
      if (
        DDPom(Gridara, i, j, "lopticaBela", "blacks") ||
        DDPom(Gridara, i, j, "lopticaCrna", "bela")
      )
        br++;
      if (br != 0) return true;
      else return false;
    } else return false;
};

//Check Levu dijagonalu.
function DodajBojuLD(Gridara, i, j, val) {
  Gridara[i][j].classList.add(val);
  Gridara[i - 1][j - 1].classList.add(val);
  Gridara[i - 2][j - 2].classList.add(val);
  Gridara[i - 3][j - 3].classList.add(val);
  PoteziLDijag[i][j] = val;
  PoteziLDijag[i - 1][j - 1] = val;
  PoteziLDijag[i - 2][j - 2] = val;
  PoteziLDijag[i - 3][j - 3] = val;
}

function MiciDijagonaluLevu(Gridara, i, j, val) {
  Gridara[i][j].classList.remove(val);
  Gridara[i - 1][j - 1].classList.remove(val);
  Gridara[i - 2][j - 2].classList.remove(val);
  Gridara[i - 3][j - 3].classList.remove(val);
  PoteziLDijag[i][j] = null;
  PoteziLDijag[i - 1][j - 1] = null;
  PoteziLDijag[i - 2][j - 2] = null;
  PoteziLDijag[i - 3][j - 3] = null;
}

function LDPom(Gridara, i, j, val1, val2) {
  let P1 = Gridara[i - 1][j - 1].firstChild;
  let P2 = Gridara[i - 2][j - 2].firstChild;
  let P3 = Gridara[i - 3][j - 3].firstChild;
  let P4 = Gridara[i][j].firstChild;
  var P5; //Prethodnu proveravamo ukoliko nije prvi potez.
  if (i - 4 >= 1 && j - 4 >= 1) P5 = Gridara[i - 4][j - 4].firstChild;
  else P5 = null;
  if (KontejnBoju(P1, P2, P3, P4, val1)) {
    if (i != 4) {
      if (P5 != null) {
        bully = P5.classList.contains(val1); //Ako ona iznad je bijela onda i nju i sve
        if (bully == true) {
          MiciDijagonaluLevu(Gridara, i, j, val2); //MacinjemoCrnu
          return false;
        }
        if (bully == false) {
          if (Gridara[i + 1][j + 1].childElementCount > 0) {
            let pp = Gridara[i + 1][j + 1].firstChild;
            if (pp.classList.contains(val1)) {
              MiciDijagonaluLevu(Gridara, i, j, val2);
              return false;
            }
          }
          DodajBojuLD(Gridara, i, j, val2);
          return true;
        }
      } else {
        if (i + 1 <= 10 && j + 1 <= 10) {
          //Ako je prvi na tabeli onda on nema prethodnika proverimo mi lijepo njegoovg slijedbenika.
          if (Gridara[i + 1][j + 1].childElementCount > 0) {
            let pp = Gridara[i + 1][j + 1].firstChild;
            if (pp.classList.contains(val1)) {
              MiciDijagonaluLevu(Gridara, i, j, val2);
              return false;
            }
          }
        }
        DodajBojuLD(Gridara, i, j, val2);
        return true;
      }
    } else {
      if (i + 1 <= 10 && j + 1 <= 10) {
        //Ako je prvi na tabeli onda on nema prethodnika proverimo mi lijepo njegoovg slijedbenika.
        if (Gridara[i + 1][j + 1].childElementCount > 0) {
          let pp = Gridara[i + 1][j + 1].firstChild;
          if (pp.classList.contains(val1)) {
            MiciDijagonaluLevu(Gridara, i, j, val2);
            return false;
          }
        }
      }
    }
    DodajBojuLD(Gridara, i, j, "blacks");
    return true;
  }
}
const LevaDiagonala = (i, j) => {
  if (j >= 4 && i >= 4)
    if (
      Gridara[i - 1][j - 1].childElementCount > 0 &&
      Gridara[i - 2][j - 2].childElementCount > 0 &&
      Gridara[i - 3][j - 3].childElementCount > 0
    ) {
      var br = 0;
      if (LDPom(Gridara, i, j, "lopticaBela", "blacks") == true) br++;
      if (LDPom(Gridara, i, j, "lopticaCrna", "bela")) br++;
      if (br != 0) return true;
    } else return false;
};
//#endregion
var BrojacPrekida = 0;

function Bojenje() {
  for (let i = 1; i < 11; i++)
    for (let j = 1; j < 11; j++) {
      if (PoteziHort[i][j] != null)
        Gridara[i][j].classList.add(PoteziHort[i][j]);
      if (PoteziVert[i][j] != null)
        Gridara[i][j].classList.add(PoteziVert[i][j]);
      if (PoteziDDijag[i][j] != null)
        Gridara[i][j].classList.add(PoteziDDijag[i][j]);
      if (PoteziLDijag[i][j] != null)
        Gridara[i][j].classList.add(PoteziLDijag[i][j]);
    }
}
//Logika Brojanja:
const Brojenje = () => {
  BrojacPrekida = 0;
  for (let i = 1; i <= 10; i++)
    for (let j = 1; j <= 10; j++) {
      //Prvo proverimo da li trenutni element ima kruzic ,selam je ruzic
      if (Gridara[i][j].childElementCount > 0) {
        //Idemo direktno odma proveravanje za desno
        if (Horizontala(i, j) == true) BrojacPrekida++;
        //Provera Vertikalno ka gore.
        if (Vertikala(i, j) == true) BrojacPrekida++;
        //Provera Diagonelija  u desno
        if (DesnaDiagonala(i, j) == true) BrojacPrekida++;
        //Dijagonala Levo
        if (LevaDiagonala(i, j) == true) BrojacPrekida++;
      }
    }

  Bojenje();
  console.log("The number of Crossed paths: ", BrojacPrekida);
};
