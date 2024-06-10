import { Request, Response } from "express";
import * as csv from 'fast-csv';
import * as fs from 'fs';

export class FilesController{

    static async csvFileParser(req:Request,res:Response){
        if (!req.file) {
            return res.status(400).json({
                message:'No file uploaded.'
            });
          }
        const file = req.file;
        console.log(`File path:${file.path} - ${file}`);
        const fileExtension =  file.mimetype.split('/')[1];
        console.log(`File Extension:  ${fileExtension}`);
        if(fileExtension!=='csv'){
            return res.status(400).json({
                message:'Invalid file type. Please upload a CSV file.'
            });

        }
         const rows = [];

         const csvStream = csv.parse({
            headers: true, // specify that the first row contains header titles
            delimiter: ',', // specify the delimiter (default is ,)
            quote: '"' // specify the quote character (default is ")
          });

          csvStream.on('data', (row) => {
            rows.push(row);
          });
          
          csvStream.on('end', (rowCount: number) =>  {
            console.log('CSV file parsed successfully!-',rowCount);
            console.log(rows);
            res.status(200).json({
                totalRows:rowCount,
                result: rows,
            });
          });
          
          fs.createReadStream(file.path).pipe(csvStream);


        /*fs.createReadStream(file.path)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                results.push(row);
                console.log(row);
                })
            .on('end', (rowCount: number) => {
                console.log(`Parsed ${rowCount} rows`);
                res.status(200).json({
                    result: results,
                });
            
            });*/
        
         
        }

}