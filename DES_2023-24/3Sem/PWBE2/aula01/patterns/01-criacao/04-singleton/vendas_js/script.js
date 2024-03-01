/*
Criação - Singleton

O padrão de projeto Singleton é usado quando você deseja ter apenas uma única instância de uma classe em todo o seu aplicativo, 
garantindo que haja apenas um ponto de acesso global para essa instância. Aqui está um exemplo de como implementar o 
padrão Singleton em JavaScript:

Classe simples chamad Venda, com três atributos, método construtor e dois métodos
*/
class Venda {

    constructor(prod, qtd, prc) {
        this.produto = prod;
        this.quantidade = qtd;
        this.preco = prc;
    }
    subtotal() {
        return this.quantidade * this.preco;
    }

    toString() {
        return this.produto + " " + this.quantidade + " " + this.preco + " " + this.subtotal();
    }
}

class Lista {
    //Um atributo ou método do tipo "static" não é instanciado (podemos utilizar como um Singleton)
    static vendas = []
}

Lista.vendas.push(new Venda("Parafuso", 10, 1.5));
Lista.vendas.push(new Venda("Porca", 10, 1.1));
Lista.vendas.push(new Venda("Arruela", 10, 1.2));
Lista.vendas.push(new Venda("Prego", 10, 1.3));

Lista.vendas.forEach(e => {
    console.log(e.toString())
});