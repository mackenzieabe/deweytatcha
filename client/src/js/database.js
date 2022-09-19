import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');






// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => 
console.log('GET from the database');

//creates connection to indexedDb database 
const jateDb = await openDB('jate, 1');

//creates new transaction and specifies store and data privileges
const tx = jateDb.transaction('jate', 'readonly');

//opens the desired object store.
const store = tx.objectStore('jate')

//use getAll method to get all data in the database
const request = store.getAll();

//confirmation of request
const result =await request
console.log('result.value', result)
return result;




initdb();
