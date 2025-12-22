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
    setupSearch(phrases);
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
        const card = document.createElement('div');
        card.className = 'phrase-card fade-in';

        const originalText = document.createElement('h3');
        originalText.className = 'phrase-text';
        originalText.textContent = item.text;

        const meaningText = document.createElement('p');
        meaningText.className = 'phrase-meaning';
        meaningText.textContent = item.meaning || '';

        card.appendChild(originalText);
        card.appendChild(meaningText);

        container.appendChild(card);
    });
}

function setupSearch(phrases) {
    const input = document.getElementById('search-input');
    const grid = document.getElementById('phrases-grid');

    if (!input || !grid) return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        const filtered = phrases.filter(p =>
            p.text.toLowerCase().includes(query) ||
            (p.meaning && p.meaning.toLowerCase().includes(query))
        );

        renderPhrases(filtered, grid);
    });
}
