const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

const db = connect();

async function prepare(){
    await db.query(sql`CREATE TABLE book (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL,
        author VARCHAR NOT NULL, description VARCHAR NOT NULL);`);
}

const prepared = prepare();

async function set(id, name, author, description){
    await prepared;
    await db.query(sql`INSERT INTO book (id, name, author, description) VALUES (${id}, ${name}, ${author}, ${description});`);
}

async function getAll(){
    await prepared;
    const result= await db.query(sql`SELECT * FROM book;`);
    if(result.length){
        return result
    }else{
        return undefined
    }
}

async function get(id){
    await prepared;
    const result= await db.query(sql`SELECT * FROM book WHERE id=${id};`);
    if(result.length){
        return result[0]
    }else{
        return undefined
    }
}

async function run(){
    set(1, 'Book 1','Auther 1','Description 1');
    set(2, 'Book 2','Auther 2','Description 2');
    set(3, 'Book 3','Auther 3','Description 3');
    set(4, 'Book 4','Auther 4','Description 4');
    set(5, 'Book 5','Auther 5','Description 5');
    set(6, 'Book 6','Auther 6','Description 6');
    set(7, 'Book 7','Auther 7','Description 7');
    set(8, 'Book 8','Auther 8','Description 8');
    set(9, 'Book 9','Auther 9','Description 9');
    set(10, 'Book 10','Auther 10','Description 10');
  }

  run();

  module.exports = {set,get,getAll}