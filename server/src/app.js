const express = require('express');

const app = express();

app.get('/api/test', (req, res) => {
    res.send('express working!');
});

app.listen(3000, () => {
    console.log('Server is now listening on port 3000.')
});