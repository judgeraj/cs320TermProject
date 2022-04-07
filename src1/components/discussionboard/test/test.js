const { assert } = require('chai');
const logUser = require('./testFunctions').UserLoggin

describe('Login Usr', function(){
    it('If the User login ', function(){
        let login = logUser();
        assert.isTrue(login);
    }),
    it('If the User logou', function(){
        let logout = logUser();
        assert.isFalse(logout)
    })
});



// describe('testFunctions', function(){
//     it('The topic successfully created', function(){
//         let result = createTopic();
//         assert.isTrue(result);
//     }),
//     it('fetched success', function(){
//         let result = fetchAnime();
//         assert.isNotFalse(result, 'fetched fail');
//     })
// });