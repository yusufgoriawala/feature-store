import { captureRejectionSymbol } from "events";

const express = require('express');
const featureModel = require('../Model/Feature');
const app = express();

app.get('/api/features', async (req:any, res:any)=>{
    const features = await featureModel.find({});

    try{
        if(features.length > 0){
            res.send(features);
        }
        else{
            res.send('No Records Found');
        }
    } catch(err){
        res.status(500).send(err);
    }
});

app.get('/api/features/search/:feature_id', async (req:any, res:any) => {
	let id = req.params.feature_id;
    const features = await featureModel.find({});

    try{
        let filterRes = features.filter((x:any)=>x.feature_id === id);
        if(features.length > 0 && filterRes.length >= 1){
            res.status(200).send(filterRes.length);
        }
        else{
            res.send(`No Record with ID: ${id} Found`);
        }
    } catch(err){
        res.status(500).send(err);
    } 
});

app.post('/api/features', async(req:any, res:any)=>{
    const feature = new featureModel(req.body);

    try{
        await feature.save();
        res.send(feature);
    } catch(err){
        res.status(500).send(err);
    }
});

app.delete('/api/features/:feature_id', async(req:any, res:any)=>{
    try{
        const feature = await featureModel.findByIdAndDelete(req.params.feature_id)
    
        if(!feature) { res.status(404).send('No item found');}
        res.status(200).send();
    }catch(err){
        res.status(500).send(err);
    }
});

app.put('/api/features/:feature_id',async(req:any, res:any)=>{
    try{
        const feature = await featureModel.findByIdAndUpdate(req.params.feature_id,req.body);
        await featureModel.save();
        res.send(feature);
    } catch(err){
        res.status(500).send(err);
    }
});

module.exports=app;
