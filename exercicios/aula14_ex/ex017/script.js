function gerarTabuada() {
    var txtnum = document.getElementById('txtn').value
    var tab = document.getElementById('seltab')

    if (txtnum.length == 0) {
        window.alert('Por favor, Digite um número.')
    } else {
        var num = Number(txtnum)
        tab.innerHTML = ''
        for (var c = 1; c <= 10; c++) {
            var item = document.createElement('option')
            item.text = `${num} x ${c} = ${num*c}`
            item.value = `tab${c}`
            tab.appendChild(item)
        }
    }    
}