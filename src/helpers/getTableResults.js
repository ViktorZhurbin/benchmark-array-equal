const getOpsPerSec = (task) =>
	task.result.error ? "NaN" : Math.round(task.result.hz);

const getSlowerBy = (index, array) => {
	if (index === 0) return "-";

	const topResult = getOpsPerSec(array[0]);
	const currentResultResult = getOpsPerSec(array[index]);

	return `${(100 - (currentResultResult / topResult) * 100).toFixed(2)}%`;
};

const NumberFormat = new Intl.NumberFormat();

const getTableResults = (bench) => {
	return bench.tasks
		.toSorted((a, b) => b.result.hz - a.result.hz)
		.reduce((result, task, index, array) => {
			if (task.result) {
				if (task.result.error) {
					throw task.result.error;
				}

				const opsPerSecond = getOpsPerSec(task);

				const slowerBy = getSlowerBy(index, array);

				const avgTimeMs = task.result.error
					? "NaN"
					: task.result.mean.toFixed(5);

				result[`${index + 1}. ${task.name}`] = {
					"ops/sec": NumberFormat.format(opsPerSecond),
					"less ops/sec (%)": slowerBy,
					"average time (ms)": avgTimeMs,
					// Margin: task.result.error
					// 	? "NaN"
					// 	: `\xb1${task.result.rme.toFixed(2)}%`,
					// samples: task.result.error ? "NaN" : task.result.samples.length,
				};
			}

			return result;
		}, {});
};

export { getTableResults };
