const express = require('express')
const mongoose = require('mongoose');
const app = express()
const dotenv = require('dotenv');
const cors=require("cors");
const bodyParser = require('body-parser');
const path =require('path'); 
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb)=> {
      cb(null, new Date().toISOString().replace( /:/g, '-') + "-" + file.originalname);
    }
  }); 
  const fileFilter = (req, file, cb) => {
    
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
    {  
     cb (null , true);
    }else {
      cb (null , false);
  
    }
  }

//import routes
const authRoute = require('./routes/auth');
const PlaceRouter =require ('./routes/placeRouter');
const programRouter =require ('./routes/programRouter');
dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, (err, done) => {
    if (err)
        console.log(err);
    if (done)
        console.log("database connect ");
})


//midderlware
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(multer({storage: storage, fileFilter: fileFilter}).array('images', 5));
app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));


//route middelwate
app.use('/auth', authRoute);
app.use("/api", PlaceRouter);
app.use("/api", programRouter);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server  is working");
})