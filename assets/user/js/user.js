// Toggle sidebar
$(document).ready(function () {
	$("#toggleSidebar").click(function () {
		$(".sidebar").toggleClass("show");
	});

	$(".toggleSidebar").on("click", function () {
		$(".sidebar").toggleClass("show");
	});

	// Apply colors to cards
	const colors = [
		{ cardBody: "#FB9F9E", cardTop: "#FCB2B1", button: "#FCC1C0" },
		{ cardBody: "#A1B4FF", cardTop: "#B4C3FF", button: "#C2CEFF" },
		{ cardBody: "#81DEF3", cardTop: "#9AE5F5", button: "#ADEAF7" },
		{ cardBody: "#F8B849", cardTop: "#F9C66D", button: "#FAD189" },
	];

	const cards = document.querySelectorAll(".cards_new");

	cards.forEach((card, index) => {
		const colorSet = colors[index % colors.length];

		card.style.backgroundColor = colorSet.cardBody;

		const cardTop = card.querySelector(".card-tops");
		if (cardTop) {
			cardTop.style.backgroundColor = colorSet.cardTop;
		}
		const button = card.querySelector(".mcq-button");
		if (button) {
			button.style.backgroundColor = colorSet.button;
		}
	});


	const body = document.body;
	const toggleBtn = document.getElementById("toggleDark");

	// Apply stored preference on load
	if (localStorage.getItem("darkMode") === "enabled") {
		body.classList.add("dark-mode");
		toggleBtn.checked = true;
	}

	toggleBtn.addEventListener("change", () => {
		body.classList.toggle("dark-mode");
		if (body.classList.contains("dark-mode")) {
			localStorage.setItem("darkMode", "enabled");
		} else {
			localStorage.setItem("darkMode", "disabled");
		}
	});



	//function for results in mock tests
	let url = new URL(window.location.href);
	let command = url.searchParams.get("command");

	if (command === "showResults") {
		document.querySelectorAll(".optionSpan")?.forEach(el => {
			el.disabled = true;
		});

		const mockTestName = document.getElementById("mocktest-name").innerText;

		let data = JSON.parse(localStorage.getItem(mockTestName));

		for (let i = 0; i < data.length; i++) {
			let result = data[i];
			let correct_option = document.getElementById(`spanOption_${result.id}_${result.correct}`)?.parentElement?.parentElement;
			let chosen_option = document.getElementById(`spanOption_${result.id}_${result.chosen}`)?.parentElement?.parentElement;

			if (correct_option) {
				correct_option.classList.add("green-border");
				if (result.chosen == result.correct) {
					chosen_option.insertAdjacentHTML("beforeend", `<i class="fas fa-check text-success" style="font-size:25px;"></i>`);
				}
			}
			if (result.chosen != result.correct && chosen_option) {
				chosen_option.classList.add("red-border");
				chosen_option.insertAdjacentHTML("beforeend", `<i class="fas fa-times text-danger" style="font-size:25px;"></i>`);
			}
		}

	}

});
