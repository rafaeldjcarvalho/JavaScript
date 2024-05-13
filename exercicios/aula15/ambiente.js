let num = [5, 8, 4]
num[3] = 6
num.push(7) // coloca na ultima posicao
console.log(`Nosso vetor é o ${num}`)
console.log(`O tamanho do vetor é ${num.length}`)
num.sort() // ordena o vetor
console.log(`Odernar o vetor: ${num}`)

console.log(num)
for (let pos = 0; pos < num.length; pos++) {
    console.log(`A posicao ${pos} tem o valor ${num[pos]}`)
}

// for in
for (let p in num) {
    console.log(num[p])
}
// num.indexOf() -> retorna a chave do valor
console.log(`A chave do valor 5: ${num.indexOf(5)}`)