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

// Whatsapp shopping cart
// http://api.whatsapp.com/send?phone=573054269112

const buyBtn = document.getElementById('buy-ghee');

buyBtn.addEventListener('click', () => {
	const wspLink = document.getElementById('wsp-link');
	wspLink.href =
		'http://api.whatsapp.com/send?phone=573054269112&text=Hola,%20quiero%20comprar%20un%20ghee';
});

const gheeOptions = document.getElementById('ghee-options');
const buyGheeBtn = document.getElementById('buy-ghee');
const marOptions = document.getElementById('mar-options');
const buyMarBtn = document.getElementById('buy-mar');
const almdOptions = document.getElementById('almd-options');
const buyAlmdBtn = document.getElementById('buy-almd');

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

// Display product selection
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
	let itemsInCart = document.querySelector('.items-in-cart');

	removeProductBtn.addEventListener('click', () => {
		count--;
		if (count < 0) {
			count = 0;
		} else {
			quantity.textContent = count;
			itemsInCart.textContent = count;
		}
	});

	addProductBtn.addEventListener('click', () => {
		count++;
		quantity.textContent = count;
		itemsInCart.textContent = count;
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
	ghee : {
		size  : [ 315, 160 ],
		cost  : [ 24500, 13000 ],
		order : []
	},
	mar  : {
		size  : [ 400, 200 ],
		cost  : [ 46500, 24000 ],
		order : []
	},
	almd : {
		size  : [ 400, 200 ],
		cost  : [ 40500, 21000 ],
		order : []
	}
};

const addToCartBtn = document.querySelectorAll('.add-to-cart');

// Refactor in a function inside if statements
addToCartBtn.forEach(addBtn => {
	addBtn.addEventListener('click', e => {
		if (e.target.classList.contains('ghee')) {
			let g315Q = Number(ghee315Quant.innerHTML);
			let g160Q = Number(ghee160Quant.innerHTML);
			const g315Cost = products.ghee.cost[0];
			const g160Cost = products.ghee.cost[1];

			products.ghee.order.push(g315Q * g315Cost + g160Q * g160Cost);
			console.log(products.ghee.order);
			gheeOptions.classList.toggle('show');
			// ghee315Quant.textContent = count
			// ghee160Quant.textContent = count
		}
		if (e.target.classList.contains('mar')) {
			let m400Q = Number(mar400Quant.innerHTML);
			let m200Q = Number(mar200Quant.innerHTML);
			const m400Cost = products.mar.cost[0];
			const m200Cost = products.mar.cost[1];

			products.mar.order.push(m400Q * m400Cost + m200Q * m200Cost);
			console.log(products.mar.order);
			marOptions.classList.toggle('show');
		}
		if (e.target.classList.contains('almd')) {
			let a400Q = Number(almd400Quant.innerHTML);
			let a200Q = Number(almd200Quant.innerHTML);
			const a400Cost = products.almd.cost[0];
			const a200Cost = products.almd.cost[1];

			products.almd.order.push(a400Q * a400Cost + a200Q * a200Cost);
			console.log(products.almd.order);
			almdOptions.classList.toggle('show');
		}
	});
});
