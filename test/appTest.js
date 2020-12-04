const assert = require('chai').assert;
const app = require('../app');


describe('Testing Functions', () =>{
    it("Checking user id", ()=>{
        const result = app.checkUserID("5f91e4559d7baa5e704051fd");

        assert.equal(result, true);
    }); 

    it("Checks book name", ()=>{
        const result = app.checkBookName("Test");

        assert.isObject(result);
    }); 

    it("Check current user", ()=>{
        const result = app.checkCurrentUser("5f91e4559d7baa5e704051fd");

        assert.isObject(result);
    });

    it("Check book price", ()=>{
        const result = app.checkBookPrice();
        assert.equal(result, 100);
        //assert.equal(result, true);
    });

    it("Check if rented", ()=>{
        const result = app.checkRented();
        assert.equal(result, true);
    });

    it("Check Isbn", ()=>{
        const result = app.checkIsbn(1324567890);
        assert.isObject(result);
    });

})