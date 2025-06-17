document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const DOM = {
        mainHeartContainer: document.getElementById('mainHeartContainer'),
        mainHeart: document.getElementById('mainHeart'),
        valentineCard: document.getElementById('valentineCard'),
        closeHeart: document.getElementById('closeHeart'),
        fallingHeartsContainer: document.createElement('div')
    };

    // Настройки анимации
    const settings = {
        heartColors: ['#ff0000', '#ff4081', '#ff1493', '#ff69b4'],
        minHeartSize: 10,
        maxHeartSize: 30,
        minFallDuration: 10,
        maxFallDuration: 20,
        heartsCount: 20,
        floatingHeartsCount: 15
    };

    // Инициализация
    function init() {
        setupFallingHearts();
        setupEventListeners();
    }

    // Настройка падающих фоновых сердечек
    function setupFallingHearts() {
        DOM.fallingHeartsContainer.className = 'falling-hearts';
        document.body.prepend(DOM.fallingHeartsContainer);
        
        for (let i = 0; i < settings.heartsCount; i++) {
            createFallingHeart(true);
        }
    }

    // Создание одного падающего сердечка
    function createFallingHeart(isInfinite = false) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart-bg';
        heart.innerHTML = '❤';
        
        // Случайные параметры
        const size = randomInRange(settings.minHeartSize, settings.maxHeartSize);
        const duration = randomInRange(settings.minFallDuration, settings.maxFallDuration);
        const color = settings.heartColors[Math.floor(Math.random() * settings.heartColors.length)];
        
        // Применение стилей
        heart.style.cssText = `
            left: ${Math.random() * 100}vw;
            font-size: ${size}px;
            color: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        DOM.fallingHeartsContainer.appendChild(heart);
        
        // Удаление после анимации (если не бесконечное)
        if (!isInfinite) {
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    }

    // Создание летающих сердечек при клике
    function createFloatingHearts() {
        for (let i = 0; i < settings.floatingHeartsCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                
                // Начальная позиция (сердечко)
                const startX = DOM.mainHeart.getBoundingClientRect().left + 30;
                const startY = DOM.mainHeart.getBoundingClientRect().top + 30;
                
                // Конечная позиция
                const endX = startX + (Math.random() * 400 - 200);
                const endY = startY + (Math.random() * 400 - 200);
                
                // Случайный цвет
                const color = settings.heartColors[Math.floor(Math.random() * settings.heartColors.length)];
                
                heart.style.cssText = `
                    left: ${startX}px;
                    top: ${startY}px;
                    background-color: ${color};
                    z-index: 100;
                `;
                
                document.body.appendChild(heart);
                
                // Анимация
                setTimeout(() => {
                    heart.style.transition = 'all 1s ease-out';
                    heart.style.left = `${endX}px`;
                    heart.style.top = `${endY}px`;
                    heart.style.opacity = '0';
                    heart.style.transform = 'rotate(45deg) scale(0.5)';
                    
                    // Удаление после анимации
                    setTimeout(() => heart.remove(), 1000);
                }, 10);
            }, i * 100);
        }
    }

    // Обработчики событий
    function setupEventListeners() {
        // Клик по главному сердечку
        DOM.mainHeart.addEventListener('click', function() {
            // Анимация исчезновения
            DOM.mainHeartContainer.style.transition = 'all 0.5s ease';
            DOM.mainHeartContainer.style.transform = 'scale(1.5)';
            DOM.mainHeartContainer.style.opacity = '0';
            
            // Показ письма
            setTimeout(() => {
                DOM.mainHeartContainer.style.display = 'none';
                DOM.valentineCard.classList.add('show');
            }, 500);
            
            // Создаем летающие сердечки
            createFloatingHearts();
        });
        
        // Клик по закрывающему сердечку
        DOM.closeHeart.addEventListener('click', function() {
            // Анимация закрытия письма
            DOM.valentineCard.classList.remove('show');
            
            // Возвращаем главное сердечко
            setTimeout(() => {
                DOM.mainHeartContainer.style.display = 'flex';
                setTimeout(() => {
                    DOM.mainHeartContainer.style.transition = 'all 0.5s ease';
                    DOM.mainHeartContainer.style.transform = 'scale(1)';
                    DOM.mainHeartContainer.style.opacity = '1';
                }, 10);
            }, 500);
        });
    }

    // Вспомогательная функция
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Запуск приложения
    init();
});