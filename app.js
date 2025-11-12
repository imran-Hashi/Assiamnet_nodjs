const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('unversity');  // Database sax ah
    const students = db.collection('student');  // Collection sax ah

    // 1. Insert many documents
    const insertManyResult = await students.insertMany([
      { name: 'najmo', age: 20, department: 'Computer Science' },
      { name: 'casha', age: 21, department: 'Information Technology' },
      { name: 'ali', age: 23, department: 'Software Engineering' }
    ]);
    console.log('Inserted multiple students:', insertManyResult.insertedIds);

    // 2. Update one document
    const updateResult = await students.updateOne(
      { name: 'ahmed' },  // filter - cidda la update gareynayo
      { $set: { age: 21 } }  // waxa la bedelayo
    );
    console.log('Updated documents count:', updateResult.modifiedCount);

    // 3. Delete one document
    const deleteResult = await students.deleteOne({ name: 'ali' });
    console.log('Deleted documents count:', deleteResult.deletedCount);

  } catch (err) {
    console.error('MongoDB error:', err);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

run();
