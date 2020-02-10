const {
    handler
} = require('./index');

describe('convertSample test', () => {
    it('execution', async () => {
        const { statusCode, body } = await handler();
        expect(statusCode).toEqual(200);
        const { time, data } = JSON.parse(body);
        expect(typeof (time)).toEqual('object');
        expect(Array.isArray(data)).toEqual(true);
        console.log(time);
        console.log(data[0])
    });
});
