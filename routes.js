const workout = require('./repos/workoutDB')

const routes = (app)=>{
    app.get('/',(req,res)=>{
        workout.fetchCategory((err,docs)=>{
            res.json(docs)
        })
    });

    app.post('/add',(req,res,next)=>{
        var category = req.body
        workout.addCategory(category,(err,docs)=>{
            if(err)
            {
             next(err)
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
             next(err)
            }
            else
            {
             res.status(200).send(docs)
            }
        })
    });
}
module.exports = routes