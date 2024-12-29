import "./helpers/arrays.ts";

{
	const decoder = new TextDecoder("utf8");
	const input = decoder.decode(Deno.readFileSync("input.txt"));
	const rows = input.split("\n").filter(line => !!line).map(row => row.split(/\s+/).map(x => parseInt(x,10))) as [number,number][];

	const [list1, list2] = transpose(rows);

	part1(list1, list2);
	part2(list1, list2);
}

function transpose(rows: [number,number][]) {
	const list1 = [];
	const list2 = [];
	
	for (let i=0; i<rows.length; i++) {
		list1.push(rows[i][0]);
		list2.push(rows[i][1]);
	}

	return [list1, list2];
}

function part1(list1: number[], list2: number[]) {
	const l1 = list1.numSort();
	const l2 = list2.numSort();
	
	let diffSum = 0;
	
	for (let i=0; i<l1.length; i++) {
		diffSum += Math.abs(l1[i] - l2[i]);
	}
	
	console.log("Part 1:" , diffSum);
}

function part2(list1: number[], list2: number[]) {
	const sums = new Map<number, number>();
	for (const l of list2) {
		const stored = sums.get(l) ?? 0;
		sums.set(l, stored + 1);
	}

	let simScoreSum = 0;

	for (const l of list1) {
		simScoreSum += l*(sums.get(l) ?? 0);
	}

	console.log("Part 2:" , simScoreSum);
}