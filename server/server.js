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
server.get('/api/destinations',(req,res)=>{
    db.connect(()=>{
        const query = `SELECT * from destination`
        db.query(query,(error,data)=>{
            const output={
                success:false
            }
            if (!error){
                output.success=true;
                output.data = data;
            } else {
                output.error = error;
            }
            res.send(output);
        })
    })
})
//=======INSERT=====================================================
server.post('/api/destinations',(req,res)=>{
    const {name,country,knownFor,mustEat,mustDo}=req.body
    db.connect(()=>{
        const query = 'INSERT INTO `destination` SET `destination`="'+name+'", `country`="'+country+'", `knownFor` = "'+knownFor+'", `mustEat`="'+mustEat+'", `mustDo` = "'+mustDo+'"'
        db.query(query,(error,data)=>{
            const output={
                success:false,
                error
            }
            if (!error){
                res.send({success:true})
            } else {
                res.send({output});
            }
        })
    })
})
//=======DELETE=====================================================
server.delete('/api/destinations/:destination_id',(req,res)=>{
    if(req.params.destination_id === undefined){
        res.send({
            success:false,
            error:'must provide destination ID to delete'
        })
        return;
    }
    db.connect(()=>{
        const query = 'DELETE FROM `destination` WHERE `id` = ' + req.params.destination_id;
        db.query(query,(error,data)=>{
            const output={
                success:false
            }
            if (!error){
                output.success=true;
                output.data = data;
            } else {
                output.error = error;
            }
            res.send(output);
        })
    })
})
//=======UPDATE=====================================================
server.post('/api/update-destination',(req,res)=>{
    const {name,country,knownFor,mustEat,mustDo,id}=req.body
    db.connect(()=>{
        const query = 'UPDATE `destination` SET `destination`="'+name+'", `country`="'+country+'", `knownFor` = "'+knownFor+'", `mustEat`="'+mustEat+'", `mustDo` = "'+mustDo+'" WHERE `destination`.`id`=' + id
        db.query(query,(error,data)=>{
            const output = {
                success:false,
                error
            }
            if (!error){
                res.send({success:true})
            }else{
                res.send({output})
            }
        })
    })
});


server.listen(3001,()=>{
    console.log('carrier has arrived');
})
