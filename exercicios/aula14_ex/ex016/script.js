function contar() {
    var tini = document.getElementById('txti')
    var tfim = document.getElementById('txtf')
    var tpas = document.getElementById('txtp')
    var res = document.querySelector('div#res')
    if (tini.value.length == 0 || tfim.value.length == 0 || tpas.value.length == 0) {
        res.innerHTML = 'Impossível contar!'
    } else { 
        res.innerHTML = 'Contando: <br>'
        var i = Number(tini.value)
        var f = Number(tfim.value)
        var p = Number(tpas.value)

        if (p == 0) {
            window.alert('Passo inválido! Considerando PASSO 1.')
            p = 1
        }

        if (i < f) {  // contagem crescente
            for (var c = i; c <= f; c += p) {
                res.innerHTML += `${c} \u{1F449} `
            }
        } else {  // contagem decrescente
            for (var c = i; c >= f; c -= p) {
                res.innerHTML += `${c} \u{1F449} `
            }
        }
        
        res.innerHTML += `\u{1F3C1}`
    }
    
}