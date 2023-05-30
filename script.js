'use strict'; // mode strict d'un code JS activé pour une meilleure exécution.

// Declaration des constantes :
const player0El = document.querySelector('.player--0'); // Joueur 1
const player1El = document.querySelector('.player--1'); // Joueur 2
const score0El = document.querySelector('#score--0');   // Score joueur 1
const score1El = document.getElementById('score--1');   // Score joueur 2
const current0El = document.getElementById('current--0'); // Score actuel joueur 1
const current1El = document.getElementById('current--1'); // Score actuel joueur 2
const diceEl = document.querySelector('.dice');           // valeur du dé
const btnNew = document.querySelector('.btn--new');       // bouton nouvelle partie
const btnRoll = document.querySelector('.btn--roll');     // bouton lancer
const btnHold = document.querySelector('.btn--hold');     // bouton garder
const btnPseudo = document.querySelector('.btn--pseudo'); // bouton modifier le pseudo
const btnRules = document.querySelector('.btn--rules');   // bouton regles
const name0 = document.querySelector('name--0');          // pseudo joueur 1
const name1 = document.querySelector('name--1');          // pseudo joueur 2


// Declaration des variables :
let scores, currentScore, activePlayer, playing, i;

var rules = "Voici les règles du jeu :\n\nLe jeu comprend 2 joueurs sur un seul et même écran.\nChanque joueur possède un score temporaire (Score Actuel) et un score Global (En dessous de votre pseudo).\nA chaque tour, le joueur a son Score Actuel initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le résultat d'un lancé est ajouté au Score Actuel.\n\nLors de son tour, le joueur peut décider à tout moment de: \n- Cliquer sur le bouton GARDER, permet d'envoyer les points du Score Actuel vers le GLOBAL. Ce sera alors le tour de l'autre joueur.\n- Lancer le dé. S'il obtient un 1, son Score Actuel est perdu et c'est la fin de son tour.\nLe premier jouer qui atteint les 100 points sur le Score GLOBAL gagne le jeu. \n- Le bouton modifier pseudo permet de modier les deux pseudos des joueurs. \n\n- En restant jusqu'à la fin vous profiterez d'une petite animation pour le joueur gagnant !" ;


// Fonction pour modifier les pseudos :
btnPseudo.addEventListener('click', function () {
  var name0 = document.getElementById("name--0");
  var name1 = document.getElementById("name--1");
  var pseudo1 = prompt('Joueur 1 - Veuillez entrer votre pseudo :');
  var pseudo2 = prompt('Joueur 2 - Veuillez entrer votre pseudo :');
  name0.innerHTML = pseudo1;
  name1.innerHTML = pseudo2;
});


// Fonction pour afficher les regles :
btnRules.addEventListener('click', function () {
  window.alert(rules);
});


// Fonction pour lancer une nouvelle partie
const newGame = function () {
  scores = [0, 0];      // les scores sont remis a 0
  currentScore = 0;     
  activePlayer = 0;     // reinitialisation du joueur actif (qui est en train de jouer)
  playing = true;       // la partie se lance ? --> oui (true (boolean))

  score0El.textContent = 0;   // score global remis a 0
  score1El.textContent = 0;   //      ""
  current0El.textContent = 0; // score actuel remis a 0
  current1El.textContent = 0; //      ""


  diceEl.classList.add('hidden');   // cache le dé
  player0El.classList.remove('player--winner');   // pas de joueur 1 gagnant 
  player1El.classList.remove('player--winner');   // pas de joueur 2 gagnant 
  player0El.classList.add('player--active');      // le joueur 1 est actif (en train de jouer)
  player1El.classList.remove('player--active');   // le joueur 2 n'est pas actif

  var name0 = document.getElementById("name--0");   // reinitialise les pseudos à "JOUEUR 1" et "JOUEUR 2"
  var name1 = document.getElementById("name--1");
  name0.innerHTML = "JOUEUR 1";
  name1.innerHTML = "JOUEUR 2";

  document.querySelector(`.vainqueur0`).style.display = 'none'; // n'affiche pas de joueur gagnant
  document.querySelector(`.vainqueur1`).style.display = 'none'; // n'affiche pas de joueur gagnant

  alert("Une nouvelle partie est lancée ! \n Bonne chance !");   // notifier : vous avez gagné !
};
newGame();


// Fonction pour changer de joueur actif durant la partie

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};


// Fonction pour lancer le dé 
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dices/dice-${dice}.png`;       // affichage du dé de la bonne valeur 
    diceEl.classList.remove('turn');
    void diceEl.offsetWidth;                            // Forcez le recalcul de la mise en page pour réinitialiser l'animation
    diceEl.classList.add('turn');                       // Donnez à nouveau la classe pour activer la nouvelle animation

    if (dice !== 1) {                                   // Si la valeur du dé est n'est pas égale a 1
      currentScore += dice;                             // La valeur du dé est additionée au score actuel
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {                                            // Sinon 
      switchPlayer();                                   // c'est à l'autre joueur de jouer
      setTimeout(function () {                          // affichage d'un notifier pour informer le joueur
        alert("Vous avez fait 1  -  Fin de vote tour");
      }, 500);                                         // Ajoutez un délai de 100 millisecondes avant l'exécution de l'alerte
    }
  }
});


// Fonction pour garder
btnHold.addEventListener('click', function () {
  if (playing) {                              
    scores[activePlayer] += currentScore;       

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {                        // Si le score global est supérieur ou égal à 100
      playing = false;                                        // la partie s'arrete
      diceEl.classList.add('hidden');                         // le dé disparait

      document
        .querySelector(`.player--${activePlayer}`)            // le joueur actif est gagnant
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector('body').style.backgroundColor = '#223c23';   // le background body change de couleur
      document
        .querySelector(`.vainqueur${activePlayer}`).style.display = 'block';    // affichage de l'animation GIF

      alert("Vous avez gagné !");   // notifier : vous avez gagné !
    } else {
      switchPlayer();   // sinon la partie continue
    }
  }
});

btnNew.addEventListener('click', newGame);  // A l'appuis du bouton, la fonction nouvelle partie est appelée


window.addEventListener('resize', adjustColumnHeight);  // Fonction pour ajuster l'affichage 

function adjustColumnHeight() {
  const column = document.getElementById('column');
  column.style.height = window.innerHeight + 'px';
}

// Appel initial pour ajuster la hauteur lors du chargement de la page
adjustColumnHeight();