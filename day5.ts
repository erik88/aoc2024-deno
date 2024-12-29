import "./helpers/arrays.ts";

{
	const decoder = new TextDecoder("utf8");
	const input = decoder.decode(Deno.readFileSync("input.txt"));
	const [ordering, lists] = parseInput(input);

	part1(ordering, lists);
	part2(ordering, lists);
}


function part1(ordering: Map<number, number[]>, lists: number[][]) {
	let sum = 0;
	for (const list of lists) {
		if (checkList(ordering, list)) {
			sum += getMiddle(list);
		}
	}
	console.log("Part 1: ", sum);
}

function part2(ordering: Map<number, number[]>, lists: number[][]) {
	let sum = 0;
	for (const list of lists) {
		if (!checkList(ordering, list)) {
			sum += getMiddle(toSorted(ordering, list));
		}
	}
	console.log("Part 2: ", sum);
}

function checkList(ordering: Map<number, number[]>, list: number[]): boolean {
	for (let i=list.length-1; i--; i>0) {
		const toTheLeft = new Set(list.slice(0, i));
		const shouldBeToTheRight = ordering.get(list[i]) || [];

		if (toTheLeft.intersection(new Set(shouldBeToTheRight)).size > 0) {
			return false;
		}
	}
	return true;
}

function getMiddle(list: number[]): number {
	return list[(list.length - 1) / 2];
}

function toSorted(ordering: Map<number, number[]>, list: number[]): number[] {
	return [...list].sort((a, b) => {
		if (ordering.get(a)?.includes(b)) {
			return -1;
		} else if (ordering.get(b)?.includes(a)) {
			return 1;
		} else {
			return 0;
		}
	});
}

function parseInput(text: string): [Map<number, number[]>, number[][]] {
	const [orderings, lists] = text.split("\n\n");
	const orderMap = new Map<number, number[]>();

	for (const o of orderings.split("\n")) {
		const sp = o.split("|");
		const num = parseInt(sp[0], 10);
		const other = parseInt(sp[1], 10);
		if (orderMap.has(num)) {
			orderMap.get(num)?.push(other);
		} else {
			orderMap.set(num, [other])
		}
	}

	return [orderMap, lists.split("\n").map(l => l.split(",").map(n => parseInt(n,10)))];
}