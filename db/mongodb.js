const { default: mongoose } = require('mongoose');
mongoose.connect(process.env.url)
.then(()=>{
    console.log('Connected to mongodb Successfully');
})
.catch(()=>{
    console.log('Error!!! Cannot connect to the database');
})