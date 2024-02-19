import express, { Request, Response } from 'express';
const app = express(); 
 
app.use(express.json());
 
app.get('/', (req: Request, res: Response) => {
    res.json({message: "Hello World!"});
})
 
app.get('/clients', (req: Request, res: Response) => { 
    console.log("Returned all the clients!");
    res.json([{id:1,nome:'Erico'}]);
}) 
 
app.listen(3000, () => console.log("Server listen on port 3000..."));