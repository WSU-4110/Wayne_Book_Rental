const assert = require("chai").assert;
const Functions = require('../Functions');

describe('Testing Functions', () =>{
    it("Checking if the current user is book owner", ()=>{
        const result = Functions.checkbookowner("5fa363eb81b31831bcd7152b");

        assert.equal(result, true);
    });

    it("checks how many accounts rated this user", ()=>{
        const result = Functions.ratedBy('5f88a68ec48f2311d0d63049');

        assert.equal(result, 1);
    });

    it("Checking the book owner name", ()=>{
        const result = Functions.bookOwner("5fa37db081b31831bcd7152e")

        assert.isObject(result);
    });

    it("Counting the total user", () =>{
        const result = Functions.totaluser();
        assert.equal(result, 7)
    });

    it("Checking the number of books user rented", ()=>{
        const result = Functions.numBookRented("5f88a68ec48f2311d0d63049");
        assert.equal(result, 2);
    });

    it("Looking for the date book is posted", ()=>{
        const result = Functions.checkDate("5fa363eb81b31831bcd7152b");
        assert.typeOf(result, "String");
    })


})