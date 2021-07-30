import express from 'express';
import fs from 'fs';
import authenticate from '../middlewares/authenticate';
import BP from '../models/bloodPressureRecord';


let router = express.Router();

function checkCondition(low, high) {
  let condition;
  if (low <= 60 || high <= 90) {
    condition = "Low BP";
  } else if (low <= 80 && high <= 120) {
    condition = "Normal BP";
  } else if (low <= 80 && high <= 130) {
    condition = "High BP";
  } else {
    condition = "Hypertension Stage";
  }
  return condition;
}




router.post('/', authenticate, (req, res) => {
  let image = req.files['photo'][0];
  let tempPath = ("upload_files/" + req.body.user_id.toString() + "-" + Date.now().toString() + '.png');
  fs.createReadStream(image.path).pipe(fs.createWriteStream(tempPath));
  if(req.body !== undefined) {
    const lower_bp = req.body.lower_bp;
    const higher_bp = req.body.higher_bp;
    const patient_condition = checkCondition(lower_bp, higher_bp);
    const name = req.body.name;
    const user_id = req.body.user_id;
    const img_url = tempPath;
    BP.forge({lower_bp, higher_bp, patient_condition, name, user_id, img_url}).save().then((result)=> {
      res.send({
        "status":200,
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
      "status": 500,
      "message": "Failure",
      "error": "No body received"
    })
  }
});

router.get('/:id', authenticate, (req, res)=> {
  BP.query({
    where: {user_id: req.params.id }
  }).orderBy('-id').fetchAll().then((records)=> {
    res.send({records});
  });
});

router.get('/count/:id', authenticate, (req, res)=> {
  BP.query( function(qb){
    qb.where({user_id:req.params.id}).count('* as count').groupBy('patient_condition');
    qb.select(["patient_condition"]);
  }).fetchAll().then((records)=>{
    BP.query({ where: {user_id: req.params.id}}).count().then((count)=> {
      res.send({count, records});
    })
})
});


export default router;
