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

app.post("/echo", function(req, res) {
    var speech =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.echoText
        ? req.body.queryResult.parameters.echoText
        : "Seems like some problem. Speak again.";

    var speechResponse = {
        google: {
        expectUserResponse: true,
        richResponse: {
            items: [
            {
                simpleResponse: {
                textToSpeech: speech
                }
            }
            ]
        }
        }
    };

    return res.json({
        payload: speechResponse,
        //data: speechResponse,
        fulfillmentText: speech,
        speech: speech,
        displayText: speech,
        source: "webhook-echo-sample"
    });
});


app.post("/extract", (req, res) => {
    let largeDataSet = [];

    let speech =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.echoText
        ? req.body.queryResult.parameters.echoText
        : "";

    if (speech.length !== 0) {
        const python = spawn('python3', ['test.py']);
    
        python.stdout.on('data', function (data) {
            // console.log('Pipe data from python script ...');
            largeDataSet.push(data);
        });
        // in close event we are sure that stream is from child process is closed
        python.on('close', (code) => {
            // console.log(`child process close all stdio with code ${code}`);
            // res.send(largeDataSet.join(""))
            speech = JSON.stringify(largeDataSet[0]);
            console.log('DONE');
        });
    } else {
        speech = "Seems like some problem. Speak again.";
    }
    
    let speechResponse = {
        google: {
        expectUserResponse: true,
        richResponse: {
            items: [
            {
                simpleResponse: {
                textToSpeech: speech
                }
            }
            ]
        }
        }
    };

    return res.json({
        payload: speechResponse,
        //data: speechResponse,
        fulfillmentText: speech,
        speech: speech,
        displayText: speech,
        source: "webhook-echo-sample"
    });
});


app.get('/', (req, res) => {
    // var largeDataSet = [];
    
    // const python = spawn('python3', ['test.py']);
    
    // python.stdout.on('data', function (data) {
    //     // console.log('Pipe data from python script ...');
    //     largeDataSet.push(data);
    // });
    // // in close event we are sure that stream is from child process is closed
    // python.on('close', (code) => {
    //     // console.log(`child process close all stdio with code ${code}`);
    
    //     res.send(largeDataSet.join(""))
    // });
    // res.send('Ahoy')
    res.render('./index.html')
})



// app.listen(3000, () => console.log(`Example app listening on port.!`))
app.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening on" + process.env.PORT);
  });