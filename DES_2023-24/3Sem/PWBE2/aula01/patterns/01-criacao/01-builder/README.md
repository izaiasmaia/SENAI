# Criação - Builder
O padrão de projeto Builder é usado para separar a construção de um objeto complexo de sua representação final, permitindo que o mesmo processo de construção possa criar diferentes representações. 
Exemplo de como usar o padrão Builder em JavaScript:

|Criar um computardor com várias partes com algumas peças|


```javascript
//Classe Computador composta por uma lista de partes
 
class Computador {
    constructor(nome) {
        this.nome = nome
        this.partes = []
    }

    addPart(part) {
        this.partes.push(part)
    }

    listarPartes() {
        console.log(`Partes do ${this.nome}: ${this.partes.join(', ')}`)
    }
}

//Interface (Composta apenas pelas assinaturas dos métodos que serão construtores)
class InterfaceBuilder {
    criaParte1() { }
    criaParte2() { }
    criaParte3() { }
}

//Implemantação do primeiro construtor com apenas uma ferramenta
class Kit1Parte extends InterfaceBuilder {
    constructor(nome) {
        super()
        this.computador = new Computador(nome)
    }

    criaParte1() {
        this.computador.addPart('Placa de vídeo RTX 3060')
    }

    getComputador() {
        return this.computador
    }
}

//Implemantação do segundo construtor com duas ferramenta
class Kit2Partes extends InterfaceBuilder {
    constructor(nome) {
        super()
        this.computador = new Computador(nome)
    }

    criaParte1() {
        this.computador.addPart('Placa de vídeo RTX 3060')
    }

    criaParte2() {
        this.computador.addPart('Memória RAM de 16 GB')
    }

    getComputador() {
        return this.computador
    }
}

// Implemantação do terceiro construtor com três ferramenta
class Kit3Partes extends InterfaceBuilder {
    constructor(nome) {
        super()
        this.computador = new Computador(nome)
    }

    criaParte1() { 
        this.computador.addPart('Placa de víde RTX 3060') 
    }

    criaParte2() {
        this.computador.addPart('Memória RAM 32 GB')
    }

    criaParte3() {
        this.computador.addPart('Pocessador Intel Core I9')
    }

    getComputador() {
        return this.computador
    }
}

//Classe que efetiva o Pattern Builder
class Construtor {
    constructor() {
        this.builder = null
    }

    setBuilder(builder) {
        this.builder = builder
    }

    constroiUmaParte() {
        this.builder.criaParte1()
    }

    constroiTodasPartes() {
        this.builder.criaParte1()
        this.builder.criaParte2()
        this.builder.criaParte3()
    }
}

// Exemplo de uso
// Criar o objeto construtor e nomear cada um dos três Kits
const construtor = new Construtor();
const builder1 = new Kit1Parte("Kit - Peças básicas");
const builder2 = new Kit2Partes("Kit - Peças intermediarias");
const builder3 = new Kit3Partes("Kit - Peças completo");

//Construir os três Kites
construtor.setBuilder(builder1);
construtor.constroiUmaParte();
const computador1 = builder1.getComputador();

construtor.setBuilder(builder2);
construtor.constroiTodasPartes();
const computador2 = builder2.getComputador();

construtor.setBuilder(builder3);
construtor.constroiTodasPartes();
const computador3 = builder3.getComputador();

//Ver resultados
computador1.listarPartes();
computador2.listarPartes();
computador3.listarPartes();
 
```

Neste exemplo, **Computador** representa o objeto complexo que será construído, **InterfaceBuilder** define a interface para a construção de diferentes partes do objeto complexo, **kit1Parte, kit2Partes, kit3Partes** implementam a interface de **InterfaceBuilder** e constroem diferentes partes do objeto complexo, **Construtor** controla o processo de construção e cria diferentes representações do objeto complexo, dependendo do Builder selecionado.

Para usar o padrão Builder, primeiro um **Construtor** deve ser criado e configurado com o Builder desejado. Em seguida, o **Construtor** usa o Builder para construir diferentes partes do objeto complexo, chamando os métodos de construção necessários. Quando a construção estiver concluída, o Builder retorna o objeto complexo final usando o método **getProduto()**.