import {
    validarCPF,
    validarDataDeNascimento,
    validarTelefone,
    validarEmail,
    validarCEP,
    validarUF,
    validarBandeiraCartaoDeCredito,
    validarCartaoDeCredito,
} from '../../../util/validacoes';

describe('Testes da função validarCPF', () => {
    it('Deve retornar true para um número de CPF válido', () => {
        expect(validarCPF('123.456.789-09')).toBe(true);
    });
    it('Deve retornar true para um número de CPF válido não formatado', () => {
        expect(validarCPF('12345678909')).toBe(true);
    });
    it('Deve calcular corretamente o digitoVerificador2 quando o resto é menor que 2', () => {
        expect(validarCPF('379.689.498-40')).toBe(true);
    });
    it('Deve retornar false para um número de CPF inválido', () => {
        expect(validarCPF('123.456.789-01')).toBe(false);
    });
    it('Deve retornar false se a quantidade de dígitos do CPF for diferente de 11', () => {
        expect(validarCPF('123.456.789')).toBe(false);
    });
    it('Deve retornar false se os dígitos do cpf forem todos iguais', () => {
        expect(validarCPF('111.111.111-11')).toBe(false);
    });
    it('Deve retornar false se o primeiro dígito verificador for inválido', () => {
        expect(validarCPF('111.111.111-01')).toBe(false);
    });
});
describe('Testes da função validarDataDeNascimento', () => {
    it('Deve retornar true para uma Data de Nascimento válida', () => {
        expect(validarDataDeNascimento('28/02/1990')).toBe(true);
    });

    it('Deve retornar false para uma Data de Nascimento inválida', () => {
        expect(validarDataDeNascimento('31/02/2000')).toBe(false);
    });

    it('Deve retornar false para uma Data de Nascimento maior do que a data atual', () => {
        expect(validarDataDeNascimento('01/01/3000')).toBe(false);
    });

    it('Deve retornar false para uma Data de Nascimento com o formato inválido', () => {
        expect(validarDataDeNascimento('01/01/30')).toBe(false);
    });
});
describe('Testes da função validarTelefone', () => {
    it('Deve retornar true para um número de telefone válido', () => {
        expect(validarTelefone('(11) 99999-9999')).toBe(true);
    });

    it('Deve retornar true para número de telefone válido não formatado', () => {
        expect(validarTelefone('11999999999')).toBe(true);
    });

    it('Deve retornar false para número de telefone inválido', () => {
        expect(validarTelefone('12345')).toBe(false);
    });
});
describe('Testes da função validarEmail', () => {
    it('Deve retornar true um texto com o e-mail válido', () => {
        expect(validarEmail('teste@example.com')).toBe(true);
    });

    it('Deve retornar false para um texto com o e-mail inválido', () => {
        expect(validarEmail('teste@example')).toBe(false);
    });
});
describe('Testes da função validarCEP', () => {
    it('Deve retornar true para um número de CEP válido', () => {
        expect(validarCEP('12345-678')).toBe(true);
    });
    it('Deve retornar true para um número de CEP válido não formatado', () => {
        expect(validarCEP('12345678')).toBe(true);
    });

    it('validarCEP deve retornar false para CEP inválido', () => {
        expect(validarCEP('1234')).toBe(false);
    });
});
describe('Testes da função validarUF', () => {
    it('Deve retornar true para UF válida', () => {
        expect(validarUF('SP')).toBe(true);
    });
    it('Deve retornar true para UF válida minúsculo', () => {
        expect(validarUF('sc')).toBe(true);
    });

    it('Deve retornar false para UF inválida', () => {
        expect(validarUF('XY')).toBe(false);
    });
});
describe('Testes da função validarBandeiraCartaoDeCredito', () => {
    it('Deve retornar true para bandeira de cartão de crédito válida', () => {
        expect(validarBandeiraCartaoDeCredito('VISA')).toBe(true);
    });

    it('Deve retornar false para bandeira de cartão de crédito inválida', () => {
        expect(validarBandeiraCartaoDeCredito('XXX')).toBe(false);
    });
});
describe('Testes da função validarCartaoDeCredito', () => {
    it('Deve retornar true para um número de cartão válido', () => {
        expect(validarCartaoDeCredito('4111 1111 1111 1111')).toBe(true);
    });

    it('Deve retornar true para um número de cartão válido não formatado', () => {
        expect(validarCartaoDeCredito('4111111111111111')).toBe(true);
    });

    it('Deve retornar false para um número de cartão inválido', () => {
        expect(validarCartaoDeCredito('1234 5678 9876 5432')).toBe(false);
    });

    it('Deve retornar false para um número de cartão com menos de 13 dígitos', () => {
        expect(validarCartaoDeCredito('123456789876')).toBe(false);
    });
});
