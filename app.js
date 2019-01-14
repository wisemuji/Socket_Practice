import express from 'express'

let app = express();



const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server on port ', PORT);
})