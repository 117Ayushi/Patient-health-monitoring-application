import express from 'express';
import authenticate from '../middlewares/authenticate';
import Temperature from '../models/temperatureRecord';

let router = express.Router();

function checkCondition(temperature) {
  let condition;
  if (temperature<=96) {
    condition = "Low Temperature";
  } else if(temperature<=100){
    condition = "Normal Temperature";
  } else {
    condition =  "High Temperature";
  }
  return condition;
}

router.post('/', authenticate, (req, res)=> {
  if(req.body !== undefined) {
    const temperature = req.body.temperature;
    const patient_condition = checkCondition(temperature);
    const name = req.body.name;
    const user_id = req.body.user_id;

    Temperature.forge({ temperature, patient_condition, name, user_id}).save().then((result)=> {
      res.send({
        "status": 200,
        "message": "ok"
      })
    }).catch((err)=> {
      res.send({
        "status": 500,
        "message": "Failure",
        "error": err
      })
    })
  } else {
    res.send({
      "error": "No req body is provided"
    })
  }
});


router.get('/:id', authenticate, (req, res)=> {
  Temperature.query({
    where: {user_id: req.params.id }
  }).orderBy('-id').fetchAll().then((records)=> {
    res.send({records});
  });
});


router.get('/count/:id', authenticate, (req, res)=> {
  Temperature.query( function(qb){
    qb.where({user_id:req.params.id}).count('* as count').groupBy('patient_condition');
    qb.select(["patient_condition"]);
  }).fetchAll().then((records)=>{
    Temperature.query({ where: {user_id: req.params.id}}).count().then((count)=> {
      res.send({count, records});
    })
})
});



export default router;
