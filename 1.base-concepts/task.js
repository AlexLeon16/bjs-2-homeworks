"use strict";

/**
 * Решает квадратное уравнение ax² + bx + c = 0
 * @param {number} a - коэффициент a
 * @param {number} b - коэффициент b
 * @param {number} c - коэффициент c
 * @returns {number[]} - массив корней (пустой, если корней нет)
 */
function solveEquation(a, b, c) {
    const discriminant = b ** 2 - 4 * a * c;

    if (discriminant < 0) {
        return [];
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        return [root];
    } else {
        const sqrtD = Math.sqrt(discriminant);
        const root1 = (-b + sqrtD) / (2 * a);
        const root2 = (-b - sqrtD) / (2 * a);
        return [root1, root2];
    }
}

/**
 * Рассчитывает общую сумму выплат по ипотеке
 * @param {number|string} percent - процентная ставка (от 0 до 100)
 * @param {number|string} contribution - первоначальный взнос
 * @param {number|string} amount - сумма кредита
 * @param {number|string} countMonths - срок кредита в месяцах
 * @returns {number|false} - общая сумма выплат (без первоначального взноса) или false при некорректных данных
 */
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    // Преобразование аргументов в числа
    const p = parseFloat(percent);
    const c = parseFloat(contribution);
    const a = parseFloat(amount);
    const n = parseFloat(countMonths);

    // Проверка на корректность (если хотя бы один аргумент не число)
    if (isNaN(p) || isNaN(c) || isNaN(a) || isNaN(n)) {
        return false;
    }

    // Тело кредита (сумма, которую нужно вернуть банку)
    const loanBody = a - c;
    if (loanBody <= 0) {
        return 0;
    }

    // Месячная процентная ставка (из годовой)
    const monthlyRate = p / 100 / 12;

    // Ежемесячный платёж по формуле аннуитета
    const payment = loanBody * (monthlyRate + (monthlyRate / (Math.pow(1 + monthlyRate, n) - 1)));

    // Общая сумма выплат (все ежемесячные платежи)
    const total = payment * n;

    // Округление до двух знаков после запятой
    return Math.round(total * 100) / 100;
}

// Экспорт функций для тестов (если требуется, но в браузерной среде можно и без)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { solveEquation, calculateTotalMortgage };
}