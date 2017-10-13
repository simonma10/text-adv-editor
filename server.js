const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const app = express()
const PORT = 3000;

app.use(bodyParser.json());

app.route('/data')
    .get(function (req, res){
        console.log('get /data');
        let data = fs.readFileSync('./public/data/jungle-adv-v01.json');
        let json = JSON.parse(data);
        return res.send(json);
    })

    .post(function (req, res){
        console.log('post /data');
        console.log(req.body.config);
        console.log(req.body.messages);
        console.log(req.body.locations);


        let saveData={
            config: req.body.config,
            messages: req.body.messages,
            verbs: req.body.verbs,
            nouns: req.body.nouns,
            locations: req.body.locations,
            items: req.body.items,
            conditions: req.body.conditions
        }

        fs.writeFile('./public/data/jungle-adv-v01.json', JSON.stringify(saveData, null, 2), (err) => {
            if(err) {
                console.log(err);
            }
            console.log('post successful');
            return res.status(200).send('thanks for that - file saved');
        });
    })


app.use(express.static('public'))

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
})


