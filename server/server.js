const express = require('express');
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js');
const cors  = require('cors')
const db = mysql.createConnection(mysqlcredentials);


const server = express();
server.use(cors());
server.use( express.static(__dirname +'/components') );
server.use(express.urlencoded({extended:false}));
server.use(express.json())

//=======READ=====================================================
server.get('/api/destinations',(req,res,next)=>{
    const query = `SELECT * from destination`
    db.query(query,(error,data)=>{
        if (error){
            return next(error);
        }
        res.send({success:true,data});
    })
})
//=======INSERT=====================================================
server.post('/api/destinations',(req,res,next)=>{
    const {name,country,knownFor,mustEat,mustDo}=req.body
    const query = 'INSERT INTO `destination` SET `destination`= ?, `country`=? ,`knownFor` = ?, `mustEat`= ? , `mustDo` = ? '
    db.query(query,[name,country,knownFor,mustEat,mustDo],(error)=>{
        if (error){
            return next(error);
        }
        res.send({success:true})
    })
})
//=======DELETE=====================================================
server.delete('/api/destinations/:destination_id',(req,res,next)=>{
    const query = 'DELETE FROM `destination` WHERE `id` = ' + req.params.destination_id;
    db.query(query,(error,data)=>{
        if (error){
            return next(error);
        }
        res.send({success:true,data});
    })
})
//=======UPDATE=====================================================
server.post('/api/update-destination',(req,res,next)=>{
    const {name,country,knownFor,mustEat,mustDo,id}=req.body
    const query = 'UPDATE `destination` SET `destination`= ? , `country`= ?, `knownFor` = ?, `mustEat`=?, `mustDo` = ? WHERE `destination`.`id`= ?'
    db.query(query,[name,country,knownFor,mustEat,mustDo,id],(error)=>{
        if (error){
            return next(error);
        } else {
            res.send({success:true})
        }
    })
});

server.use((error,req,res,next)=>{
    const output = {
        success:false,
        error:"Internal server error"
    };
    console.error(error);
    res.status(500).send(output);
})


server.listen(3001,()=>{
    console.log('listening on port 3001');
})
