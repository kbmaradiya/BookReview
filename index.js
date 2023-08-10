// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express')
const app = express()
const port = 8000
const book=require('./book/book')
const book_review=require('./book/book_review')
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    '*'
  );
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })

app.get('/books', (req, res) => {
  book.getAll().then((result)=>{
    res.send(result)
  });
})

app.get('/book_detail',(req,res) => {
  book_review.get(req.query.id).then((result)=>{
    res.send(result)
  });
})

app.get('/book_reviews',(req,res) => {
  book_review.get(req.query.book_id).then((result)=>{
    res.send(result)
  });
})

app.post('/books/:book_id/review',(req,res) =>{
  const body = req.body
  book_review.set(body.review, body.rating, req.params.book_id).then(()=>{
    res.send("Added successfully.")
  });
})