import express from 'express';
import fs from 'fs';

import authenticate from '../middlewares/authenticate';
import ECG from '../models/electroCardioGraphyRecord';

let router = express.Router();

function checkCondition(heartRate) {
  let condition;
  if (heartRate<=80) {
    condition = "Low HeartRate";
  } else if (heartRate<=160) {
    condition = "Normal HeartRate";
  } else {
    condition = "High HeartRate"
  }
  return condition;
}

router.post('/', authenticate, (req, res)=> {
  let image = req.files['photo'][0];
  let tempPath = ("upload_files/" + req.body.user_id.toString() + "-" + Date.now().toString() + '.png');
  fs.createReadStream(image.path).pipe(fs.createWriteStream(tempPath));
  if (req.body !== undefined) {
    const heart_rate = req.body.heart_rate;
    const patient_condition = checkCondition(heart_rate);
    const user_id = req.body.user_id;
    const name = req.body.name;
    const img_url = tempPath;
    ECG.forge({heart_rate, patient_condition, user_id, name, img_url}).save().then((result)=> {
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
      "error": "Error in request body"
    })
  }
});




router.get('/:id', authenticate, (req, res)=> {
  ECG.query({
    where: {user_id: req.params.id }
  }).orderBy('-id').fetchAll().then((records)=> {
    res.send({records});
  });
});


router.get('/count/:id', authenticate, (req, res)=> {
  ECG.query( function(qb){
    qb.where({user_id:req.params.id}).count('* as count').groupBy('patient_condition');
    qb.select(["patient_condition"]);
  }).fetchAll().then((records)=>{
    ECG.query({ where: {user_id: req.params.id}}).count().then((count)=> {
      res.send({count, records});
    })
})
});

export default router;
