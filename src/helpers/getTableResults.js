const getOpsPerSec = (task) => Math.round(task.result.hz);

const getSlowerByOps = (index, array) => {
	if (index === 0) return "-";

	const topResult = getOpsPerSec(array[0]);
	const currentResultResult = getOpsPerSec(array[index]);

	return `${(100 - (currentResultResult / topResult) * 100).toFixed(2)}%`;
};

const getSlowerByAvgTime = (index, array) => {
	if (index === 0) return "-";

	const topResult = array[0].result.mean;
	const currentResultResult = array[index].result.mean;

	return (currentResultResult - topResult).toFixed(5);
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

				result[`${index + 1}. ${task.name}`] = {
					"ops/sec": NumberFormat.format(opsPerSecond),
					"less ops/sec (%)": getSlowerByOps(index, array),
					// samples: NumberFormat.format(task.result.samples.length),
					"average time (ms)": task.result.mean.toFixed(5),
					"slower avg time, ms": getSlowerByAvgTime(index, array),
					// "rel margin of error": `\xb1${task.result.rme.toFixed(2)}%`,
				};
			}

			return result;
		}, {});
};

export { getTableResults };
