import { Bench } from "https://unpkg.com/tinybench@2.3.1/dist/index.js";
import { getTableResults } from "./helpers/getTableResults.js";
import { getTestSuites, testedFunctions } from "./helpers/getTestSuites.js";

export const benchmark = async (arrayLength) => {
	const testSuites = getTestSuites(arrayLength);

	console.log("Running...");

	// let res = [];

	for await (const test of testSuites) {
		const bench = new Bench();

		for (const func of testedFunctions) {
			const [obj1, obj2] = test.data;

			// For debugging
			// res[`${test.type} - ${func.name}`] = {
			// 	// func: func.name,
			// 	isEqual: func(obj1, obj2),
			// };

			const taskName = func.name;
			const task = () => {
				func(obj1, obj2);
			};

			bench.add(taskName, task);
		}

		await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50

		await bench.run();

		// console.group();
		console.info(test.type);
		console.table(getTableResults(bench));
		console.info("");
		console.info("");
		// console.groupEnd();
	}

	// DEBUG
	// console.table(res);

	console.log("Done.");
};
