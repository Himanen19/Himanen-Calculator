'use strict';
const display = document.getElementById('display');
const displayTotal = document.getElementById('displayTotal');
const showOnDisplay = function (digit) {
    const ultimoChar = display.value.slice(-1);
    const operadores = ['*', '/', '+', '-'];
    if (operadores.includes(digit) && operadores.includes(ultimoChar)) {
        display.value = display.value.slice(0, -1) + digit;
    } else {
        display.value += digit;
    }
    display.focus();
};

const clearDisplay = function () {
    display.value = '';
    displayTotal.value = '';
    display.focus();
};

const calculate = function () {
    let total = 0;

    let x = display.value.replace(/[a-zA-Z]./g, '').split(/([+\-*/])/);
    const cleanValue = x.map(t => (isNaN(t) ? t : Number(t)));
    console.log(cleanValue);
    // first / and *
    for (let i = 0; i < cleanValue.length; i++) {
        if (cleanValue[i] === '*' || cleanValue[i] === '/') {
            const valueleft = cleanValue[i - 1];
            const valueright = cleanValue[i + 1];
            total = cleanValue[i] === '*' ? valueleft * valueright : valueleft / valueright;
        }
    }
    // then add and subtract
    for (let i = 0; i < cleanValue.length; i++) {
        if (cleanValue[i] === '+' || cleanValue[i] === '-') {
            const valueleft = cleanValue[i - 1];
            const valueright = cleanValue[i + 1];
            total = cleanValue[i] === '-' ? valueleft - valueright : valueleft + valueright;
        }
    }
    displayTotal.value = display.value;
    display.value = total;
    display.focus();
};

display.addEventListener('input', () => (display.value = display.value.replace(/[^0-9-+/*/]./g, '')));
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === '=') {
        calculate();
    }
});
