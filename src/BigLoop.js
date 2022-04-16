const Big = require('big-js');


const BigLoop = (start, end, callback) => {
    return new Promise(async resolve => {
        let brake = false;

        let current = Big(start.toString());
        let percentageDone;

        while (brake === false) {
            percentageDone = current.div(end).times(100).toString();
            percentageDone = Number(percentageDone);
            percentageDone = Number(percentageDone.toFixed(2));

            await callback(current, percentageDone);

            current = current.plus(1);

            if (end.lt(current)) {
                brake = true;
		return resolve();
            }
        }

    })
}


module.exports = BigLoop;
