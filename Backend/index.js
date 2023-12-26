require('./db/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const spawner = require('child_process').spawn

const IntensityLevel = require('./db/intensity_input')

const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(cors())




app.post('/userInput', async (req,res) => {
    let intensityInputs = new IntensityLevel(req.body)
    let result = await intensityInputs.save()
    console.log(result)

    let responseSent = false
    
    // const python_process = spawner('python', ['./pythonscript/myfile.py', JSON.stringify(result)])
    const python_process = spawner('python', ['./pythonscript/myfile.py']);
    python_process.stdin.write(JSON.stringify(result));
    python_process.stdin.end();

    python_process.stdout.on('data', async (data) => {
        try {
            const jsonData = JSON.parse(data.toString());
            console.log('Data received from python:', jsonData);

            result.Intensity = jsonData.Intensity

            let updatedResult = await result.save()

            if(!responseSent) {
                responseSent = true
                res.send(updatedResult)
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            if (!responseSent) {
                responseSent = true;
                res.status(500).send({ error: 'Internal Server Error' });
            }
        }
    });
    python_process.stderr.on('data', (data) => {
        console.error('Error from python:', data.toString());
        if (!responseSent) {
            responseSent = true;
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
