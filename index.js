const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

// SimpleCRUD
// 2mmvo1vT8PSsqNSh

app.get('/', (req, res) => {
  res.send('YES!!! Connected');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
