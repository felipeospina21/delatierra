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

let count = 0;

const ghee315 = document.getElementById('g315').children;
const ghee315Quant = document.querySelector('.quantity.g315');
const ghee315Cost = document.querySelector('.cost.g315');

const ghee160 = document.getElementById('g160').children;
const ghee160Quant = document.querySelector('.quantity.g160');
const ghee160Cost = document.querySelector('.cost.g160');

// const mar400 = document.getElementById('m400').children
// const mar200 = document.getElementById('m200').children
// const almd400 = document.getElementById('a400').children
// const almd200 = document.getElementById('a200').children

// Display product selection
buyGheeBtn.addEventListener('click', () => {
	gheeOptions.classList.toggle('show');
	ghee315Cost.innerHTML = '$24.500';
	ghee160Cost.innerHTML = '$13.000';
});

// Add and remove Items
function itemAddOrRemove(product, quantity, count = 0) {
	const removeProductBtn = product[0];
	const addProductBtn = product[2];

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
// itemAddOrRemove(mar400)
// itemAddOrRemove(mar200)
// itemAddOrRemove(almd400)
// itemAddOrRemove(almd200)
