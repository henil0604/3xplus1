const Big = require('big-js');
const Calculate = require("./src/Calculate");
const BigLoop = require("./src/BigLoop");
const fs = require("fs");

let dataname = null;
let start = 1;
let end = null;

const getStartEnd = () => {
    start = Number(process.argv[process.argv.indexOf('-s') + 1]);
    end = Number(process.argv[process.argv.indexOf('-e') + 1]);
    dataname = process.argv[process.argv.indexOf('-d') + 1]
}

getStartEnd();

if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
}

let startBig = Big(start);
let endBig = Big(end);

let file = './data/' + dataname + '.json';

let DATA = [];

let Store = (data = null) => {

    if (data !== null) {
        DATA.push(data);
    }

    if (DATA.length >= 30000 || data === null) {

        let fileData = fs.readFileSync(file, "utf8");

        fileData = JSON.parse(fileData);

        fileData.push(...DATA);

        fs.writeFileSync(file, JSON.stringify(fileData));

	DATA = [];
    }

}

let run = async () => {
    // Creating Data File
    if (fs.existsSync(file)) {
        throw new Error("Dataname already Exists")
        // fs.unlinkSync(file);
    }

    let open = fs.appendFileSync(file, "[]");

    let loop = await BigLoop(startBig, endBig, (i, p) => {

        process.stdout.write(`Current: ${i.toString()}`)
	process.stdout.cursorTo(0);

        let data = {
            number: i.toString(),
            steps: []
        }

        let calculated = Calculate(i);
        data.steps = calculated;

        Store(data)

    });
    console.log("\nDone");
    Store();
}


run();
