

export default class Cliente {

    constructor(pNome, pDataNasc) {
        this.nome = nome;
        this.data_nasc = pDataNasc;
    }

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value }

    get Data_nasc() { return this.data_nasc; }
    set Data_nasc(value) {
        this.data_nasc = value;
    }

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
}