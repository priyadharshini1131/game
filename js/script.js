document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const restartBtn = document.getElementById("restartBtn");

  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;

  // Create the cards
  const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let shuffledCards = [...cardValues, ...cardValues];
  shuffleCards(shuffledCards);

  // Create the game board
  function createBoard() {
    gameBoard.innerHTML = ""; // Clear the game board
    shuffledCards.forEach((value, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = value;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });
  }

  // Shuffle the cards using Fisher-Yates algorithm
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  // Flip the card
  function flipCard() {
    if (flippedCards.length === 2) return; // Ignore clicks if two cards are already flipped

    const card = this;
    card.classList.add("flipped");
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  // Check if the flipped cards match
  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === cardValues.length) {
        setTimeout(() => alert("You won!"), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
        flippedCards = [];
      }, 1000);
    }
  }

  // Restart the game
  function restartGame() {
    shuffledCards = [...cardValues, ...cardValues];
    shuffleCards(shuffledCards);
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
  }

  // Event listener for restart button
  restartBtn.addEventListener("click", restartGame);

  // Initialize the game
  createBoard();
});
