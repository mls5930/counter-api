// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3005;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// require('dotenv').config();
// const cors = require('cors');
// app.use(cors());

// app.get('/', async (req, res) => {
//   res.send('hello! aws');
// });


// app.listen(PORT, async () => {
//   console.log(`server start ${PORT}`);
// });


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const { Counter, sequelize } = require('./model');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.get('/', async (req, res) => {
  res.send('hello! aws');
});

app.get('/counter', async (req, res) => {
  try {
    const result = await Counter.findOne({
      order: [['id', 'DESC']],
    });
    res.json({ value: result });
  } catch (error) {
    console.log(error);
  }
});

app.post('/counter', async (req, res) => {
  try {
    const { newValue } = req.body;
    const newCounter = await Counter.create({ value: newValue });
    res.json({ success: true, value: newCounter.value });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, async () => {
  await sequelize.sync({ force: true });

  (await Counter.findOne({ where: { id: 1 } })) ||
    (await Counter.create({ id: 1, value: 0 }));

  console.log(`server start ${PORT}`);
});
