## expring

Example

SimpleController.js:
```js
let expring = require('expring');

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
            res.send('Hello, Expring!');
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