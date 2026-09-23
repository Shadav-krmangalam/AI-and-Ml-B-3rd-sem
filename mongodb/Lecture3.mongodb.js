use("AiMl")

db.students.aggregate([

    {//match
       
        $match:{
            attendance:{
                $gte:80
            }
        }
    },
    {//group
    
        $group:{

            _id:"$course"
        }

    }
    // {//project

    // }
])