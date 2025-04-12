const wheel = document.querySelector('.wheel');
const spinButton = document.getElementById('spin-button');
const resultDiv = document.getElementById('result');
const segments = document.querySelectorAll('.segment');

let spinning = false;

spinButton.addEventListener('click', () => {
    if (spinning) return; // Предотвращаем повторные вращения

    spinning = true;
    resultDiv.textContent = ''; // Очищаем предыдущий результат

    const deg = 360 * 10 + Math.random() * 360; // Случайное количество оборотов + доп. угол
    wheel.style.transform = `rotate(${deg}deg)`;

    wheel.addEventListener('transitionend', () => {
        spinning = false;
        wheel.style.transition = 'none'; // Отключаем transition для быстрого сброса
        const actualDeg = deg % 360; // Получаем фактический угол остановки в пределах 360 градусов
        const winningSegment = getWinningSegment(actualDeg);
        resultDiv.textContent = `Вы выиграли: ${winningSegment.querySelector('.text').textContent}!`;
        wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Возвращаем transition
    }, { once: true }); // Слушаем transitionend только один раз
});

function getWinningSegment(degrees) {
    const segmentCount = segments.length;
    const segmentDegrees = 360 / segmentCount;

    // Вращение колеса происходит против часовой стрелки, поэтому нужно немного скорректировать углы
    let adjustedDegrees = (360 - degrees) % 360; // Инвертируем угол и берем по модулю
    if (adjustedDegrees < 0) adjustedDegrees += 360; // Убеждаемся, что угол положительный

    let winningIndex = Math.floor(adjustedDegrees / segmentDegrees);

    return segments[winningIndex];
}
