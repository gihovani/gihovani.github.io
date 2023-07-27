import {
    arredondarValor, criarElementoHtml,
    formataNumeroEmDinheiro, lerArquivoApartirDeUmLink, pegaTextoDoElemento,
    transformaDinheiroEmNumero
} from "../../../util/helper";

describe('Teste da função arredondarValor', () => {
    it('Deve arredondar o número 123.345 para 123.35', () => {
        const valor = arredondarValor(123.345);
        expect(valor).toEqual(123.35);
    });
    it('Deve arredondar um número inválido para 0', () => {
        const valor = arredondarValor(null);
        expect(valor).toEqual(0);
    });
});
describe('Teste da função formataNumeroEmDinheiro', () => {
    it('Deve formatar o número 123.345 para o padrão em dinheiro: 123,35', () => {
        const valor = formataNumeroEmDinheiro(123.345);
        expect(valor).toEqual('123,35');
    });

    it('Deve formatar o 0 para o padrão em dinheiro: 0,00', () => {
        const valor = formataNumeroEmDinheiro(0);
        expect(valor).toEqual('0,00');
    });
});
describe('Teste da função transformaDinheiroEmNumero', () => {
    it('Deve transforma o valor: 123,345 para o número: 123.35', () => {
        const valor = transformaDinheiroEmNumero('123,345');
        expect(valor).toEqual(123.35);
    });
});
describe('Teste da função criarElementoHtml', () => {
    it('Deve criar um Elemento HTML do tipo link: <a id="teste" class="link ativo">GG2</a>', () => {
        const link = criarElementoHtml('a', ['link', 'ativo'], [{
            nome: 'id', valor: 'test'
        }], 'GG2');
        expect(link).toBeInstanceOf(HTMLAnchorElement);
        expect(link.getAttribute('id')).toEqual('test');
        expect(link.classList.toString()).toEqual('link ativo');
        expect(link.innerText).toEqual('GG2');
    });

    it('Deve criar um Elemento HTML do tipo span: <span></span>', () => {
        const link = criarElementoHtml('span');
        expect(link).toBeInstanceOf(HTMLSpanElement);
        expect(link.innerText).toEqual(undefined);
    });
});
describe('Teste da função criarElementoHtml', () => {
    const xmlDoc = new DOMParser().parseFromString(`<?xml version="1.0"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <created_at>2023-06-20 07:00</created_at>
    <item>
      <sku>GG2</sku>
      <name>Produto GG2</name>
    </item>
  </channel>
</rss>`, 'text/xml');

    it('Deve pegar o nome do produto dentro de um elemento item no xml', () => {
        const item = xmlDoc.querySelector('item');
        const name = pegaTextoDoElemento(item, 'name');
        expect(name).toEqual('Produto GG2');
    });

    it('Deve retornar vazio quando um elemento não existe dentro do item no xml', () => {
        const item = xmlDoc.querySelector('item');
        const empty = pegaTextoDoElemento(item, 'empty');
        expect(empty).toEqual('');
    });
});
describe('Teste para lerArquivoApartirDeUmLink', () => {
    const arquivo = 'https://www.example.com/arquivo.csv';
    it('Deve chamar o callback com o conteúdo do arquivo', async () => {
        const conteudo = 'Conteúdo do arquivo CSV';
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve(conteudo),
            })
        );
        // Chama a função com o arquivo e o callback
        await lerArquivoApartirDeUmLink(arquivo, (param: string) => {
            expect(param).toEqual(conteudo);
        });
    });

    it('Deve chamar o console.error em caso de erro', async () => {
        // Simula um erro ao fazer a requisição
        global.fetch = jest.fn(() => Promise.reject('Erro ao fazer a requisição'));

        // Chama a função com o arquivo e o callback
        await lerArquivoApartirDeUmLink(arquivo, () => {
        });

        // Verifica se o console.error foi chamado com a mensagem de erro
        expect(jest.spyOn(console, 'error')
            .mockImplementation((param) => {
                expect(param).toEqual(`Erro para ler o arquivo ${arquivo}`);
            }));
    });
});
