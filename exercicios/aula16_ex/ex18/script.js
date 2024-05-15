let num = []
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
        num.push(Number(valor.value))

        let item = document.createElement('option')
        item.text = `Valor ${valor.value} adicionado.`
        sel.appendChild(item)

        // remover dados do finalizar
        res.innerHTML = ''
    } else {
        window.alert('Número inválido ou já encontrado na lista')
    }
    valor.value = ''
    valor.focus()
}

function finalizar() {
    if (num.length == 0) {
        window.alert('Adicione valores antes de finalizar.')
    } else {
        let tot = num.length
        let maior = num[0]
        let menor = num[0]
        let soma = 0
        let media = 0
        for (let pos in num) {
            soma += num[pos]
            if (num[pos] > maior) {
                maior = num[pos]
            } else if (num[pos] < menor) {
                menor = num[pos]
            }
        }
        media = soma / tot
        res.innerHTML = ''
        res.innerHTML += `<p>Ao todo, temos ${num.length} números cadastrados.</p>`
        res.innerHTML += `<p>O maior valor informado foi ${maior}.</p>`
        res.innerHTML += `<p>O menor valor informado foi ${menor}.</p>`
        res.innerHTML += `<p>Somando todos os valores, temos ${soma}.</p>`
        res.innerHTML += `<p>A média dos valores digitados é ${media}.</p>`

    }
}
