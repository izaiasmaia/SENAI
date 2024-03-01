/*
Criação - Prototype

O padrão de projeto Prototype é usado para criar objetos baseados em um protótipo existente, clonando o protótipo em vez 
de criar novas instâncias do zero. Isso permite criar novos objetos com eficiência, evitando a necessidade de recriar a 
estrutura e os dados do objeto original. Aqui está um exemplo de como usar o padrão Prototype em JavaScript:

Problema => Criar ou clonar objetos a partir de um protótipo.
*/

class Livro {

    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    toString() {
        return this.id + " " + this.nome;
    }
}

class Livraria {
    livros = [];

    constructor(nome){
        this.nome = nome;
        this.prototipo();
    }

    prototipo() {
        for (let i = 0; i < 10; i++)
            this.livros.push(new Livro(i + 1, "Livro"));
    }

    toString() {
        return this.nome + " " + this.livros;
    }
}

const livraria1 = new Livraria("Saraiva:");
const livraria2 = new Livraria("Nobel");
const livraria3 = new Livraria("Cultura");
livraria1.toString();
livraria2.toString();
livraria3.toString();

console.log(livraria1.toString())
console.log(livraria2.toString())
console.log(livraria3.toString())