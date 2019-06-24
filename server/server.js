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
server.get('/api/restaurants',(req,res)=>{
    db.connect(()=>{
        const query = `SELECT * from restaurant`
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
server.post('/api/restaurants',(req,res)=>{
    const {name,cuisine,inOrOut,expense,partyOf}=req.body
    db.connect(()=>{
        const query = 'INSERT INTO `restaurant` SET `restaurant`="'+name+'", `cuisine`="'+cuisine+'", `inOrOut` = "'+inOrOut+'", `expense`="'+expense+'", `partyOf` = "'+partyOf+'"'
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
server.delete('/api/restaurants/:restaurant_id',(req,res)=>{
    if(req.params.restaurant_id === undefined){
        res.send({
            success:false,
            error:'must provide restaurant ID to delete'
        })
        return;
    }
    db.connect(()=>{
        const query = 'DELETE FROM `restaurant` WHERE `id` = ' + req.params.restaurant_id;
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
server.post('/api/update-restaurant',(req,res)=>{
    const {name,cuisine,inOrOut,expense,partyOf,id}=req.body
    db.connect(()=>{
        const query = 'UPDATE `restaurant` SET `restaurant`="'+name+'", `cuisine`="'+cuisine+'", `inOrOut` = "'+inOrOut+'", `expense`="'+expense+'", `partyOf` = "'+partyOf+'" WHERE `restaurant`.`id`=' + id
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
