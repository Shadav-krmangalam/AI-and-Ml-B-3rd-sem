use("AiMl")

// db.students.find({"course":"BCA"}).explain("executionStats")

// db.students.createIndex({course:1})

// db.students.getIndexes()


//compound index

// db.students.createIndex({course:1,age:1})


// db.students.find({"course":"BBA",age:21}).explain("executionStats")

// db.students.find({attendance:95}).explain("executionStats")


// db.students.find({course:"CSE"}).explain("executionStats")



// db.students.dropIndex("course_1_age_1")



// db.user.find()


//create text index

// db.user.createIndex({description:"text"})

// db.user.find({
//     $text:{$search:"promise"}
// })
