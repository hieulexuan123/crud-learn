const mysql=require('mysql');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'quenmkroi123',
    database: 'employeedb'
});

db.connect((err)=>{
    if (!err)
        console.log('Connect successfully');
    else console.log(err);
})


//get all employees
app.get('/employees',(req,res)=>{
    db.query('Select * from employee',(err,results)=>{
        if (!err)
            if (results.length===0) res.status(404).send('Not exist');
            else res.send(results);
        else console.log(err);
    })
})

//get an employee
app.get('/employees/:id',(req,res)=>{
    const {id}=req.params;
    db.query(`Select * from employee where empId=${id}`,(err,results)=>{
        if (!err)
            if (results.length===0) res.status(404).send('Not exist');
            else res.send(results);
        else console.log(err);
    })
})

//delete an employee
app.delete('/employees/:id',(req,res)=>{
    const {id}=req.params;
    db.query(`delete from employee where empId=${id}`,(err,results)=>{
        if (!err)
           res.send('Sucessful delete');
        else console.log(err);
    })
})

//create an employee
app.post('/employees',(req,res)=>{
    const {name,empCode,salary}=req.body;
    console.log(req.body);
    db.query(`Insert into employee (name,empCode,salary) values ('${name}','${empCode}',${salary})`,(err,results)=>{
        if (!err)
           res.send("insert successfully");
        else console.log(err);
    })
})


