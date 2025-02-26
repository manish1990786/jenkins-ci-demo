const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log("Ädded new featureee");
app.get('/', (req, res) => {
    res.send('Hello, Jenkins!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
