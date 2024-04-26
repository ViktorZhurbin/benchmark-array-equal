import { benchmark } from "./benchmark.js";
import { getArrayLength } from "./helpers/getArrayLength.js";

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const arrayLength = getArrayLength(form);

	benchmark(arrayLength);
});
