use("AiMl")

// db.students.aggregate([

//     {//match
       
//         $match:{
//             attendance:{
//                 $gte:80
//             }
//         }
//     },
//     {//group
    
//         $group:{

//             _id:"$course"
//         }

//     }
//     // {//project

//     // }
// ])


// db.students.find({"course":"CSE"})


// db.students.aggregate([
//     {$project:{_id:0}}
// ])

// db.students.aggregate([
//     {
//         $match:{
//             "course":"CSE"
//         }
//     }
// ])



// db.students.aggregate([
//     {
//         $match:{
//             "attendance":{
//                 $gt:85
//             }
//         }
//     }
// ])


// db.students.aggregate([
//     {
//         $match:{
//             "course":"BCA",
//             "attendance":{
//                 $gt:80
//             }
//         }
//     }
// ])



// db.students.aggregate([
//     {
//         $match:{
//             "marks.math":{
                
//                     $gt:80
                
//             }
//         }
//     }
// ])

// db.students.aggregate([
//     {
//         $group:{
//             _id:"$course",
//             NumberofStudents:{
//                 $sum:1
//             }
//         }
//     }
// ])


// db.students.aggregate([
//     {
//         $group:{
//             _id:"$course",
//             avgAttendance:{
//                 $avg:"$attendance"
//             }
//         }
//     }
// ])


// db.students.aggregate([
//     {
//         $group:{
//             _id:"$course",
//             MaxMathMarks:{
//                 $max:"$marks.math"
//             }
//         }
//     }
// ])

// db.students.aggregate([
//     {
//         $group:{
//             _id:"$course",
//             avgMathMarks:{
//                 $avg:"$marks.math"
//             }
//         }
//     }
// ])


// db.students.aggregate([
//     {
//         $group:{
//             _id:"$city",
//             totalStudents:{
//                 $sum:1
//             }
//         }
//     }
// ])

// db.students.aggregate([
//     {
//         $match:{
//             "course":"CSE"
//         }
//     },
//     {
//         $group:{
//             _id:null,
//             avgAtt:{
//                 $avg:"$attendance"
//             }
//         }
//     }
// ])


// db.students.aggregate([
//     {
//         $match:{
//             "course":"BCA"
//         }
//     },
//     {
//         $group:{
//             _id:null,
//             maxMathMarks:{
//                 $max:"$marks.math"
//             }
//         }
//     }
// ])


// db.students.aggregate([

//     {
//         $match:{
//             "course":"CSE",
//             "attendance":{
//                 $gt:80
//             }
//         }
//     },
//     {
//         $group:{
//             _id:null,
//             numberofSt:{
//                 $sum:1
//             }
//         }
//     }
// ])


// db.students.aggregate([
//     {
//         $project:{
//             name:1,
//             totalmarks:{
//                 $add:["$marks.math","$marks.dbms","$marks.web"]
//             }
//         }
//     },
//     {
//         $sort:{
//             "totalmarks":-1
//         }
//     }
// ])


