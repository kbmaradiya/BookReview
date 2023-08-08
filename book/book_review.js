const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

const db = connect();

async function prepare(){
    await db.query(sql`CREATE TABLE book_review (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, review VARCHAR NOT NULL,
        date VARCHAR NOT NULL, time VARCHAR NOT NULL, rating INTEGER NOT NULL, book_id INTEGER NOT NULL,
         FOREIGN KEY(book_id) REFERENCES book(id));`);
}

const prepared = prepare();

async function set(review, date, time, rating, book_id){
    await prepared;
    await db.query(sql`INSERT INTO book_review (review, date, time, rating, book_id)
    VALUES (${review}, ${date}, ${time}, ${rating}, ${book_id});`);
}

async function get(id){
    await prepared;
    const result= await db.query(sql`SELECT * FROM book_review WHERE book_id=${id};`);
    if(result.length){
        return result
    }else{
        return undefined
    }
}


module.exports = {get,set}  