use("AiMl")


// db.createCollection("students")


// db.students.insertOne(
//     {"name":"Alex","age":20,"rollno":"123456"}
// )

// db.students.insertMany([{
//     "name":"Jack","age":21,
//     "rollno":"123457"
// },{
//     "name":"Sara",
//     "age":23,
//     "rollno":"123458"
// },
// {
//     "name":"Victor",
//     "age":21,
//     "rollno":"123459"
// }])


//to find all the data from db
// db.students.find()



// to find the first occurence of matched document

// db.students.findOne({"rollno":"123457"})

// to update the doc

// db.students.updateOne(
//     {"rollno":"123458"},
//     {
//    $set:{
//     "name":"JOY"
//    }

// })


// db.students.updateOne(
//     {"rollno":"123456"},
//     {
//         $set:{
//             "name":"Simon"
//         }
//     }
// )

// To delete One document

// db.students.deleteOne({"name":"JOY"})


// To delete Multiple Document

db.students.deleteMany(
    {"name":"David"}
)