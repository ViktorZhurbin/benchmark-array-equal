const DEFAULT_ARRAY_LENGTH = 1_000;

const getArrayLength = (form) => {
	const formData = new FormData(form);
	const length = formData.get("length");

	return length ? Number(length) : DEFAULT_ARRAY_LENGTH;
};

export { getArrayLength };
