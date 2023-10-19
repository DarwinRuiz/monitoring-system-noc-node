import mongoose from 'mongoose';
import { MongoDatabase } from '../../../../src/data/mongodb/init';
describe('Test for the file init.ts of mongodb', () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async () => {

        const connected = await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });

        expect(connected).toBeTruthy();
    });

    test('should throw an error', async () => {

        try {
            const MONGO_URL = 'mongodb://darwin:1234@localhost:27017'

            const connected = await MongoDatabase.connect({
                mongoUrl: MONGO_URL,
                dbName: process.env.MONGO_DB_NAME!
            });

            expect(true).toBeFalsy();
        } catch (error) {
        }

    })
})