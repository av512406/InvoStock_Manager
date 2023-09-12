import { MongoClient  } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request){
    
    const uri = "mongodb+srv://mongodb:jJrwkBtsQksJJ66E@cluster0.slomhyc.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
      const database = client.db('anand') ;
      const inventory = database.collection('stock') ; 
      const query = {} ; 
      const allProducts = await inventory.find(query).toArray() ; 
    //   const movie = await movies.findOne(query) ; 
      // console.log(allProducts) ; 
      return NextResponse.json({ allProducts}) ; 
    } finally {
      await client.close();
    }   
}

export async function POST(request){
    
    let body = await request.json() ;
    // console.log(body) ; 
    const uri = "mongodb+srv://mongodb:jJrwkBtsQksJJ66E@cluster0.slomhyc.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
      const database = client.db('anand') ;
      const inventory = database.collection('stock') ; 
      const query = {} ;  
      const product = await inventory.insertOne(body) 
    //   const movie = await movies.findOne(query) ; 
      return NextResponse.json({ product , ok:true}) ; 
    } finally {
      await client.close();
    }   
}
