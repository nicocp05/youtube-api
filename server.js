const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/youtube-api'));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/youtube-api/index.html'));
});

app.listen(app.get('port'), () => {
    console.log('Server on Port ' + app.get('port'));
});