import { NextResponse } from "next/server";
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./src/database.db');


export async function GET() {
    return new Promise<NextResponse>((resolve, reject) => {
      db.serialize(() => {
        db.run('DELETE FROM forening', (err) => { //delete table
          if (err) {
            console.error(err);
            reject(NextResponse.error());
          } else {
            resolve(NextResponse.json([]));
          }
        });
      });
    });
  }