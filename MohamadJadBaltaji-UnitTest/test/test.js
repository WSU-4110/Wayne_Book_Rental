const assert = require("chai").assert;
const Functions = require('../Functions');

describe('Testing Functions', () =>{
    it("Checking if the current rating is returned", ()=>{
        const result = Functions.checkCurrentRating("5fa363eb81b31831bcd7152b");

        assert.equal(result, true);
    });

    it("checks if new rating is returned", ()=>{
        const result = Functions.checkRated('5f88a68ec48f2311d0d63049');

        assert.equal(result, 1);
    });

    it("Checking if user is authenticated", ()=>{
        const result = Functions.checkAuthentication("5fa37db081b31831bcd7152e")

        assert.isObject(result);
    });

    it("Checking if book ID is returned", () =>{
        const result = Functions.checkID();
        assert.equal(result, 7)
    });

    it("Checking if user added a phone number", ()=>{
        const result = Functions.checkNumber("5f88a68ec48f2311d0d63049");
        assert.equal(result, 2);
    });

    it("Checks if total number of users is returned", ()=>{
        const result = Functions.checkTotalUsers("5fa363eb81b31831bcd7152b");
        assert.typeOf(result, "String");
    })


})