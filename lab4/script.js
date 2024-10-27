let cardCount;
let cards = [];
let firstCard = null;
let secondCard = null;
let matchesFound = 0;

function startGame() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";  // очистить доску
    cardCount = parseInt(document.getElementById("cardCount").value);

    if (isNaN(cardCount) || cardCount < 4 || cardCount % 2 !== 0) {
        alert("Введите четное число карточек не меньше 4!");
        return;
    }

    // Устанавливаем сетку в зависимости от количества карточек
    const cols = Math.ceil(Math.sqrt(cardCount));
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    cards = generateCards(cardCount);
    shuffleArray(cards);

    cards.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.value = value;
        card.innerText = value;
        card.onclick = onCardClick;
        gameBoard.appendChild(card);
    });
}

function generateCards(count) {
    const pairs = [];
    for (let i = 1; i <= count / 2; i++) {
        pairs.push(i, i);  // Создаем пары значений
    }
    return pairs;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function onCardClick(event) {
    const card = event.target;
    if (!card.classList.contains("hidden") || firstCard && secondCard) {
        return; // Игнорируем клики на открытые карточки или в процессе ожидания
    }

    card.classList.remove("hidden");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard = null;
            secondCard = null;
            matchesFound += 2;

            if (matchesFound === cardCount) {
                setTimeout(() => alert("Поздравляем! Вы нашли все пары!"), 300);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.add("hidden");
                secondCard.classList.add("hidden");
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }
}
