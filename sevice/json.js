// const request = require('request-promise');
const options = {
    method: 'GET',
    uri: 'http://raspmath.isu.ru/getSchedule',
    json: true
}

// const http = require('http');
// let req = http.get("http://raspmath.isu.ru/getSchedule", function(res) {
//     let data = '',
//         json_data;

//     res.on('data', function(stream) {
//         data += stream;
//     });
//     res.on('end', function() {
//         json_data = JSON.parse(data);

//         // will output a Javascript object
//         console.log(json_data);
//     });
// });

// req.on('error', function(e) {
//     console.log(e.message);
// });

var request = require("request")

var url = "http://raspmath.isu.ru/getSchedule"
const day = "Четверг"
const group = "02461-ДБ"
request({
    url: url,
    json: true
}, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        // ctx.reply() // Print the json response
        for (let i = 0; i < body.length; i++) {
            if (body[i].group_name === group) {
                if (day === body[i].weekday) {
                    console.log(body[i].subject_name)

                }


            }



        }
    }
    // console.log(day + "\n" + group + "\n")
    // console.log(body)
})

// function getUser(user) {
//     // console.log("1234");
//     return new Promise(function(resolve, reject) {

//         mongoClient.connect(function(err, client) {

//             const collection = client.db("user").collection("users");

//             if (err) return console.log(err);

//             collection.find().toArray(function(err, results) {
//                 if (err) return console.log(err);
//                 console.log(results[res])
//                 for (let res = 0; res < results.length; res++) {
//                     if (results[res].userID === user) {
//                         resolve(results[res].groupID);
//                         break;
//                     }
//                 }

//                 // client.close();
//             });
//         });
//     })

// }
// getUser(400739281).then((result) => {
//     let weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

//     // console.log('Этот код здесь: ' + result)
//     groupID = result;
//     // console.log('А этот код в тут: ' + groupID)
//     console.log(response[res])
// });