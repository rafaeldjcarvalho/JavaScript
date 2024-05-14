let num = []
let cont = 0
let maior = 0
let menor = 0
let media = 0
let res = document.getElementById('res')
let valor = document.getElementById('txtnum')
let sel = document.querySelector('select#selnum')

function isNumero(v) {
    if (Number(v) >= 1 && Number(v) <= 100) {
        return true
    } else {
        return false
    }
}

function inLista (v, l) {
    if (l.indexOf(Number(v)) != -1) {
        return true
    } else {
        return false
    }
}

function adicionar() {
    if (isNumero(valor.value) && !inLista(valor.value, num)) {
        // colocar no array
        num.push(valor.value)

        let item = document.createElement('option')
        cont++
        item.text = `Valor ${valor.value} adicionado.`
        item.value = `sel${cont}`
        sel.appendChild(item)

        // remover dados do finalizar
        res.innerHTML = ''
    } else {
        window.alert('Número inválido ou já encontrado na lista')
    }
}

function finalizar() {
    if (num.length == 0) {
        window.alert('Adicione valores antes de finalizar.')
    } else {
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement('p')
        let p4 = document.createElement('p')
        let p5 = document.createElement('p')

        p1.innerHTML = `Ao todo, temos ${num.length} números cadastrados.`
        maiorMenorNum()
        p2.innerHTML = `O maior valor informado foi ${maior}.`
        p3.innerHTML = `O menor valor informado foi ${menor}.`
        let s = somarArray()
        p4.innerHTML = `Somando todos os valores, temos ${s}.`
        mediaArray()
        p5.innerHTML = `A média dos valores digitados é ${media}.`

        res.appendChild(p1)
        res.appendChild(p2)
        res.appendChild(p3)
        res.appendChild(p4)
        res.appendChild(p5)
    }
}

function maiorMenorNum() {
    maior = num[0]
    menor = num[0]
    if (num.length > 1) {
        for (let c = 0; c < num.length; c++) {
            if (num[c] > maior) {
                maior = num[c]
            } else if (num[c] < menor) {
                menor = num[c]
            }
        }
    }
}

function somarArray() {
    let soma = 0
    for (let c = 0; c < num.length; c++) {
        soma += num[c]
    }
    return soma
}

function mediaArray() {
    media = somarArray() / num.length
}

console.log(num)
