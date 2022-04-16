const Big = require('big-js');

// Big.PE = 99999;
const isEven = require("./isEven");

const isFinised = (Steps) => {
    let conditions = {
        a: Steps[Steps.length - 1] === '1',
        b: Steps[Steps.length - 2] === '2',
        c: Steps[Steps.length - 3] === '4',
    }

    return conditions.a && conditions.b && conditions.c;
}

const Calculate = (n) => {
    if (n instanceof Big === false) {
        n = new Big(n);
    }


    let Steps = [n.toString()];

    while (isFinised(Steps) === false) {
        let newStep = null;

        if (isEven(n) === true) {
            newStep = n.div(2);
        } else {
            newStep = n.times(3).plus(1);
        }

        Steps.push(newStep.toString());

        n = newStep
    }

    return Steps;

}

module.exports = Calculate;