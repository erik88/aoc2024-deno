import "./helpers/arrays.ts";

{
	const decoder = new TextDecoder("utf8");
	const input = decoder.decode(Deno.readFileSync("input.txt"));
	const rows = input.split("\n").filter(line => !!line).map(row => row.split(/\s+/).map(x => parseInt(x,10)));

	part1(rows);
	part2(rows);
}

function part1(rows: number[][]) {
	let sumSafe = 0;
	
	for (const row of rows) {
		if (isRowSafe(row)) {
			sumSafe++;
		}
	}

	console.log("Part 1:" , sumSafe);
}

function part2(rows: number[][]) {
	let sumSafe = 0;
	
	for (const row of rows) {
		for (let i=0; i<row.length; i++) {
			const rowModified = [...row];
			rowModified.splice(i, 1);
			if (isRowSafe(rowModified)) {
				sumSafe++;
				break;
			}
		}
	}

	console.log("Part 2:" , sumSafe);
}

function isRowSafe(row: number[]): boolean {
	let prev: number | null = null;
	let ascending: boolean | null = null;
	let isSafe = true;
	for (const num of row) {
		if (prev !== null) {
			const diff = Math.abs(prev - num);
			if (diff < 1 || diff > 3) {
				isSafe = false;
				break;
			}

			if (ascending !== null) {
				if (ascending && prev >= num) {
					isSafe = false;
					break;
				} else if (!ascending && prev <= num) {
					isSafe = false;
					break;
				}
			} else {
				ascending = prev < num;
			}
		}
		prev = num;
	}
	return isSafe;
}