let display = document.querySelector('div#result')

function limpar() {
    display.textContent = '0'
}

function deletar() {
    if (display.textContent.length == 1) {
        display.textContent = '0'
    } else {
        display.textContent = display.textContent.slice(0, -1)
    }
}

function addNumero(numero) {
    if (display.textContent === '0' && numero !== '.') {
        display.textContent = numero
    } else {
        display.textContent += numero
    }
}

function operacao(operador) {
    let ultnum = display.textContent.slice(-1)
    if ('+-*/'.includes(ultnum)) {
        display.textContent = display.textContent.slice(0, -1) + operador
    } else {
        display.textContent += operador
    }
}

function addParenteses(par) {
    if (display.textContent === '0' && par === '('){
        display.textContent = par
    } else {
        display.textContent += par
    }
}

function resultado() {
    try{
        display.textContent = eval(display.textContent)
    } catch {
        display.textContent = 'Erro'
    }
}