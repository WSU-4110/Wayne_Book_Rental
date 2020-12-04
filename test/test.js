const assert = require("chai").assert;
const unittest = require("../unittest");

describe('Testing', ()=>{
    it("returns books of a range of price (>= $50)", ()=>{
        const result = unittest.Bookprice("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("deletes a book from database", ()=>{
        const result = unittest.Deletebook("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("returns date user signed up", ()=>{
        const result = unittest.datesignup("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("returns books of specific category", ()=>{
        const result = unittest.Sub("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("does user have paypal linked?", ()=>{
        const result = unittest.paymentid("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("returns number of times user has been reported", ()=>{
        const result = unittest.reporteduser("5fa36da96f237c75e6a58e92");

        assert.equal(result, 3);
    });
})