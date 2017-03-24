var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};


// asyncAdd(5, 3).then((res) => {
//     console.log('Result: ', res);
//     console.log(typeof res);
//     return asyncAdd(res, 33)
// }).then((res) => {
//     console.log('Result', res);
// }).catch((errorMessage) => {
//     console.log(errorMessage);
// });

module.exports = {
    asyncAdd
};