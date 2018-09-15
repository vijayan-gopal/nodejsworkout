const workout = require('./repos/workoutDB')

const routes = (app)=>{
    app.get('/',(req,res)=>{
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

    app.post('/add',(req,res)=>{
        var category = req.body
        console.log(category)
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

    app.post('/delete',(req,res)=>{
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
}
module.exports = routes