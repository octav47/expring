## expring

Example

SimpleService.js:
```js
let expring = require('expring');

class SimpleService extends expring.Service {
    constructor() {
        super('SimpleService');
    }
}

let simpleService = new SimpleService();

simpleService.addMethods([{
    name: 'example',
    fn: () => 'Hello, Expring!'
}])

module.exports = simpleService;
```

SimpleController.js:
```js
let expring = require('expring');

let SimpleService = require('SimpleService.js');

class SimpleController extends expring.Controller {
    constructor() {
        super('SimpleController');
    }
}

let simpleController = new SimpleController();
simpleController.setRequests([
    {
        url: '/',
        type: 'GET',
        fn: (req, res) => {
            res.send(SimpleService.example());
        }
    }
]);

module.exports = simpleController;
```

main.js:
```js
let expring = require('expring');

let app = expring();

let SimpleController = require('SimpleController.js');
SimpleController.init(app);

app.listen(9001);
```