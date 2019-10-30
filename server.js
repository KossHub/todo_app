const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const PORT = 3000;

if (!fs.existsSync('app_db.json')) {
  fs.writeFileSync('app_db.json', fs.readFileSync('app_db_init.json'));
}
const appDb = JSON.parse(fs.readFileSync('app_db.json'));
setInterval(() => {
  fs.writeFileSync('app_db.json', JSON.stringify(appDb));
}, 1000);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/get_tasks/', (request, response) => {
  response.send({ tasks: appDb.tasks });
});
app.post('/add_task', ({ body: { task } }, response) => {
  task.id = appDb.nextId++;
  appDb.tasks.push(task);
  response.send({ task });
});
app.post('/edit_task', ({ body: { task: editedTask } }, response) => {
  const i = appDb.tasks.findIndex((task) => task.id === editedTask.id);
  appDb.tasks[i] = editedTask;
  response.end();
});
app.delete('/remove_task/:id', (request, response) => {
  appDb.tasks = appDb.tasks.filter((task) => {
    return task.id !== Number(request.params.id);
  });
  response.end();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
