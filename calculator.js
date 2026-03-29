'use strict';

// const btn1 = document.getElementById('btn_1');
// const btn2 = document.getElementById('btn_2');
// const btn3 = document.getElementById('btn_3');
// const btn4 = document.getElementById('btn_4');
// const btn5 = document.getElementById('btn_5');
// const btn6 = document.getElementById('btn_6');
// const btn7 = document.getElementById('btn_7');
// const btn8 = document.getElementById('btn_8');
// const btn9 = document.getElementById('btn_9');
// const btn0 = document.getElementById('btn_0');
// const btnMultiplica = document.getElementById('btn_X');
// const btnDivide = document.getElementById('btn_/');
// const btnAdd = document.getElementById('btn_+');
// const btnSubt = document.getElementById('btn_-');
// const btnPonto = document.getElementById('btn_.');
const display = document.getElementById('display');
const displayTotal = document.getElementById('displayTotal');
let currentValue = 0;

const showOnDisplay = function (digitPressed) {
    display.value += digitPressed;
};

const clearDisplay = function () {
    display.value = '';
    displayTotal.value = '';
};

const calculate = function () {
    const calculations = display.value;
    const tokens = calculations.split(/([+\-*/])/);
    let valores = tokens.map(t => (isNaN(t) ? t : Number(t)));
    console.log(tokens);
    console.log(valores);
    let total = 0;
    for (let i = 0; i < valores.length; i++) {
        if (valores[i] === '/' || valores[i] === '*') {
            let esquerda = valores[i - 1];
            let direita = valores[i + 1];
            total = valores[i] === '*' ? esquerda * direita : esquerda / direita;
            valores.splice(i - 1, 3, total);
            console.log(valores);

            i--;
        } else if (valores[i] === '-' || valores[i] === '+') {
            const esquerda = valores[i - 1];
            const direita = valores[i + 1];
            total = valores[i] === '-' ? esquerda - direita : direita + esquerda;
            valores.splice(i - 1, 3, total);
            console.log(valores);
            i--;
        }
    }
    console.log(total);
};
