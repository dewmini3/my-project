import Student from "../models/student.js";


export  function getStudents(req,res){
         Student.find().then(
            (student)=>{
                res.json(student);
            }
         ).catch(()=>{
            res.json({
                message:"faild to fetch student"
            });
         });
        }
     export function createStudent(req,res){
        if(req.user == null){
            res.status(403).json({
                message :"Please login to create student"
            })
            return
        }
        if(req.user.role !="admin"){
            res.status(403).json({
                message:"Please login as an admin to create student"
            })
            return
        }

         const student= new Student(
                 {
                   name:req.body.name,
                   age:req.body.age,
                   email:req.body.email
      
                 });
                 student.save().then(()=>{
                  student.json({
                      message:"Student save successfully",
                  });
              }).catch(()=>{
                  console.log("Failed to save student");
              });
  
            }
        