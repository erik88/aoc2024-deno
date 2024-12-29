import "./helpers/arrays.ts";
import { Board } from "./helpers/board.ts";

{
	const decoder = new TextDecoder("utf8");
	const input = decoder.decode(Deno.readFileSync("input.txt"));

	const board = Board.fromString(input);

	part1(board);
	part2(board);
}


function part1(board: Board<string>) {
	let sum = 0;

	board.forEach((c, x, y) => {
		if (c === "X") {
			sum += find(board, "XMAS", x, y, 1, 0) ? 1: 0;
			sum += find(board, "XMAS", x, y, 0, 1) ? 1: 0;
			sum += find(board, "XMAS", x, y, -1, 0) ? 1: 0;
			sum += find(board, "XMAS", x, y, 0, -1) ?1:0;
			sum += find(board, "XMAS", x, y, 1, 1) ?1:0;
			sum += find(board, "XMAS", x, y, -1, -1) ?1:0;
			sum += find(board, "XMAS", x, y, -1, 1) ?1:0;
			sum += find(board, "XMAS", x, y, 1, -1) ?1:0;
		}
	})

	console.log("Part 1:" , sum);
}

function part2(board: Board<string>) {
	let sum = 0;

	board.forEach((c, x, y) => {
		let cross = 0;
		if (c === "A") {
			cross += find(board, "MAS", x-1, y-1, 1, 1) ?1:0;
			cross += find(board, "MAS", x+1, y+1, -1, -1) ?1:0;
			cross += find(board, "MAS", x-1, y+1, 1, -1) ?1:0;
			cross += find(board, "MAS", x+1, y-1, -1, 1) ?1:0;
			if (cross === 2) {
				sum += 1;
			}
		}
	})

	console.log("Part 2:" , sum);
}

function find(board: Board<string>, word: string, startX: number, startY: number, dirX: number, dirY: number): boolean {
	let ok = true;
	for (let i=0; i<word.length; i++) {
		if (board.getOr(startX + dirX*i, startY + dirY*i, ".") !== word.charAt(i)) {
			ok = false;
			break;
		}
	}

	return ok;
}