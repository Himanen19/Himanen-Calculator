'use strict';
const display = document.getElementById('display');
const displayTotal = document.getElementById('displayTotal');
const allMath = document.getElementById('allMath');
let allOperations = [];
const showOnDisplay = function (digit) {
    const ultimoChar = display.value.slice(-1);
    // impedir 2 operadores seguidos
    const operadores = ['*', '/', '+', '-'];
    if (display.value === '' && operadores.includes(digit)) {
        return;
    }
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
    allOperations = [];
    // first / and *
    // cleanValue.forEach((value, index) => {
    //     if (value === '*' || value === '/') {
    //         console.log(value);

    //         const valueleft = cleanValue[index - 1];
    //         const valueright = cleanValue[index + 1];
    //         total = value === '*' ? valueleft * valueright : valueleft / valueright;

    //         allOperations.push(display.value);

    //         allOperations.push(total);
    //         console.log(allOperations);

    //         cleanValue.splice(index - 1, 3, total);
    //         index--;
    //     }
    // });
    for (let i = 0; i < cleanValue.length; i++) {
        if (cleanValue[i] === '*' || cleanValue[i] === '/') {
            const valueleft = cleanValue[i - 1];
            const valueright = cleanValue[i + 1];
            total = cleanValue[i] === '*' ? valueleft * valueright : valueleft / valueright;
            allOperations.push(display.value);

            allOperations.push(total);
            console.log(allOperations);

            cleanValue.splice(i - 1, 3, total);
            i--;
        }
    }
    // then add and subtract
    for (let i = 0; i < cleanValue.length; i++) {
        if (cleanValue[i] === '+' || cleanValue[i] === '-') {
            const valueleft = cleanValue[i - 1];
            const valueright = cleanValue[i + 1];
            total = cleanValue[i] === '-' ? valueleft - valueright : valueleft + valueright;
            allOperations.push(display.value);
            allOperations.push(total);
            cleanValue.splice(i - 1, 3, total);
            i--;
        }
    }
    console.log(allOperations);

    let novoHistorico = allMath.value;
    for (let i = 0; i < allOperations.length; i++) {
        i % 2 ? (novoHistorico += `= ${allOperations[i]})`) : (novoHistorico += `( ${allOperations[i]} `);
    }
    console.log(novoHistorico.length);

    novoHistorico.length > 50 ? (novoHistorico = novoHistorico.slice(-47)) : (novoHistorico = novoHistorico);

    allMath.value = novoHistorico;
    displayTotal.value = display.value;
    display.value = Number(total.toFixed(12));
    display.focus();
};

display.addEventListener('input', () => (display.value = display.value.replace(/[^0-9-+/*/]./g, '')));
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === '=') {
        calculate();
    }
});
