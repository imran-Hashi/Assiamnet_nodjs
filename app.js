const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('unversity');  
    const students = db.collection('student');

    
    const insertManyResult = await students.insertMany([
      { name: 'bakar', age: 20, department: 'Computer Science' },
      { name: 'casha', age: 21, department: 'Economic' },
      { name: 'sacdia', age: 23, department: 'public health' }
    ]);
    console.log('Inserted multiple students:', insertManyResult.insertedIds);

    
    const updateResult = await students.updateOne(
      { name: 'faarax' },  
      { $set: { age: 21 } }  
    );
    console.log('Updated documents count:', updateResult.modifiedCount);

   
    const deleteResult = await students.deleteOne({ name: 'faaduma' });
    console.log('Deleted documents count:', deleteResult.deletedCount);

  } catch (err) {
    console.error('MongoDB error:', err);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

run();
