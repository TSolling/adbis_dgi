"use client"

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

import { formandCredentials } from "@/lib/DGI_DB";


type Forening = { //Declare the Forening type.
  id: number;
  label: string;
  data: string;
  updatedAt: string;
};



export function Frontpage() {

  const [foreningsData, Bekræft_Skift] = useState<Forening[]>([]); //Declare the foreningsData state.

  const [pin, setPin] = useState("");

  const isUserValid = pin === formandCredentials.pin; //Check if the pin is correct.


    useEffect(() => { //on page load start or create the database.
      async function CreateDB() {
        try {
          const res = await fetch('/api/createDB');
          const data = await res.json();
          Bekræft_Skift(data);
        } catch (err) {
          console.error(err);
        }
      }

      CreateDB();
    }, []);
  

    async function handleUpdateClick(e: React.MouseEvent) { //if the user gets verify, update the database.
      e.preventDefault(); 
    
      try {
        const res = await fetch('/api/updateDB');
        const data = await res.json();
        
        Bekræft_Skift(data);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }

  async function handleDropClick(e: React.MouseEvent) { //if the user clicks the restart button, drop the database.
    e.preventDefault();

    try {
      const res = await fetch('/api/dropDB');
      const data = await res.json();
      
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }



  
  


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="w-full max-w-sm py-3">
        <CardHeader>
          <CardTitle className="text-2xl">Verificer</CardTitle>
          <CardDescription>
            Indtast pinkode for at starte processen.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form>
            <div className="grid gap-2">
              <Label htmlFor="email">Pinkode</Label>
              <Input
                id="email"
                type="pin"
                placeholder="23-45-67-89"
                onChange={(e) => setPin(e.target.value)}
                
              />
            </div>
            <CardFooter className=" pt-4">
              <Button onClick={handleUpdateClick} className="w-full" type="submit" disabled={!isUserValid}> 
                Log ind
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <h1 className=" pt-8 font-extrabold">Foreningsoplysninger</h1>
      <div className="flex justify-center"> 
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Data</TableHead>
              <TableHead>Forenings data</TableHead>
              <TableHead className="text-right">Sidst opdateret</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {foreningsData && foreningsData.map((forening) => (
          <TableRow key={forening.label}>
            <TableCell className="font-medium min-w-64">{forening.label}</TableCell>
            <TableCell className=" min-w-64">{forening.data}</TableCell>
            <TableCell>{forening.updatedAt}</TableCell>
          </TableRow>
        ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
      </div> 
      <div className=" pt-5">
      <Button onClick={handleDropClick} className="w-full" type="submit">
                Restart DB
              </Button>
      </div>
    </div>
  );

}

export default Frontpage;

