const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

const db = connect();

async function prepare(){
    await db.query(sql`CREATE TABLE book_review (id int NOT NULL PRIMARY KEY, review VARCHAR NOT NULL,
        date VARCHAR NOT NULL, time VARCHAR NOT NULL, rating int NOT NULL, book_id int NOT NULL, FOREIGN KEY(book_id) REFERENCES book(id));`);
}

const prepared = prepare();

async function set(id, review, date, time, rating, book_id){
    await prepared;
    await db.query(sql`INSERT INTO book_review (id, review, date, time, rating, book_id)
    VALUES (${id}, ${review}, ${date}, ${time}, ${rating}, ${book_id});`);
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

async function run() {
    await set(1, 'Nice','4-8-23','11:23',4,2);
    console.log(await get(1));
    await set(2, 'bad','3-8-23','11:23',2,2);
    console.log(await get(2));
  }

//   run().catch((ex) => {
//     console.error(ex.stack);
//     process.exit(1);
//   });

module.exports = {get,set}