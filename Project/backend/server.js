require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks')
const app = express();

app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
});

app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed', err);
    });

