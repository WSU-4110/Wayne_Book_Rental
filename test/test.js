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
    });

    it("returns books of a range of price (>= $50)", ()=>{
        const result = Functions.Bookprice("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("deletes a book from database", ()=>{
        const result = Functions.Deletebook("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("returns date user signed up", ()=>{
        const result = Functions.datesignup("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("returns books of specific category", ()=>{
        const result = Functions.Sub("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("does user have paypal linked?", ()=>{
        const result = Functions.paymentid("5fa36da96f237c75e6a58e92");

        assert.equal(result, true);
    });

    it("returns number of times user has been reported", ()=>{
        const result = Functions.reporteduser("5fa36da96f237c75e6a58e92");

        assert.equal(result, 3);
    });

    it("Checking user id", ()=>{
        const result = Functions.checkUserID("5f91e4559d7baa5e704051fd");

        assert.equal(result, true);
    }); 

    it("Checks book name", ()=>{
        const result = Functions.checkBookName("Test");

        assert.isObject(result);
    }); 

    it("Check current user", ()=>{
        const result = Functions.checkCurrentUser("5f91e4559d7baa5e704051fd");

        assert.isObject(result);
    });

    it("Check book price", ()=>{
        const result = Functions.checkBookPrice();
        assert.equal(result, 100);
        //assert.equal(result, true);
    });

    it("Check if rented", ()=>{
        const result = Functions.checkRented();
        assert.equal(result, true);
    });

    it("Check Isbn", ()=>{
        const result = Functions.checkIsbn(1324567890);
        assert.isObject(result);
    });

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
    });

})