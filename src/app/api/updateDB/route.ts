import { NextResponse } from "next/server";
import sqlite3 from 'sqlite3';
import { næstformand } from "@/lib/DGI_DB";

const db = new sqlite3.Database('./src/database.db');

const currentDate = new Date().toLocaleDateString('da-DK', { //Get the current data and format to DK format.
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});





export async function GET() {
    return new Promise<NextResponse>((resolve, reject) => { 
      db.serialize(() => {
  
        db.get('SELECT * FROM forening WHERE label = ?', ['Formands Email'], (err, row) => { //Select rows that contain the Formands Email. If found return true.
          
            if (err) {
            console.error(err);
            reject(NextResponse.error());
          } 
          else {
            if (row) { //if the correct row and therefore table is found, run code.
   
              næstformand.forEach(item => { //Loop for each datapoint connected to the formand.
                const { label, data} = item;


                const updateQuery = `
                UPDATE forening
                SET data = ?, updatedAt = ?
                WHERE label = ?
              `;
  
                const values = [ data, currentDate, label];
  
                db.run(updateQuery, values, (err) => { //run the update query.
                  if (err) {
                    reject(NextResponse.error());
                    console.error(err);
                  } else {
                    resolve(NextResponse.json(values)); //return the response to the client.
                  }
                });
              });
            } 
          }
        });
      });
    });
  }