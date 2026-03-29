// 'use strict';
// const display = document.getElementById('display');
// const displayTotal = document.getElementById('displayTotal');

// const showOnDisplay = function (digitPressed) {
//     display.value += digitPressed;
//     display.focus();
// };

// display.addEventListener('input', function () {
//     this.value = this.value.replace(/[^0-9+\-*/.]/g, '');
//     console.log(`apagado`);
// });
// const clearDisplay = function () {
//     display.value = '';
//     displayTotal.value = '';
//     display.focus();
// };

// const calculate = function () {
//     const calculations = display.value;
//     if (/[a-zA-Z]/.test(calculations)) {
//         return;
//     }
//     const tokens = calculations.split(/([+\-*/])/);
//     const valores = tokens.map(t => (isNaN(t) ? t : Number(t)));
//     let total = 0;
//     // multiplicação e divisão primeiro
//     for (let i = 0; i < valores.length; i++) {
//         if (valores[i] === '/' || valores[i] === '*') {
//             let esquerda = valores[i - 1];
//             let direita = valores[i + 1];
//             total = valores[i] === '*' ? esquerda * direita : esquerda / direita;
//             valores.splice(i - 1, 3, total);
//             console.log(valores);

//             i--;
//         }
//     }
//     // depois soma e subtração
//     for (let i = 0; i < valores.length; i++) {
//         if (valores[i] === '-' || valores[i] === '+') {
//             let esquerda = valores[i - 1];
//             let direita = valores[i + 1];
//             total = valores[i] === '-' ? esquerda - direita : esquerda + direita;
//             valores.splice(i - 1, 3, total);
//             console.log(valores);

//             i--;
//         }
//     }
//     // att o display
//     displayTotal.value = total;
//     console.log(total);
//     display.focus();
// };
// const backspace = function () {
//     display.value = display.value.slice(0, -1);
//     display.focus();
// };
