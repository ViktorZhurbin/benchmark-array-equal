import isEqual from "https://unpkg.com/lodash-es@4.17.21/isEqual.js";
import shallowEqual from "https://unpkg.com/react-redux@8.1.3/es/utils/shallowEqual.js";
import { shallowEqualArrays } from "https://unpkg.com/shallow-equal@3.1.0/dist/index.modern.mjs";

const getArrayWithReplacedElement = (array, index) => {
	const newArray = [...array];
	newArray[index] = "bla";

	return newArray;
};

const getTestSuites = (arrayLength) => {
	const array = Array.from(Array(arrayLength).keys());

	return [
		{
			type: "Equal, same ref",
			data: [array, array],
		},
		{
			type: "Equal, different ref",
			data: [[...array], [...array]],
		},
		{
			type: "Not equal, at start",
			data: [array, getArrayWithReplacedElement(array, 1)],
		},
		{
			type: "Not equal, at mid",
			data: [
				array,
				getArrayWithReplacedElement(array, Math.floor(array.length / 2)),
			],
		},
		{
			type: "Not equal, at end",
			data: [array, getArrayWithReplacedElement(array, array.length - 2)],
		},
	];
};

const testedFunctions = [isEqual, shallowEqual, shallowEqualArrays];

export { getTestSuites, testedFunctions };
