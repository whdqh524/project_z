const instanceCount:any = {};
const GUID_SERVER_START_SEC = 1694669142;
let previousTime: number;
function createGUID(server_no:number, type:number) {
	const currentTime = Math.floor(Date.now() / 1000);

	if (currentTime !== previousTime) {
		previousTime = currentTime;
		ResetInstanceCountArray();
	}

	let count = instanceCount[type] || 0;

	if (count >= 0xFFFF) {
		console.error("CreateGUID Error!, count=" + count);
		return 0;
	}

	count++;
	instanceCount[type] = count;

	const elapsedSec = BigInt(currentTime) - BigInt(GUID_SERVER_START_SEC);
	const _server_no = BigInt(server_no);
	const _type = BigInt(type);
	const guid =
		(elapsedSec << BigInt(32)) |
		(_type << BigInt(24)) |
		(_server_no << BigInt(16)) |
		BigInt(count);

	return guid.toString();
}

function ResetInstanceCountArray() {
	for (const key in instanceCount) {
		instanceCount[key] = 0;
	}
}

export function accountGuid () {
	const randomNumber = Math.floor(Math.random() * 100) + 1;
	return createGUID(randomNumber, 0)
}