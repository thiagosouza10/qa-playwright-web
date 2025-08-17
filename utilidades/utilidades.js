const faker = require('faker-br')

class Utilidades {

    async gerarDadosDoUsuario() {
        const cpf = faker.br.cpf()
        const nomeCompleto = `${faker.name.firstName()} ${faker.name.lastName()}`
        const email = faker.internet.email()
        // Telefone está sendo gerado dessa forma para poder mostrar array no projeto com alguns DDD
        const dddsValidos = ['11', '21', '31', '41', '48', '61']
        const dddEstado = faker.random.arrayElement(dddsValidos)
        const numeroTelefone = faker.random.number({ min: 10000000, max: 99999999 })
        const telefone = `(${dddEstado})9${numeroTelefone}`
        return {
            cpf,
            nomeCompleto,
            email,
            telefone
        }
    }

    async gerarDadosEndereco() {
        const cep = faker.address.zipCodeValidByState()
        //A função match() retorna um array contendo todas as correspondências encontradas
        // e o método join('') combina todos os dígitos encontrados em uma única string, 
        // eliminando quaisquer espaços ou outros caracteres não numéricos.
        const numero = faker.address.streetAddress().match(/\d+/g).join('')
        const complemento = `Apto: ${faker.random.number({ min: 1, max: 300 })} Bloco: ${faker.random.number({ min: 1, max: 2 })}`
        return {
            cep,
            numero,
            complemento
        }
    }
}

export default new Utilidades()