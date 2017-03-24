var promiseExamp = require('../playground/promise.js');

describe('Addition', function() {
    it('should add two numbers', function(done) {
        promiseExamp.asyncAdd(3, 4).then((result) => {
            expect(JSON.parse(result)).toBe(7)
                .done();

        });
    });
});