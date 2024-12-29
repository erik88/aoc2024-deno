import "./helpers/arrays.ts";

{
	const decoder = new TextDecoder("utf8");
	const input = decoder.decode(Deno.readFileSync("input.txt"));

	// getMulSum("mul(1,2)mul(2,3)");

	part1(input);
	part2(input);
}

function part1(text: string) {
	console.log("Part 1:" , getMulSum(text, false));
}

function part2(text: string) {
	console.log("Part 2:" , getMulSum(text, true));
}

function getMulSum(text: string, checkDoDont: boolean): number {
	let sum = 0;
	for (const match of text.matchAll(/mul\((\d+),(\d+)\)/g)) {
		if (checkDoDont) {
			const lastDo = text.lastIndexOf("do()", match.index);
			const lastDont = text.lastIndexOf("don't()", match.index);
			if (lastDont === -1) {
				// ok!
			} else {
				if (lastDont > lastDo) {
					continue;
				}
			}
			;
		}
		
		sum += parseInt(match[1],10) * parseInt(match[2],10)
	}
	return sum;
}