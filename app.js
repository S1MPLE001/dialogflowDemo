const express = require('express');
const {spawn} = require('child_process');
const bodyParser = require("body-parser");


const app = express();


app.use(
    bodyParser.urlencoded({
      extended: true
    })
);

app.use(bodyParser.json());

app.post("/extract", (req, res) => {
    // let largeDataSet = [];

    let speech =
        req.body.queryResult.parameters.echoText
        ? req.body.queryResult.parameters.echoText
        : "";


    

    getEnts(speech).then(response => {

        let speechResponse = {
            google: {
            expectUserResponse: true,
            richResponse: {
                items: [
                {
                    simpleResponse: {
                    textToSpeech: response
                    }
                }
                ]
            }
            }
        };
        // return(response);
    // }).then(response => {
        // console.log(speechResponse);

        return res.json({
            payload: speechResponse,
            fulfillmentText: response,
            speech: response,
            displayText: response,
            source: "temporary code for testing by negi."
        });
        // console.log(response);
    });
});


app.get('/', (req, res) => {
    res.send('abcd')
})

function getEnts(text) {    
        const python = spawn('python3', ['test.py', text]);
        
        const response = readData(python).then(res => {
            return res;
        });

        closeobj(python);
        return response;
}



function readData(obj) {
    return new Promise((resolve, reject) => {
        // let largeDataSet = [];
        var text = "";
            obj.stdout.on('data', (data) => {
                // const foo = async () => {
                    text = data.toString();
                    resolve(text);
                // }
                // foo();
            });
        // resolve(text);
    });
}

function closeobj(obj) {

        obj.on('close', (code) => {
            console.log('DONE');
        });
}

app.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening on" + process.env.PORT);
  });