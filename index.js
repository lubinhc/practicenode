import express from 'express';
import dotenv from 'dotenv';
import {USERS_NEW} from './users.js'
    
    dotenv.config();
    const port = 3000;
    const expressApp = express();
    
    

    expressApp.use(express.json()); 
    expressApp.use(express.text()); 

    //obtener los detalles de una cuenta apartir del guid
    expressApp.get('/account/:guid', (req,res)=>{
        const { guid } = req.params;
        const user = USERS_NEW.find(user => user.guid === guid);
        if(!user) return res.status(404).send();
        res.send(user);
    });
    //crear una nueva cuenta a partir de guid y name
    expressApp.post('/account', (req,res)=>{
        const { guid, name } = req.body;

        if(!name || !guid) return res.status(400).send();

        const user = USERS_NEW.find(user => user.guid === guid);
        if(user) return res.status(409).send();

        USERS_NEW.push({
            guid, name
        });
        res.send();
    })
    //actualizar el nombre de una cuenta
    expressApp.patch('/account/:guid', (req,res)=>{
        const { guid } = req.params;
        const { name } = req.body;

        if(!name) res.status(400).send();

        const user = USERS_NEW.find(user => user.guid === guid)

        if (!user) res.status(404).send();

        user.name = name;

        return res.send();
    })
    //eliminar una cuenta
    expressApp.delete('/account/:guid', (req,res)=>{
        const { guid } = req.params;
        const userIndex = USERS_NEW.findIndex(user => user.guid === guid);
        if(userIndex === -1) return res.status(404).send();

        USERS_NEW.splice(userIndex, 1);
        res.send();
    })

    expressApp.listen(port, () => console.log(`servidor levantado en el puerto ${port}`));


