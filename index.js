import express from 'express';

    const port = 3000;
    const expressApp = express();
    expressApp.listen(port, () => console.log(`servidor levantado en el puerto ${port}`));
    expressApp.use(express.json()); 
    expressApp.use(express.text()); 

    expressApp.post("/cuenta", (req,res)=> {
    console.log(req.query);
    res.send();  
    }); 

    expressApp.put("/producto", (req,res)=> {
    console.log(req.body);
    }); 
  
