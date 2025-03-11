import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

class supabaseConnection {
    constructor() {
        if(!supabaseConnection.instance) {
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_KEY;
            console.log(supabaseUrl, supabaseKey);
            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Las variables de entorno no son validas');
            }
            this.client = createClient(supabaseUrl, supabaseKey);
            supabaseConnection.instance = this;
        }
        return supabaseConnection.instance;
    }
    getClient() {
        return this.client;
    }
}

const dbinstance = new supabaseConnection();

export default dbinstance.getClient();