// スコア表示要素とボタン要素を取得
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const resetButton = document.getElementById('resetButton');

let score = 0; // 現在のスコアを保持する変数

// クリックボタンが押されたときの処理
clickButton.addEventListener('click', () => {
    score++; // スコアを1増やす
    scoreDisplay.textContent = score; // スコア表示を更新
    // ボタンがクリックされたときに視覚的なフィードバックを与える（例：一時的に色を変えるなど）
    clickButton.classList.add('scale-95'); // 一時的に縮小
    setTimeout(() => {
        clickButton.classList.remove('scale-95'); // 元に戻す
    }, 100);
});

// リセットボタンが押されたときの処理
resetButton.addEventListener('click', () => {
    score = 0; // スコアを0にリセット
    scoreDisplay.textContent = score; // スコア表示を更新
    // リセットボタンがクリックされたときに視覚的なフィードバックを与える
    resetButton.classList.add('bg-gray-400'); // 一時的に色を変える
    setTimeout(() => {
        resetButton.classList.remove('bg-gray-400'); // 元に戻す
    }, 100);
});

// 初期表示のスコアを設定
scoreDisplay.textContent = score;
