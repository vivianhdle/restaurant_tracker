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




server.listen(3001,()=>{
    console.log('carrier has arrived');
}) 

// INSERT INTO `restaurant` (`id`, `name`, `cuisine`, `inOrOut`, `expense`, `partyOf`) VALUES (NULL, 'In-N-Out', 'American', 'Fast Food', '$', 'unlimited'), (NULL, 'Coco Ichibanya', 'Japanese', 'Either', '$', 'max 8');