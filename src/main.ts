import express from 'express';
import bodyParser, {json} from 'body-parser';
import mongoose from 'mongoose';

const routes = require('./Routes/routes');

const api = require('./Mongo/mongo');
const app = express();
const PORT = 6500;

const mongodburl = 'mongodb://localhost/feature-store';
mongoose.connect(mongodburl,{useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT,()=>{
    console.log(`Server is listening on Port ${PORT}`);
});
