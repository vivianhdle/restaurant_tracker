const express = require('express');
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js');
mysqlCredentials.multipleStatements = true;
const cors  = require('cors')
const cron = require('node-cron');
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

const cronNewTable = cron.schedule('0 * * * *', () => {
    console.log("cronNewTable called");
    const query = "CREATE TABLE `travel_wishlist_new` LIKE `travel_wishlist`; RENAME TABLE `travel_wishlest` TO `travel_wishlist_old`, `travel_wishlist_new` TO `travel_wishlist`; INSERT INTO `destination` (`id`, `destination`, `country`, `knownFor`, `mustEat`, `mustDo`) VALUES(1, 'Banff', 'Canada', 'Nature', 'Poutine, maple syrup', 'Camping, hiking, sight seeing'),(2, 'Hong Kong', 'China', 'Cities', 'Chinese', 'Night markets, sight seeing'),(3, 'Pulau Ujong', 'Singapore', 'Business', 'Chinese', 'Gardens by the bay, night mark'),(4, 'Jasper National Park', 'Canada', 'Nature', 'Evil Dave\'s Grill', 'Hiking, camping, sight seeing'),(5, 'Bangkok', 'Thailand', 'Elephants', 'Thai', 'Sight seeing, massages, elepha'),(6, 'New York City', 'United States', 'City life', 'Bagels, pizza', 'Sight seeing, broadway'),(8, 'Hawaii', 'United States', 'Beaches', 'Poke', 'Hiking, beaches, sight seeing'),(9, 'Madrid', 'Spain', 'Music,dance,culture', 'Paella', 'Sight seeing, night life, club'),(10, 'Wellington', 'New Zealand', 'Nature', 'Lamb, Paua', 'Extreme outdoor activities')";
    db.query(query, (error) => {
        if(error){
            console.error('Cron create table error', error);
        }
    });
});
cronNewTable.start();

const cronDropOldTable = cron.schedule('10 * * * *', () => {
    console.log("cronDropTable called");
    const dropOldTableQuery = "DROP TABLE IF EXISTS `travel_wishlist_old`";
    db.query(dropOldTableQuery, error => {
        if(error){
            console.error('Cron drop table error', error);
        }
    });
    
});
cronDropOldTable.start();



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
