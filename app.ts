import express from 'express';
import bodyParser, {json} from 'body-parser';
import { connect } from 'http2';

let mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/feature-store';

let createCollection = () => {
    mongoClient.connect(url, function(err:any, db:any){
        if (err){
            console.log(`Error is: ${err}`);
        }
        let dbo = db.db('feature-store');
        // if(dbo.listConnections({name: 'feature'}).hasNext())
        dbo.createCollection('feature', function(err:any, db:any){
            if (err){
                console.log(`Error is: ${err}`);
            }

            console.log('Collection created');
            // db.close();
        });
    });
}
//createCollection();

//Insert (POST)
var featureStoreObj = {
    feature_id: '1',
    feature_name: 'TestName',
    feature_type:'TestType',
    feature_description: 'TestDescription',
    feature_created_timestamp: new Date(),
    feature_version: 'v1.0',
    feature_owner:'YZG',
    feature_data:[1,2,3]
};

let insertFeature = ()=> { 
    mongoClient.connect(url, function(err:any, db:any){
        if (err){
            console.log(`Error is: ${err}`);
        }
        let dbo = db.db('feature-store');
        dbo.collection('feature').insertOne(featureStoreObj, function(err:any, db:any){
            if (err){
                console.log(`Error while inserting is: ${err}`);
            }

            console.log('1 Feature Inserted');
            // db.close();
        });
    });
}
// insertFeature();

//GetAll
let getAllFeatures = ()=> { 
    mongoClient.connect(url, function(err:any, db:any){
        if (err){
            console.log(`Error is: ${err}`);
        }
        let dbo = db.db('feature-store');
        dbo.collection('feature').find({}).toArray(function(err:any, res:any){
            if (err){
                console.log(`Error while fetching the features: ${err}`);
            }

            if(res.length <= 0){
                console.log('No records to display');
                'No Records';
            } else{
                console.log(res);
                res;
            }
        });
    });
}
 getAllFeatures();

//GetById
let getById = (id:any)=> { 
    mongoClient.connect(url, function(err:any, db:any){
        if (err){
            console.log(`Error is: ${err}`);
        }
        let dbo = db.db('feature-store');
        dbo.collection('feature').find({}, {feature_id: id}).toArray(function(err:any, res:any){
            if (err){
                console.log(`Error while fetching the feature: ${err}`);
            }

            if(res.length <= 0){
                console.log('No records to display');
            }
            else{
                console.log(res);
            }
            // db.close();
        });
    });
}
// getById('1');


//Put(UpdateById)
let updateById = (id:any)=> { 
    mongoClient.connect(url, function(err:any, db:any){
        if (err){
            console.log(`Error is: ${err}`);
        }
        let dbo = db.db('feature-store');
        let myQuery = { feature_id: id };
        let newFeatureValues = {
            $set : {
                feature_name: 'TestTwo',
            }
        };
        dbo.collection('feature').updateOne(myQuery,newFeatureValues,function(err:any, res:any){
            if (err){
                console.log(`Error while updating the feature: ${err}`);
            }

            console.log('1 Feature Updated');
            // db.close();
        });
    });
}
// updateById('1');


//Delete(DeleteById)
let deleteById = (id:any)=> { 
    mongoClient.connect(url, function(err:any, db:any){
        if (err){
            console.log(`Error is: ${err}`);
        }
        let dbo = db.db('feature-store');
        let myQuery = { feature_id: id };
        dbo.collection('feature').deleteOne(myQuery,function(err:any, res:any){
            if (err){
                console.log(`Error while deleting the feature is: ${err}`);
            }

            console.log('Feature Deleted');
            // db.close();
        });
    });
}
// deleteById('1');


const app = express();
const PORT = 6500;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//http-getAll req url = http://localhost:6500/getAllFeatures
app.get("/getAllFeatures",(req:any, res:any)=>{
    res.send('GetAllFeatures Called: ' + getAllFeatures());
})


//http-get req url = http://localhost:6500/getById/id
app.get("/getById/${id}",(req:any, res:any)=>{
    res.send();
})


//http-post req url = http://localhost:6500/post
// app.post("/getAllFeatures",(req:any, res:any)=>{
//     res.send();
// })


//http-put req url = http://localhost:6500/put
// app.put("/getAllFeatures",(req:any, res:any)=>{
//     res.send();
// })


//http-deleteById req url = http://localhost:6500/deleteById/id
app.delete("/deleteById/{id}",(req:any, res:any)=>{
    res.send();
})

app.listen(PORT,()=>{
    console.log(`Server is listening on Port ${PORT}`);
})