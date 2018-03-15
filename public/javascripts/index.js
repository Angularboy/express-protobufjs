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

var root = protobuf.Root.fromJSON(protoJson);
var UserInfo = root.lookup('UserInfo');

var user1 = {
    name: 'liuyiqiao',
    timestamp: '11',
    Age: '25'
};

console.log('用户原始信息：' + JSON.stringify(user1));

var buffer1 = UserInfo.encode(user1).finish();

console.log('用户buffer信息：' + JSON.stringify(buffer1));
console.log(buffer1);

$.ajax({
    'url': '/users',
    'type': 'post',
    'data': buffer1
});

$.ajax({
    'url': '/users/info',
    'type': 'post',
    'success': function (data) {
        var reqData = data.data;

        var len;
        for (var i in reqData) {
            len = parseInt(i);
        }
        var uint8 = new Uint8Array(len + 1);

        for (var j = 0; j <= len; j++) {
            uint8[j] = reqData[j]
        }

        console.log(UserInfo.toObject(UserInfo.decode(uint8)));
    }
});
