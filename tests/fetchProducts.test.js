require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Teste se a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const actual = await fetchProducts('computador');
    expect(actual).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const actual = await fetchProducts();
    const returnError = new Error('You must provide an url');
    expect(actual).toEqual(returnError);
  });
});
