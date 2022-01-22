const iconMenu = document.querySelector('.header__burger,.header__menu');
const menuBody = document.querySelector('.header__menu');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
	});
};

$(document).ready(function() {
	$('.link-one').click(function(event) {
		$('.text-one').toggleClass('active');
	});
	$('.link-two').click(function(event) {
		$('.text-two').toggleClass('active');
	});
	$('.link-three').click(function(event) {
		$('.text-three').toggleClass('active');
	});
});

function changeText(ev) {
	if(ev.getAttribute('data-show') === "true") {
		 ev.innerText = "Свернуть"
		 ev.setAttribute('data-show', "false"); 
	}
	else {
		 ev.innerText = "Прочитать полностью"
		 ev.setAttribute('data-show', "true"); 
	}
}

document.querySelectorAll('a[href*="#"]').forEach(link => {

	link.addEventListener('click', function (e) {
		e.preventDefault();

		document.body.classList.remove('lock');
		iconMenu.classList.remove('active');
		menuBody.classList.remove('active');

		let href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		const topOffset = 0;
		// const topOffset = 0; // если не нужен отступ сверху 
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
	});
});

$(document).ready(function () {

	let button = $('.back-to-top');

	$(window).on('scroll', function () {
		if ($(window).scrollTop() >= 600) { //200 - кол-во пикселей при скролле//
			$('.back-to-top').addClass('visible');
		} else {
			$('.back-to-top').removeClass('visible');
		}
	});

	button.on('click', function () {
		$('html,body').animate({ scrollTop: 0 }, 800); //800 - длительность прокрутки//
	});
});






"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		if (error === 0) {
			document.querySelector('body').classList.add('_sending');
			document.querySelector('body').classList.add('lock');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}

	function formValidate(form) {
		let error = 0
		let formReq = document.querySelectorAll('._req')

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			// if (input.classList.contains('_email')) {
			// 	if (emailTest(input)) {
			// 		formAddError(input);
			// 		error++;
			// 	}
			// } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
			// 	formAddError(input);
			// 	error++;
			// } else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			// }
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	// //Функция теста email
	// function emailTest(input) {
	// 	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	// }

	// //Получаем инпут file в переменную
	// const formImage = document.getElementById('formImage');
	// //Получаем div для превью в переенную
	// const formPreview = document.getElementById('formPreview');

	// //Слушаем изменения в инпуте file
	// formImage.addEventListener('change', () => {
	// 	uploadFile(formImage.files[0]);
	// });

	// function uploadFile(file) {
	// 	//проверяем тип файла
	// 	if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
	// 		alert('Разрешены только изображения.');
	// 		formImage.value = '';
	// 		return;
	// 	}
	// 	//проверяем размер файла (<2 МБ)
	// 	if (file.size > 2 * 1024 * 1024) {
	// 		alert('Файл должен быть менее 2 МБ.');
	// 		return;
	// 	}

	// 	var reader = new FileReader();
	// 	reader.onload = function (e) {
	// 		formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
	// 	};
	// 	reader.onerror = function (e) {
	// 		alert('Ошибка');
	// 	};
	// 	reader.readAsDataURL(file);
	// }
});


