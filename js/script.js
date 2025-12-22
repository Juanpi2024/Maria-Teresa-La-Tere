// script.js

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

});

function initDailyPhrase(phrases) {
    // Pick a random phrase
    // Feature enhancement: Could use today's date to pick a specific one so it stays the same all day
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[randomIndex];

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

        // Inner wrapper that does the flipping
        const cardInner = document.createElement('div');
        cardInner.className = 'phrase-card-inner';
        cardInner.style.position = 'relative';
        cardInner.style.width = '100%';
        cardInner.style.height = '100%';
        cardInner.style.textAlign = 'center';
        cardInner.style.transition = 'transform 0.6s';
        cardInner.style.transformStyle = 'preserve-3d';

        // Interaction: Click to flip
        cardContainer.addEventListener('click', () => {
            const isFlipped = cardInner.style.transform === 'rotateY(180deg)';
            cardInner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });

        // --- FRONT SIDE (Text) ---
        const cardFront = document.createElement('div');
        cardFront.className = 'phrase-card-front';
        // Base styles for front/back commonality could be in CSS, creating inline for specific structure

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

        // Random image selection (1 to 13)
        const randomImgNum = Math.floor(Math.random() * 13) + 1;

        const img = document.createElement('img');
        img.src = `img/tere${randomImgNum}.jpg`;
        img.alt = "Foto de La Tere";
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


