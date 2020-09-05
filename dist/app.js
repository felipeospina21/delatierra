try {
	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var slideIndex = getRndInteger(1, 3);
	showSlides(slideIndex);

	// Next/previous controls
	function plusSlides(n) {
		showSlides((slideIndex += n));
	}

	// Thumbnail image controls
	function currentSlide(n) {
		showSlides((slideIndex = n));
	}

	function showSlides(n) {
		var i;
		var slides = document.getElementsByClassName('mySlides');
		var dots = document.getElementsByClassName('dot');
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(' active', '');
		}
		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].className += ' active';
	}
} catch (e) {
	e;
}
// Toggle button nav-bar
const toggleBtn = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

toggleBtn.addEventListener('click', () => {
	links.classList.toggle('show-links');
});

// Products page drop-menu
const dropContainers = document.querySelectorAll('.drop-container');

dropContainers.forEach(dropContainer => {
	const dropTitles = dropContainer.querySelectorAll('.drop-title');

	dropTitles.forEach(dropTitle => {
		const dropBtn = dropTitle.querySelector('.drop-btn');

		dropBtn.addEventListener('click', () => {
			dropContainers.forEach(element => {
				if (element !== dropContainer) {
					element.classList.remove('show-text');

					const btn = element.children.item(0).children.item(1);
					btn.classList.remove('rotate');
				}
			});

			dropContainer.classList.toggle('show-text');
			dropBtn.classList.toggle('rotate');
		});
	});
});

const gheeOptions = document.getElementById('ghee-options');
const buyGheeBtn = document.getElementById('buy-ghee');
const marOptions = document.getElementById('mar-options');
const buyMarBtn = document.getElementById('buy-mar');
const almdOptions = document.getElementById('almd-options');
const buyAlmdBtn = document.getElementById('buy-almd');
const shoppingCart = document.getElementById('shopping-cart');
const itemsInCart = document.querySelector('.items-in-cart');

let count = 0;

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

// Display product selection and cart
buyGheeBtn.addEventListener('click', () => {
	gheeOptions.classList.toggle('show');
	ghee315Cost.innerHTML = '$24.500';
	ghee160Cost.innerHTML = '$13.000';
});

buyMarBtn.addEventListener('click', () => {
	marOptions.classList.toggle('show');
	mar400Cost.innerHTML = '$46.500';
	mar200Cost.innerHTML = '$24.000';
});

buyAlmdBtn.addEventListener('click', () => {
	almdOptions.classList.toggle('show');
	almd400Cost.innerHTML = '$40.500';
	almd200Cost.innerHTML = '$21.000';
});

// Add and remove Items
function itemAddOrRemove(product, quantity, count = 0) {
	const removeProductBtn = product[0];
	const addProductBtn = product[2];
	// let itemsInCart = document.querySelector('.items-in-cart');

	removeProductBtn.addEventListener('click', () => {
		count--;
		if (count < 0) {
			count = 0;
		} else {
			quantity.textContent = count;
			// itemsInCart.textContent = count;
		}
	});

	addProductBtn.addEventListener('click', () => {
		count++;
		quantity.textContent = count;
		// itemsInCart.textContent = count;
	});
}

itemAddOrRemove(ghee315, ghee315Quant);
itemAddOrRemove(ghee160, ghee160Quant);
itemAddOrRemove(mar400, mar400Quant);
itemAddOrRemove(mar200, mar200Quant);
itemAddOrRemove(almd400, almd400Quant);
itemAddOrRemove(almd200, almd200Quant);

// Add to cart
const products = {
	g315 : { name: 'Ghee 315gr', price: 24500, order: 0 },
	g160 : { name: 'Ghee 160gr', price: 13000, order: 0 },
	m400 : { name: 'C. Marañon 400gr', price: 46500, order: 0 },
	m200 : { name: 'C. Marañon 200gr', price: 24000, order: 0 },
	a400 : { name: 'C. Almendras 400gr', price: 40500, order: 0 },
	a200 : { name: 'C. Almendras 200gr', price: 21000, order: 0 }
};

const cart = [];
const addToCartBtn = document.querySelectorAll('.add-to-cart');

// Refactor in a function inside if statements
addToCartBtn.forEach(addBtn => {
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

			console.log(cart);
			gheeOptions.classList.toggle('show');
			// ghee315Quant.textContent = count
			// ghee160Quant.textContent = count
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
	});
});

// Open and close cart div
let total = 0;
const closeCartBtn = document.querySelector('.close-btn');

shoppingCart.addEventListener('click', () => {
	const itemsInCartList = document.querySelector('.items-in-cart-list');
	const cartTotal = document.querySelector('.total');

	itemsInCart.classList.toggle('show');
	cart.forEach(element => {
		const li = document.createElement('LI');
		const itemText = document.createTextNode(
			`${element[0]} x ${element[1]} = ${element[2]}`
		);
		li.appendChild(itemText);
		itemsInCartList.appendChild(li);

		total = total + element[2];
		cartTotal.innerHTML = `${total}`;
	});

	cart.splice(0, 10);
});

closeCartBtn.addEventListener('click', () => {
	itemsInCart.classList.toggle('show');
});

// Whatsapp checkout button
const checkoutBtn = document.querySelector('.checkout-btn');
let wspText =
	'http://api.whatsapp.com/send?phone=573054269112&text=Hola,%20quisiera%20pedir';

checkoutBtn.addEventListener('click', () => {
	const wspLink = document.getElementById('wsp-link');
	wspLink.href = wspText;
});
