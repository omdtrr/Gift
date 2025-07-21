console.log("Script is running!");

// SVG Definitions for items and magical girl
// お客様のカスタムSVGをここに貼り付けてください
const magicalGirlSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 5C35 5 20 20 20 35C20 50 35 65 50 80C65 65 80 50 80 35C80 20 65 5 50 5Z" fill="#FFC0CB"/><path d="M50 80L40 95H60L50 80Z" fill="#FFC0CB"/><circle cx="40" cy="30" r="8" fill="#FFD700"/><circle cx="60" cy="30" r="8" fill="#FFD700"/><path d="M45 45L35 55H65L55 45L50 60L45 45Z" fill="#FF69B4"/><path d="M50 5L55 20L65 25L55 30L50 45L45 30L35 25L45 20L50 5Z" fill="#FFD700"/></svg>`;
const staffSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L10 10L2 12L10 14L12 22L14 14L22 12L14 10L12 2Z" fill="#FFD700"/><rect x="11" y="12" width="2" height="10" fill="#8B4513"/></svg>`;
const bootsSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 18H19V14H17V10H15V6H13L11 2H9L7 6H5V18Z" fill="#8B0000"/><path d="M5 18H19V20H5V18Z" fill="#550000"/></svg>`;
const pendantSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9.5 2 7 4 7 7C7 10 12 18 12 18C12 18 17 10 17 7C17 4 14.5 2 12 2Z" fill="#FF69B4"/><circle cx="12" cy="7" r="2" fill="#FFFFFF"/><path d="M12 18L10 22H14L12 18Z" fill="#FF69B4"/></svg>`;
const broomSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="10" width="20" height="4" rx="2" fill="#8B4513"/><path d="M20 12L22 10V14L20 12Z" fill="#A0522D"/><path d="M22 10C22 8 20 6 18 6L18 8C19 8 20 9 20 10L22 10Z" fill="#A0522D"/><path d="M22 14C22 16 20 18 18 18L18 16C19 16 20 15 20 14L22 14Z" fill="#A0522D"/></svg>`;
const hatSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 16H19L14 4H10L5 16Z" fill="#800080"/><path d="M3 16H21V18H3V16Z" fill="#550055"/><circle cx="12" cy="10" r="2" fill="#FFD700"/></svg>`;
const giftSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8H3V20H21V8Z" fill="#FF0000"/><path d="M12 3L10 8H14L12 3Z" fill="#FF0000"/><rect x="11" y="8" width="2" height="12" fill="#FFD700"/><rect x="3" y="11" width="18" height="2" fill="#FFD700"/></svg>`;
const stoneSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C20 10 10 40 10 60 C10 80 30 90 50 90 C70 90 90 80 90 60 C90 40 80 10 50 10Z" fill="#A9A9A9"/><path d="M40 20 C30 20 25 30 25 40 C25 50 30 55 40 55 C50 55 55 50 55 40 C55 30 50 20 40 20Z" fill="#999999"/><path d="M70 30 C60 30 55 40 55 50 C55 60 60 65 70 65 C80 65 85 60 85 50 C85 40 80 30 70 30Z" fill="#999999"/></svg>`;


// Item definitions (using SVG strings)
const items = {
    "staff": { name: "ステッキ", svg: staffSVG },
    "boots": { name: "ブーツ", svg: bootsSVG },
    "pendant": { name: "ペンダント", svg: pendantSVG },
    "broom": { name: "ほうき", svg: broomSVG },
    "hat": { name: "帽子", svg: hatSVG }
};

// Present hotspot positions (relative to the garden image)
const presentPositions = [
    { top: '20%', left: '15%' },
    { top: '40%', left: '70%' },
    { top: '60%', left: '30%' },
    { top: '30%', left: '50%' },
    { top: '75%', left: '80%' },
    { top: '10%', left: '85%' },
    { top: '55%', left: '10%' }
];

let presentsPool = [];
let collectedItems = new Set();
const totalUniqueItems = Object.keys(items).length;
const totalPresentsInGame = presentPositions.length;

// Get DOM elements
const gardenArea = document.getElementById('gardenArea');
const presentsLeftText = document.getElementById('presentsLeft');
const resetButton = document.getElementById('resetButton');
const messageBox = document.getElementById('messageBox');
const collectedItemsList = document.getElementById('collectedItemsList');

// Modal related DOM elements
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalImage = document.getElementById('modalImage');
const modalSvgContainer = document.getElementById('modalSvgContainer');

let modalCompletionCallback = null;

/**
 * Displays a message to the user at the top of the screen.
 * @param {string} message - The message text to display.
 * @param {'info'|'success'|'error'} type - The type of message (for coloring).
 */
function showMessage(message, type = 'info') {
    messageBox.textContent = message;
    messageBox.className = `message-box block`;
    if (type === 'error') {
        messageBox.classList.add('bg-red-100', 'text-red-700', 'border-red-200');
    } else if (type === 'success') {
        messageBox.classList.add('bg-green-100', 'text-green-700', 'border-green-200');
    } else {
        messageBox.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-200');
    }
    messageBox.style.display = 'block';
}

/**
 * Hides the message box at the top of the screen.
 */
function hideMessage() {
    messageBox.style.display = 'none';
}

/**
 * Updates and displays the list of collected items.
 */
function renderCollectedItems() {
    collectedItemsList.innerHTML = '';
    if (collectedItems.size === 0) {
        collectedItemsList.textContent = 'まだ何も集まっていません。';
        collectedItemsList.classList.add('text-gray-500');
    } else {
        collectedItemsList.classList.remove('text-gray-500');
        collectedItems.forEach(itemName => {
            const itemSpan = document.createElement('span');
            itemSpan.className = 'collected-item';
            itemSpan.textContent = items[itemName].name;
            collectedItemsList.appendChild(itemSpan);
        });
    }
}

/**
 * Displays the modal.
 * @param {object} options - Options for displaying the modal.
 * @param {string} [options.title] - Title of the modal.
 * @param {string} [options.message] - Message text of the modal.
 * @param {string} [options.imageUrl] - URL of the image to display.
 * @param {string} [options.imageAlt] - Alt text for the image.
 * @param {string} [options.svgContent] - SVG string content to display.
 * @param {function} [options.onClosed] - Callback function to execute when the modal is closed.
 * @param {string} [options.width] - Custom width for the modal (e.g., '90vw').
 * @param {string} [options.height] - Custom height for the modal (e.g., '20vh').
 * @param {boolean} [options.isLargeMessage=false] - If true, applies a larger font size to the message and a light blue background.
 */
function showModal(options) {
    modalTitle.classList.add('hidden');
    modalMessage.classList.add('hidden');
    modalImage.classList.add('hidden');
    modalSvgContainer.classList.add('hidden');
    modalImage.src = '';
    modalImage.alt = '';
    modalSvgContainer.innerHTML = '';

    modalMessage.classList.remove('modal-message-large');
    modalContent.style.backgroundColor = '';

    if (options.title) {
        modalTitle.textContent = options.title;
        modalTitle.classList.remove('hidden');
    }
    if (options.message) {
        modalMessage.textContent = options.message;
        modalMessage.classList.remove('hidden');
        if (options.isLargeMessage) {
            modalMessage.classList.add('modal-message-large');
            modalContent.style.backgroundColor = '#E0FFFF'; /* 薄い水色 (LightCyan) */
        }
    }

    if (options.imageUrl) {
        modalImage.src = options.imageUrl;
        modalImage.alt = options.imageAlt || "Popup Image";
        modalImage.classList.remove('hidden');
    } else if (options.svgContent) {
        modalSvgContainer.innerHTML = options.svgContent;
        modalSvgContainer.classList.remove('hidden');
    }

    modalContent.style.width = options.width || 'auto';
    modalContent.style.height = options.height || 'auto';

    modalCompletionCallback = options.onClosed || null;

    modalOverlay.classList.add('active');
}

/**
 * Hides the modal.
 */
function hideModal() {
    modalOverlay.classList.remove('active');
    modalImage.src = '';
    modalImage.alt = '';
    modalSvgContainer.innerHTML = '';
    modalTitle.textContent = '';
    modalMessage.textContent = '';
    modalMessage.classList.remove('modal-message-large');

    modalContent.style.width = '';
    modalContent.style.height = '';
    modalContent.style.backgroundColor = '';

    if (modalCompletionCallback) {
        modalCompletionCallback();
        modalCompletionCallback = null;
    }
}

modalCloseButton.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        hideModal();
    }
});

/**
 * Initializes the game state and starts a new game.
 */
function initializeGame() {
    hideMessage();
    hideModal();
    presentsPool = [];
    collectedItems.clear();

    Array.from(gardenArea.children).forEach(child => {
        if (child.classList.contains('present-hotspot')) {
            gardenArea.removeChild(child);
        }
    });

    const allItemKeys = Object.keys(items);
    let tempContents = [...allItemKeys];

    for (let i = 0; i < (totalPresentsInGame - totalUniqueItems); i++) {
        tempContents.push('miss');
    }

    for (let i = tempContents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempContents[i], tempContents[j]] = [tempContents[j], tempContents[i]];
    }

    presentPositions.forEach((pos, index) => {
        const hotspot = document.createElement('div');
        hotspot.className = 'present-hotspot';
        hotspot.style.top = pos.top;
        hotspot.style.left = pos.left;
        hotspot.dataset.index = index;
        hotspot.innerHTML = `<span class="present-icon">${giftSVG}</span>`;
        hotspot.addEventListener('click', () => openPresent(hotspot, tempContents[index]));
        gardenArea.appendChild(hotspot);
        
        presentsPool.push({ id: `present_${index}`, content: tempContents[index], opened: false });
    });

    updatePresentsLeftText();
    renderCollectedItems();
    showMessage("庭に隠されたプレゼントを探してクリックしてみましょう！", "info");
}

/**
 * Updates and displays the number of remaining unopened presents.
 */
function updatePresentsLeftText() {
    const remaining = presentsPool.filter(p => !p.opened).length;
    presentsLeftText.textContent = `残りのプレゼント箱: ${remaining}個`;
    if (remaining === 0 && collectedItems.size < totalUniqueItems) {
        showMessage("すべてのプレゼント箱を開けましたが、すべてのアイテムを集められませんでした。", "error");
    }
}

/**
 * Handles the event when a present box is clicked.
 * @param {HTMLElement} hotspotElement - The DOM element of the clicked hotspot.
 * @param {string} content - The content of the present (item name or 'miss').
 */
function openPresent(hotspotElement, content) {
    if (hotspotElement.classList.contains('opened')) {
        return;
    }

    const presentIndex = parseInt(hotspotElement.dataset.index);
    presentsPool[presentIndex].opened = true;

    hotspotElement.classList.add('opened');

    if (content === 'miss') {
        showModal({ svgContent: stoneSVG, imageAlt: "石ころ", width: '95vw', height: '95vh' });
        showMessage("残念！外れでした。", "error");
    } else {
        const item = items[content];
        showModal({ svgContent: item.svg, imageAlt: item.name, width: '95vw', height: '95vh' });

        if (!collectedItems.has(content)) {
            collectedItems.add(content);
            showMessage(`${item.name} を手に入れました！`, "success");
        } else {
            showMessage(`${item.name} を見つけました！（既に持っています）`, "info");
        }
    }

    renderCollectedItems();
    updatePresentsLeftText();
    checkGameCompletion();
}

/**
 * Checks if the game completion condition (all unique items collected) is met.
 */
function checkGameCompletion() {
    if (collectedItems.size === totalUniqueItems) {
        showModal({
            message: "おめでとうございます！すべてのアイテムが揃いました！魔法少女に変身！",
            width: '90vw',
            height: 'auto', // 高さをautoにすることで、テキストのサイズに合わせて調整されます
            isLargeMessage: true,
            onClosed: () => {
                showModal({
                    svgContent: magicalGirlSVG,
                    imageAlt: "魔法少女",
                    width: '95vw',
                    height: '95vh',
                    onClosed: () => { /* No further action */ }
                });
            }
        });

        hideMessage();

        document.querySelectorAll('.present-hotspot:not(.opened)').forEach(hotspot => {
            hotspot.classList.add('opened');
        });
    }
}

resetButton.addEventListener('click', initializeGame);

window.onload = initializeGame;
