import express from 'express';
import fs from 'fs';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const scenariosData = JSON.parse(fs.readFileSync('scenarios.json', 'utf-8'));


app.get('/random', (req,res) =>{
 const randomIndex = Math.floor(Math.random() * scenariosData.length);
 const randomScenario = scenariosData[randomIndex];
    res.json(randomScenario);

})

app.post('/add', (req, res) => {
    const newTask = req.body;
    const newTaskId = Date.now().toString();
    newTask.taskID = newTaskId;
    scenariosData.push(newTask);
    fs.writeFileSync('scenarios.json', JSON.stringify(scenariosData, null, 2));
    res.status(201).json(newTask);
    res.send('Task added successfully');

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});