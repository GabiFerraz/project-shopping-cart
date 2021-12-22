const fetchProducts = async (product) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const data = await (await fetch(url)).json();
    // console.log(data.results);
    return data;
  } catch (error) {
    return error;
  }
};

// fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
