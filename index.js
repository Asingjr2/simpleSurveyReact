const express = require('express');


// Express will handle http requests with route handlers.
const app = express();

app.get('/', (req, res) => {
  res.send({
    hi: 'there'
  });
})


const PORT =  process.env.PORT || 5000;
app.listen(PORT);
