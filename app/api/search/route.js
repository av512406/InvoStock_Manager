import { MongoClient  } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request){
    
    const uri = "mongodb+srv://mongodb:jJrwkBtsQksJJ66E@cluster0.slomhyc.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
      const database = client.db('anand') ;
      const inventory = database.collection('stock') ; 

      const query = request.nextUrl.searchParams.get("query")  
      console.log(query) 

      const products = await inventory.aggregate([
        {
            $match: {
            $or: [
                { slug: { $regex: query, $options: "i" } }// Case-insensitive match
               ]
            }
        }
       ]).toArray();

      return NextResponse.json( {products}) ; 
    } finally {
      await client.close();
    }   
}

