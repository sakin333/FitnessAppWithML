const mongoose=require('mongoose')
const generate_workout= new mongoose.Schema({
    bodyPart:String,
    equipment:String,
    gifUrl:Number,
    id:Number,
    name:String,
    target:String,
    level:String,
    intensity:Number,
    reps:Number,
    time:Number,
    two_sides:Boolean,
    stretching:Boolean
})
const generate_workout_model=mongoose.model('generate_workout',generate_workout)
module.exports=generate_workout_model