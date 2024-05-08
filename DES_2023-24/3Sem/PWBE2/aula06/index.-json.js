// const { error, log } = require('console');
const fs = require('fs');
const xml2js = require('xml2js'); // Biblioteca utilizada na leitura e conversão do XML


// Função para fazer a leitura do arquivo XML, como parâmetros temos o caminho do arquivo e a codificação que é setada no momento da declaração
const readFileXML = (filePath, encoding = 'utf-8') => {
    const promisseCallback = (resolve, reject) => {
        // Utilizando a biblioteca File System faz a leitura do arquivo no caminho informado
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) { // Verifica possíveis erros na leitura do arquivo
                reject(err);
                return;
            }
            try {
                // Converte em JSON o XML recebido
                xml2js.parseString(data, (parseErr, result) => {
                    if (parseErr) {
                        console.error('Erro ao converter XML para JSON:', parseErr);
                        return;
                    }

                    // Função para converter valores de array para valores únicos
                    const convertArrayValues = (obj) => {

                        for (const key in obj) {
                            if (Array.isArray(obj[key]) && obj[key].length === 1) {
                                obj[key] = obj[key][0];
                            }
                            if (typeof obj[key] === 'object') {
                                convertArrayValues(obj[key]);
                            }
                        }
                    };

                    
                    // Convertendo valores de array para valores únicos
                    convertArrayValues(result);
                    // const obj = JSON.stringify(result)
                    
                    resolve(result);
                });
                // Converte o arquivo JSON para Javascript Object
                // const object = JSON.parse(data);

            } catch (e) {
                reject(e);
            }
        })
    }
    return new Promise(promisseCallback);
}
// readFileXML('cliente.xml').then(console.log).catch(console.error);
// Realiza a chamada da função para fazer a leitura do XML

// readFileXML('cliente.xml').then((res) => {
//     // Realiza a desestruturação do objeto retornado
//     const { dados_clientes: { cliente: { nome, data_nasc, cpf, telefones, enderecos } } } = res;
//     console.log(nome, data_nasc, cpf, telefones, enderecos);
// });


// const convertArrayValues = (obj) => {
//     // Esse loop percorre todas as chaves do objeto. A cada iteração, a variável key contém o nome da chave atual.
//     for (const key in obj) {
//         // Esta condição verifica se o valor associado à chave atual (obj[key]) é um array e se o comprimento desse array é igual a 1. 
//         // Isso significa que temos um array com apenas um elemento.
//         if (Array.isArray(obj[key]) && obj[key].length === 1) {
//             // Se a condição for verdadeira, isso significa que temos um array com apenas um elemento. Portanto, 
//             // atribuímos o valor desse único elemento de volta à mesma chave no objeto, substituindo o array.
//             obj[key] = obj[key][0];
//         }
//         if (typeof obj[key] === 'object') {
//             convertArrayValues(obj[key]);
//         }
//     }
// };


// Função para realizar a leitura do arquivo JSON
const readFileJSON = (filePath, encoding = 'utf-8') => {
    const promisseCallback = (resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                // Converte o arquivo JSON para Javascript Object
                const object = JSON.parse(data);
                resolve(object);
            } catch (e) {
                reject(e);
            }
        })
    }
    return new Promise(promisseCallback);
}

readFileJSON('cliente.json').then(console.log).catch(console.error);

