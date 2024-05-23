class Cliente {

    constructor(pCliente) {
        // Criação do construtor, repare que foi passado um objeto para o construtor, suas propriedades são lidas na criação do construtor
        this.id = (pCliente.id !== null || pCliente.id > 0) ? this.id = pCliente.id : this.id = null;
        this.nome = pCliente.nome;
        this.DataConvert(pCliente.data_nasc);
        this.cpf = pCliente.cpf;
        this.sexo = pCliente.sexo;
        this.estado_civil = pCliente.estado_civil;
        this.email = pCliente.email;
        this.telefone = pCliente.telefone;
    }

    // Métodos acessores das probriedades (gets e sets)
    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value }

    get Data_nasc() { return this.data_nasc; }
    set Data_nasc(value) {
        this.data_nasc = value;
    }
    get Cpf() { return this.cpf; }
    set Cpf(value) { this.cpf = value }

    get Sexo() { return this.sexo; }
    set Sexo(value) { this.sexo = value }

    get Estado_Civil() { return this.estado_civil; }
    set Estado_Civil(value) { this.estado_civil = value }

    get Email() { return this.email; }
    set Email(value) { this.email = value }

    get Telefone() { return this.telefone; }
    set Telefone(value) { this.telefone = value }


    /**
     * Função utilizada para calcular idade com base na data informada e a data atual (momento que verificado)
     * @returns diferença do cálculo da data informada para a data atual
     */
    calcularIdade() {
        if (this.nascimento == undefined) return 0;
        let hoje = new Date();
        let difAno = hoje.getFullYear() - this.nascimento.getFullYear();
        console.log(difAno);
        let difMes = hoje.getMonth() - this.nascimento.getMonth();
        console.log(difMes);
        let difDia = hoje.getDate() - this.nascimento.getDate();
        console.log(difDia);
        if (difMes < 0 || (difMes == 0 && difDia < 0)) {
            difAno--;
        }
        return difAno;
    }

    /**
     * Converte a data informada no padrão brasileiro (dd/mm/aaaa) para o padrão americano (yyyy-mm-dd)
     * @param {string} value 
     */
    DataConvert(value) {
        let [dia, mes, ano] = value.split('/'); //       19/01/2002
        let dataFormatada = `${ano}-${mes}-${dia}`;
        this.data_nasc = dataFormatada;
    }


    /**
     * Valida os dados obrigatórios retornado um boolean
     * @returns boolean
     */
    validarCampos() {

        return (
            this.nome &&
            this.data_nasc &&
            this.cpf &&
            this.sexo &&
            this.estado_civil &&
            this.email &&
            this.telefone
        );
    }

    /**
     * Valida o CPF retornado um valor boolean
     * @returns boolean
     */
    validaCpf() {
        // Remover caracteres especiais do CPF
        let value = this.cpf.replace(/[.-]/g, '');

        // Verificar se o CPF tem 11 dígitos, caso negativo, retorna false
        if (value.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais, caso positivo, retorna false
        if (/^(\d)\1{10}$/.test(value)) {
            return false;
        }

        // Inicia o cálculo para avaliar se o número informado é um CPF válido

        // Calcular o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(value.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o primeiro dígito verificador está correto
        if (digitoVerificador1 !== parseInt(value.charAt(9))) {
            return false;
        }

        // Calcular o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(value.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o segundo dígito verificador está correto
        if (digitoVerificador2 !== parseInt(value.charAt(10))) {
            return false;
        }
        this.Cpf = value;
        // CPF válido
        return true;
    }
}

export default Cliente;