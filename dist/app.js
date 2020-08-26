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
