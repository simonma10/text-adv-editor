const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000;




/*

var fileReader = function (req, res, next){
    let data = fs.readFileSync('./public/data/globals.json');
    let json = JSON.parse(data);
    console.log(json);
    res.send('fileReader');
    next();
};
*/


var fileList = function (req, res, next){
    res.send('fileList');
    next();
};

app.route('/data')
    .get(function (req, res){
        console.log('get /data');
        let data = fs.readFileSync('./public/data/jungle-adv-v01.json');
        let json = JSON.parse(data);
        return res.send(json);
    })

    .post(function (req, res){
        console.log('post /data');
        //console.log(req);
        return res.status(200).send('thanks for that');
    })

    .put(function (req, res){


    })

/*

app.get('/data', function(req, res){
    console.log('/data');
    let data = fs.readFileSync('./public/data/globals.json');
    let json = JSON.parse(data);
    return res.send(json);
});

*/


app.use(express.static('public'))

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
})




/*
 fs.readFile('./public/data/globals.json', (err, data) => {
 if (err) throw err;
 let json = JSON.parse(data);
 console.log(json);
 });
 */
