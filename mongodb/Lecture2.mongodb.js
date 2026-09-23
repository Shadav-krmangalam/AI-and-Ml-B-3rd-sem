use("AiMl")

//to find the count of retreiving documents

// db.students.find().count()

//to find the documents by skipping and limiting (Pagination)
// db.students.find().skip(4).limit(6)




// db.students.find({"age":{$lte:18}},{
//     _id:0,
//     studentId:1,
//     name:1,
//     course:1

// })

//to find the ranged doc.
// db.students.find({"attendance":{
//     $gte:80,
//     $lte:90
// }})


