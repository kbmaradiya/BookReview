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
const port = 14000
const book=require('./book/book')

app.get('/books', (req, res) => {
  book.getAll().then((result)=>{
    res.send(result)
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })

  async function run(){
    book.set(1, 'Book 1','Auther 1','Description 1');
    book.set(2, 'Book 2','Auther 2','Description 2');
    book.set(3, 'Book 3','Auther 3','Description 3');
    book.set(4, 'Book 4','Auther 4','Description 4');
    book.set(5, 'Book 5','Auther 5','Description 5');
    book.set(6, 'Book 6','Auther 6','Description 6');
    book.set(7, 'Book 7','Auther 7','Description 7');
    book.set(8, 'Book 8','Auther 8','Description 8');
    book.set(9, 'Book 9','Auther 9','Description 9');
    book.set(10, 'Book 10','Auther 10','Description 10');
  }

  run();