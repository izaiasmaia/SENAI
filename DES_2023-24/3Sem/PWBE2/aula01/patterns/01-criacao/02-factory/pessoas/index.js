/*Criação - Factory

O padrão de projeto Factory é usado para encapsular a lógica de criação de objetos em uma fábrica, permitindo a 
criação de diferentes tipos de objetos sem expor a lógica de criação diretamente. Aqui está um exemplo de como usar o padrão Factory em JavaScript:
Exemplo 1 Factory (Função que retorna um objeto)
*/

class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
    obterDados() {
        console.log(`Produto: ${this.nome}, Preço: ${this.preco}`);
    }
}

class ProdutoFactory {
    criarProduto(tipo) {
        let produto;

        if (tipo === 'A') {
            produto = new Produto('Produto A', 100);
        } else if (tipo === 'B') {
            produto = new Produto('Produto B', 200);
        } else if (tipo === 'C') {
            produto = new Produto('Produto C', 300);
        }
        return produto;
    }
}

// Exemplo de uso:
const factory = new ProdutoFactory();

const productA = factory.criarProduto('A');
productA.obterDados();

const productB = factory.criarProduto('B');
productB.obterDados();

const productC = factory.criarProduto('C');
productC.obterDados();

