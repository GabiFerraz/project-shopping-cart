const classOlPai = '.cart__items';
const subtotal = document.querySelector('.total-price');
let preco = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const subPriceTotal = (valor) => {
  preco -= valor;
  subtotal.innerText = `${preco}`;
  localStorage.setItem('subtotal', preco);
};

function cartItemClickListener(event, salePrice) {
  event.target.remove();
  const olPai = document.querySelector(classOlPai);
  subPriceTotal(salePrice);
  saveCartItems(olPai.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event, salePrice);
  });
  return li;
}

const newEventListener = () => {
  const liAll = document.querySelectorAll('.cart__item');
  liAll.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};

const priceTotal = (valor) => {
  preco += valor;
  subtotal.innerText = `${preco}`;
  localStorage.setItem('subtotal', preco);
};

const addCart = async (sku) => {
  const { id, title, price } = await fetchItem(sku);
  const olPai = document.querySelector(classOlPai);
  const li = createCartItemElement({ sku: id, name: title, salePrice: price });
  olPai.appendChild(li);
  priceTotal(price);
  saveCartItems(olPai.innerHTML);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', () => {
    addCart(sku);
  });

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const products = async () => {
  const { results } = await fetchProducts('computador');
  const sectionPai = document.querySelector('.items');
  results.forEach(({ id, title, thumbnail }) => {
    const section = createProductItemElement({ sku: id, name: title, image: thumbnail });
    sectionPai.appendChild(section);
  });
};

const deleteCart = () => {
  const button = document.querySelector('.empty-cart');
  const olPai = document.querySelector(classOlPai);
  button.addEventListener('click', () => {
    olPai.innerHTML = '';
    localStorage.clear();
    subtotal.innerText = '0';
    preco = 0;
    localStorage.setItem('subtotal', preco);
  });
};

const loading = () => {
  const firstSection = document.querySelector('.container');
  const load = document.createElement('div');
  load.className = 'loading';
  load.innerText = 'carregando...';
  firstSection.appendChild(load);
};

const remoLoading = () => {
  const load = document.querySelector('.loading');
  load.remove();
};

const priceLS = () => {
  if (localStorage.getItem('subtotal')) {
    preco = JSON.parse(localStorage.getItem('subtotal'));
    subtotal.innerText = `${preco}`;
  }
};

window.onload = async () => {
  loading();
  await products();
  remoLoading();
  const olPai = document.querySelector(classOlPai);
  olPai.innerHTML = getSavedCartItems();
  priceLS();
  newEventListener();
  deleteCart();
};
