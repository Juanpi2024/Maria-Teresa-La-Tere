// script.js

// Cantidad total de fotos disponibles en img/tere1.jpg ... img/tereN.jpg
// Único lugar donde hay que actualizar este número si se agregan o quitan fotos.
const TOTAL_PHOTOS = 25;

document.addEventListener('DOMContentLoaded', () => {
    // Access data safely
    const phrases = window.appData ? window.appData.phrases : [];

    if (phrases.length === 0) {
        console.warn('No phrases found in data.js');
        return;
    }

    // Init components
    initDailyPhrase(phrases);
    initGlossary(phrases);
    initRandomBackground();
});

function getRandomImageNumber() {
    return Math.floor(Math.random() * TOTAL_PHOTOS) + 1;
}

// Elige un índice determinista a partir de la fecha de hoy, para que la
// "frase del día" sea la misma para todos durante el mismo día.
function getSeededIndexForToday(length) {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return seed % length;
}

function initDailyPhrase(phrases) {
    const index = getSeededIndexForToday(phrases.length);
    const phrase = phrases[index];

    const container = document.getElementById('daily-phrase-content');
    if (!container) return;

    // Clear loading state
    container.innerHTML = '';

    // Create elements
    const textEl = document.createElement('div');
    textEl.id = 'daily-phrase-text';
    textEl.textContent = `"${phrase.text}"`;

    const meaningEl = document.createElement('div');
    meaningEl.id = 'daily-phrase-meaning';
    meaningEl.textContent = phrase.meaning || '';

    container.appendChild(textEl);
    container.appendChild(meaningEl);
}

function initGlossary(phrases) {
    const grid = document.getElementById('phrases-grid');
    if (!grid) return;

    renderPhrases(phrases, grid);
}

function renderPhrases(items, container) {
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p class="no-results">No se encontraron frases.</p>';
        return;
    }

    items.forEach(item => {
        // Container for the flip effect
        const cardContainer = document.createElement('div');
        cardContainer.className = 'phrase-card-container fade-in';
        cardContainer.style.perspective = '1000px'; // Essential for 3D effect

        // Accessibility: make the card focusable and operable via keyboard
        cardContainer.setAttribute('tabindex', '0');
        cardContainer.setAttribute('role', 'button');
        cardContainer.setAttribute('aria-label', `Frase: ${item.text}. Presiona Enter para ver la foto.`);

        // Inner wrapper that does the flipping
        const cardInner = document.createElement('div');
        cardInner.className = 'phrase-card-inner';
        cardInner.style.position = 'relative';
        cardInner.style.width = '100%';
        cardInner.style.height = '100%';
        cardInner.style.textAlign = 'center';
        cardInner.style.transition = 'transform 0.6s';
        cardInner.style.transformStyle = 'preserve-3d';

        const toggleFlip = () => {
            const isFlipped = cardInner.style.transform === 'rotateY(180deg)';
            cardInner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
        };

        // Interaction: click or keyboard (Enter / Space) to flip
        cardContainer.addEventListener('click', toggleFlip);
        cardContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
            }
        });

        // --- FRONT SIDE (Text) ---
        const cardFront = document.createElement('div');
        cardFront.className = 'phrase-card-front';

        const originalText = document.createElement('h3');
        originalText.className = 'phrase-text';
        originalText.textContent = item.text;

        const meaningText = document.createElement('p');
        meaningText.className = 'phrase-meaning';
        meaningText.textContent = item.meaning || '';

        cardFront.appendChild(originalText);
        cardFront.appendChild(meaningText);

        // --- BACK SIDE (Image) ---
        const cardBack = document.createElement('div');
        cardBack.className = 'phrase-card-back';

        const randomImgNum = getRandomImageNumber();

        const img = document.createElement('img');
        img.src = `img/tere${randomImgNum}.jpg`;
        img.alt = "Foto de La Tere";
        img.loading = 'lazy';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '12px'; // Match card border radius

        cardBack.appendChild(img);

        // Append sides to inner
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        // Append inner to container
        cardContainer.appendChild(cardInner);

        container.appendChild(cardContainer);
    });
}


function initRandomBackground() {
    const randomImgNum = getRandomImageNumber();
    document.body.style.backgroundImage = `linear-gradient(rgba(15, 18, 21, 0.85), rgba(15, 18, 21, 0.95)), url('img/tere${randomImgNum}.jpg')`;
}
