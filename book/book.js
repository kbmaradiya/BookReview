const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

const db = connect();

async function prepare(){
    await db.query(sql`CREATE TABLE book (id int NOT NULL PRIMARY KEY, name VARCHAR NOT NULL,
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

async function run() {
    await set(1, 'Krupa','krupa author','krupa description');
    console.log(await get(1));
    await set(2, 'Forbes Lindesay','author 2','description 2');
    console.log(await get(2));
    console.log(await getAll());
  }

//   run().catch((ex) => {
//     console.error(ex.stack);
//     process.exit(1);
//   });

  module.exports = {set,get,getAll}