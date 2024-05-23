import { NextResponse } from "next/server";
import sqlite3 from 'sqlite3';
import { forening } from "@/lib/DGI_DB";

const db = new sqlite3.Database('./src/database.db');

export async function GET() {
    return new Promise<NextResponse>((resolve, reject) => {

      db.serialize(() => { //Create the table if it does not exist.
        db.run(`
          CREATE TABLE IF NOT EXISTS forening (
            id INTEGER PRIMARY KEY,
            label TEXT,
            data TEXT,
            updatedAt TEXT
          )
        `);
  
        forening.forEach((item,) => { //populate the table with the data from the forening array.
          db.run(`INSERT INTO forening(id, label, data, updatedAt) VALUES(?, ?, ?, ?)`, [item.id, item.label, item.data, item.updatedAt]);
        });
  
        db.all('SELECT * FROM forening', (err, rows) => { //Select all newly created rows from the table and declare them as rows.
  
          if (err) {
            console.error(err);
            reject(NextResponse.error());
          } else {
            resolve(NextResponse.json(rows)); //return the rows to the client.
          }
        });
      });
    });
  }