import isEqual from "https://unpkg.com/lodash-es@4.17.21/isEqual.js";
import shallowEqual from "https://unpkg.com/react-redux@8.1.3/es/utils/shallowEqual.js";
import { shallowEqualArrays } from "https://unpkg.com/shallow-equal@3.1.0/dist/index.modern.mjs";

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
			data: [[1, ...array], array],
		},
		{
			type: "Not equal, at mid",
			data: [
				array
					.slice(0, Math.floor(array.length / 2))
					.concat(1)
					.concat(array.slice(Math.floor(array.length / 2))),
				array,
			],
		},
		{
			type: "Not equal, at end",
			data: [array.concat(1), array],
		},
	];
};

const testedFunctions = [isEqual, shallowEqual, shallowEqualArrays];

export { getTestSuites, testedFunctions };
