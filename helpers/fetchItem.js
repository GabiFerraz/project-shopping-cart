const fetchItem = async (idProduct) => {
  try {
    const url = `https://api.mercadolibre.com/items/${idProduct}`;
    const data = await (await fetch(url)).json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

// fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
