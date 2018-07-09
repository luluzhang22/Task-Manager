const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

const taskUpdate = require('./src/taskUpdate');

app.use(bodyParser.json({extended: true, type: '*/*'}));

app.get('/allTasks', (req, resp) => {
    resp.send(JSON.stringify(taskUpdate.getAllTaskByUserID(req.query.id)));
});

app.post('/userID', (req, resp) => {
    resp.send({id: taskUpdate.getUserIndex()});
});

app.post('/taskManagement', (req, resp) => {
    if (req.body.mode === 'Delete') {
        taskUpdate.delete(req.body.id, req.body.uuid);
    } else {
        taskUpdate.addAndEdit(req.body.id, req.body.content.uuid, req.body.content);
    }
    resp.send(JSON.stringify(taskUpdate.getAllTaskByUserID(req.body.id)));
});

app.get('/allCategory', (req, resp) => {
    resp.send(JSON.stringify(taskUpdate.getAllCategoryByUserID(req.query.id)));
});

app.post('/category', (req, resp) => {
    if (req.body.mode === 'Delete') {
        taskUpdate.deleteCategory(req.body.id, req.body.content.index);
    }else {
        taskUpdate.addAndEditCategory(req.body.id, req.body.content);
    }
    resp.send(JSON.stringify(taskUpdate.getAllCategoryByUserID(req.body.id)));
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});
