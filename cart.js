// Shopping cart Functionality
const products = {
	g315 : { name: 'Ghee 315gr', price: 24500, order: 0 },
	g160 : { name: 'Ghee 160gr', price: 13000, order: 0 },
	m400 : { name: 'C. Marañon 400gr', price: 46500, order: 0 },
	m200 : { name: 'C. Marañon 200gr', price: 24000, order: 0 },
	a400 : { name: 'C. Almendras 400gr', price: 40500, order: 0 },
	a200 : { name: 'C. Almendras 200gr', price: 21000, order: 0 }
};

const gheeOptions = document.getElementById('ghee-options');
const buyGheeBtn = document.getElementById('buy-ghee');
const marOptions = document.getElementById('mar-options');
const buyMarBtn = document.getElementById('buy-mar');
const almdOptions = document.getElementById('almd-options');
const buyAlmdBtn = document.getElementById('buy-almd');

const shoppingCart = document.getElementById('shopping-cart');
const itemsInCart = document.querySelector('.items-in-cart');
const itemsInCartList = document.querySelector('.items-in-cart-list');
const cartTotal = document.querySelector('.total');
const closeBtns = document.querySelectorAll('.close-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');

let total = 0;
let count = 0;
const cart = [];
const prodsArr = [];
const prodsQuant = [];
const prodsCost = [];

const prods = document.querySelectorAll('.prod');
for (i = 0; i < prods.length; i++) prodsArr.push(prods[i].children);
const [ ghee315, ghee160, mar400, mar200, almd400, almd200 ] = prodsArr;

const quantity = document.querySelectorAll('.quantity');
for (i = 0; i < quantity.length; i++) prodsQuant.push(quantity[i]);
let [
	ghee315Quant,
	ghee160Quant,
	mar400Quant,
	mar200Quant,
	almd400Quant,
	almd200Quant
] = prodsQuant;

const cost = document.querySelectorAll('.cost');
for (i = 0; i < cost.length; i++) prodsCost.push(cost[i]);
const [
	ghee315Cost,
	ghee160Cost,
	mar400Cost,
	mar200Cost,
	almd400Cost,
	almd200Cost
] = prodsCost;

function thousandSeparator(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Toggle Containers
buyGheeBtn.addEventListener('click', () => {
	gheeOptions.classList.toggle('show');
	ghee315Cost.innerHTML = `$${thousandSeparator(products.g315.price)}`;
	ghee160Cost.innerHTML = `$${thousandSeparator(products.g160.price)}`;
});

buyMarBtn.addEventListener('click', () => {
	marOptions.classList.toggle('show');
	mar400Cost.innerHTML = `$${thousandSeparator(products.m400.price)}`;
	mar200Cost.innerHTML = `$${thousandSeparator(products.m200.price)}`;
});

buyAlmdBtn.addEventListener('click', () => {
	almdOptions.classList.toggle('show');
	almd400Cost.innerHTML = `$${thousandSeparator(products.a400.price)}`;
	almd200Cost.innerHTML = `$${thousandSeparator(products.a200.price)}`;
});

shoppingCart.addEventListener('click', () => {
	itemsInCart.classList.toggle('show');
});

closeBtns.forEach(closeBtn => {
	closeBtn.addEventListener('click', () => {
		if (closeBtn.classList.contains('ghee')) {
			gheeOptions.classList.toggle('show');
		}
		if (closeBtn.classList.contains('mar')) {
			marOptions.classList.toggle('show');
		}
		if (closeBtn.classList.contains('almd')) {
			almdOptions.classList.toggle('show');
		}
		if (closeBtn.classList.contains('cart-items')) {
			itemsInCart.classList.toggle('show');
		}
	});
});

// Add and remove Items
function itemAddOrRemove(product, quantity) {
	const removeProductBtn = product[0];
	const addProductBtn = product[2];
	let count = Number(quantity.innerHTML);

	removeProductBtn.addEventListener('click', () => {
		count--;
		if (count < 0) {
			count = 0;
		} else {
			quantity.textContent = count;
		}
	});

	addProductBtn.addEventListener('click', () => {
		count++;
		quantity.textContent = count;
	});
}

itemAddOrRemove(ghee315, ghee315Quant);
itemAddOrRemove(ghee160, ghee160Quant);
itemAddOrRemove(mar400, mar400Quant);
itemAddOrRemove(mar200, mar200Quant);
itemAddOrRemove(almd400, almd400Quant);
itemAddOrRemove(almd200, almd200Quant);

// Add to cart
let order = [];

// Refactor in a function inside if statements
addToCartBtns.forEach(addBtn => {
	addBtn.addEventListener('click', e => {
		if (e.target.classList.contains('ghee')) {
			let g315Q = Number(ghee315Quant.innerHTML);
			let g160Q = Number(ghee160Quant.innerHTML);
			const {
				g315 : { name: g315Name, price: g315Price },
				g160 : { name: g160Name, price: g160Price }
			} = products;

			if (g315Q > 0) {
				cart.push([ g315Q, g315Name, g315Price * g315Q ]);
			}
			if (g160Q > 0) {
				cart.push([ g160Q, g160Name, g160Price * g160Q ]);
			}
			gheeOptions.classList.toggle('show');
		}
		if (e.target.classList.contains('mar')) {
			let m400Q = Number(mar400Quant.innerHTML);
			let m200Q = Number(mar200Quant.innerHTML);
			const {
				m400 : { name: m400Name, price: m400Price },
				m200 : { name: m200Name, price: m200Price }
			} = products;

			if (m400Q > 0) {
				cart.push([ m400Q, m400Name, m400Price * m400Q ]);
			}
			if (m200Q > 0) {
				cart.push([ m200Q, m200Name, m200Price * m200Q ]);
			}
			marOptions.classList.toggle('show');
		}
		if (e.target.classList.contains('almd')) {
			let a400Q = Number(almd400Quant.innerHTML);
			let a200Q = Number(almd200Quant.innerHTML);
			const {
				a400 : { name: a400Name, price: a400Price },
				a200 : { name: a200Name, price: a200Price }
			} = products;

			if (a400Q > 0) {
				cart.push([ a400Q, a400Name, a400Price * a400Q ]);
			}
			if (a200Q > 0) {
				cart.push([ a200Q, a200Name, a200Price * a200Q ]);
			}

			almdOptions.classList.toggle('show');
		}
		order = [ ...order, ...cart ];

		// add to cart
		cart.forEach(element => {
			const li = document.createElement('LI');
			const itemText = document.createTextNode(
				`${element[0]}  ${element[1]} = $${thousandSeparator(element[2])}`
			);
			li.appendChild(itemText);
			itemsInCartList.appendChild(li);

			total = total + element[2];
			cartTotal.innerHTML = `${thousandSeparator(total)}`;

			const clearCartBtn = document.querySelector('.clear-cart-btn');
			clearCartBtn.addEventListener('click', () => {
				try {
					while (li.firstChild) {
						li.removeChild(li.lastChild);
					}
					order.splice(0, 10);
					total = 0;
					cartTotal.innerHTML = `${total}`;
					cartCount.classList.remove('show-count');
				} catch (err) {
					console.log(err);
				}
			});
		});
		cart.splice(0, 10);
		cartCount.classList.add('show-count');
		itemsInCart.classList.toggle('show');
	});
});

// Whatsapp checkout button
const checkoutBtn = document.querySelector('.checkout-btn');
let wspText =
	'http://api.whatsapp.com/send?phone=573054269112&text=Hola,%20quisiera%20pedir:%20';

checkoutBtn.addEventListener('click', () => {
	const wspLink = document.getElementById('wsp-link');
	const orderText = [];
	order.forEach(element => {
		const itemOrder = [];
		itemOrder.push(element[0]);
		itemOrder.push(element[1]);
		const itemOrderText = itemOrder.join(' ');
		orderText.push(itemOrderText);
	});

	const replaced = orderText.join(', ');
	wspLink.href = wspText.concat(replaced);
});

// const doc = document.querySelector('.products')
// doc.addEventListener('click', ()=>{
// 	if (itemsInCart.classList.contains('show')){
// 		itemsInCart.classList.remove('show')
// 	}

// })
