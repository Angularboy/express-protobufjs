var express = require('express');
var router = express.Router();

var protoJson = {
    'nested': {
        'UserInfo': {
            'fields': {
                'name': {
                    "type": "string",
                    "id": 1
                },
                'timestamp': {
                    "type": "string",
                    "id": 2
                },
                'Age': {
                    "type": "string",
                    "id": 3
                }
            }
        }
    }
};

var protobuf = require('protobufjs');
var root = protobuf.Root.fromJSON(protoJson);
var UserInfo = root.lookup('UserInfo');


/* GET users listing. */
router.post('/', function (req, res, next) {

    var reqData = req.body;

    var len;
    for (var i in reqData) {
        len = parseInt(i);
    }
    var uint8 = new Uint8Array(len + 1);

    for (var j = 0; j <= len; j++) {
        uint8[j] = reqData[j]
    }

    res.send(UserInfo.decode(uint8));
});

router.post('/info', function (req, res, next) {

    var user1 = {
        name: 'liuyiqiao1',
        timestamp: '111',
        Age: '251'
    };

    var buffer1 = UserInfo.encode(user1).finish();

    console.log(buffer1)

    res.json(buffer1);
});

module.exports = router;
