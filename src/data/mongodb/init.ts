import mongoose from "mongoose";

import { MongoConnectionOptions } from "../interfaces/mongo-connection-options.interface";

export class MongoDatabase {
    static async connect(options: MongoConnectionOptions) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, { dbName });
            return true;
        } catch (error) {
            throw error;
        }
    }
}