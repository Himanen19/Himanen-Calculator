'use strict';
const display = document.getElementById('display');
const displayTotal = document.getElementById('displayTotal');
const allMath = document.getElementById('allMath');
let allOperations = [];
const block2OperationsInaRow = function (digit) {
    const ultimoChar = display.value.slice(-1);
    const operadores = ['*', '/', '+', '-'];
    if (display.value === '' && operadores.includes(digit)) {
        return false;
    }
    if (operadores.includes(digit) && operadores.includes(ultimoChar)) {
        display.value = display.value.slice(0, -1) + digit;
    } else {
        display.value += digit;
    }
    return true;
};
const showOnDisplay = function (digit) {
    // impedir 2 operadores seguidos
    block2OperationsInaRow(digit);

    display.focus();
};

const clearDisplay = function () {
    display.value = '';
    displayTotal.value = '';
    allMath.value = '';
    display.focus();
};

const calculate = function () {
    let total = 0;
    let x = display.value.replace(/[a-zA-Z]./g, '').split(/([+\-*/])/);
    const cleanValue = x.map(t => (isNaN(t) ? t : Number(t)));
    allOperations = [];
    // first / and *
    for (let i = 0; i < cleanValue.length; i++) {
        if (cleanValue[i] === '*' || cleanValue[i] === '/') {
            const valueleft = cleanValue[i - 1];
            const valueright = cleanValue[i + 1];
            if (cleanValue[i] === '/' && cleanValue[i + 1] === 0) {
                return (display.value = `CAN'T DIVIDE BY 0`);
            }
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
        i % 2 ? (novoHistorico += `= ${allOperations[i]})`) : (novoHistorico += `(${allOperations[i]} `);
    }
    console.log(novoHistorico.length);

    novoHistorico.length > 41 ? (allMath.value = `...${novoHistorico.slice(-38)}`) : (allMath.value = novoHistorico);

    displayTotal.value = display.value;
    display.value = Number(total.toFixed(12));
    display.focus();
};

display.addEventListener('input', () => (display.value = display.value.replace(/[^0-9-+/*./]/g, '')));
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    const operadores = ['*', '/', '+', '-'];

    if (operadores.includes(event.key)) {
        event.preventDefault();
        block2OperationsInaRow(event.key);
    }
});
