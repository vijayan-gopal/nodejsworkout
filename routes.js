const workout = require('./repos/workoutDB')

const routes = (app)=>{
    app.get('/fetchcategory',(req,res)=>{
        workout.fetchCategory((err,docs)=>{
         if(err)
         {
          var usr_message = {"message": "Network problem in loading your workout, try after sometime"}
          res.status(501).send(usr_message)
         }
         else
         {
          res.status(200).send(docs)
         }
        })
    });

    app.post('/addcategory',(req,res)=>{
        var category = req.body
        workout.addCategory(category,(err,docs)=>{
            if(err)
            {
             res.status(300).send(docs)
            }
            else
            {
             res.status(200).send(docs)
            }
        })
    });

    app.post('/deletecategory',(req,res)=>{
        var category = req.body
        workout.deleteCategory(category,(err,docs)=>{
            if(err)
            {
              res.status(501).send(docs)
            }
            else
            {
              res.status(200).send(docs)
            }
        })
    });

    app.post('/addworkout',(req,res)=>{
        var addWorkoutDoc = req.body
        workout.addWorkout(addWorkoutDoc.workoutDoc,(err,docs)=>{
            if(err)
            {
             res.status(300).send(err)
            }
            else
            {
             res.status(200).send(docs)
            }
        })
    });

    app.put('/updateworkout',(req,res)=>{
        var updateWorkoutDoc = req.body
        workout.updateWorkout(updateWorkoutDoc,(err,docs)=>{
            if(err)
            {
             res.status(300).send(err)
            }
            else
            {
             res.status(200).send(docs)
            }
        })
    });

    app.post('/startworkout',(req,res)=>{
        var startWorkoutDoc = req.body
        workout.startWorkoutActive(startWorkoutDoc,(err,docs)=>{
            if(err)
            {
             res.status(300).send(err)
            }
            else
            {
             res.status(200).send(docs)
            }
        })
    });

    app.put('/endworkout',(req,res)=>{
        var endWorkoutDoc = req.body
        workout.endWorkoutActive(endWorkoutDoc,(err,docs)=>{
            if(err)
            {
             res.status(300).send(err)
            }
            else
            {
             res.status(200).send(docs)
            }
        })
    });
    app.get('/viewallworkout',(req,res)=>{
        workout.viewAllWorkout((err,docs)=>{
         if(err)
         {
          var usr_message = {"message": "Network problem in loading your workout, try after sometime"}
          res.status(501).send(usr_message)
         }
         else
         {
          res.status(200).send(docs)
         }
        })
    });
}
module.exports = routes