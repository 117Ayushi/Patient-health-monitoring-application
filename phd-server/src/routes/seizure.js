import express from 'express';
import authenticate from '../middlewares/authenticate';
import Seizure from '../models/seizureRecord';
import User from '../models/user';
import send_mail from '../scripts/mailer';

let router = express.Router();

function checkcondition(seizure_data, test_duration){
  if(seizure_data[1][1] >= (test_duration/2)){
    return "Seizure Detected"
  } else if (seizure_data[1][1] < (test_duration/4)) {
    return "No Seizure Detected"
  } else {
    return "Chances of Seizure"
  }
}

router.post('/', (req, res)=> {
  if(req.body !== undefined) {
    const patient_mobile = req.body.patient_mobile;
    const test_duration = parseInt(req.body.seizure_data[0][0]+req.body.seizure_data[0][1]+req.body.seizure_data[1][0]+req.body.seizure_data[1][1])
    const patient_condition = checkcondition(req.body.seizure_data,test_duration);
    Seizure.forge({patient_mobile,patient_condition,test_duration}).save().then((result)=> {
      res.send({
        "status":200,
        "message": "ok"
      })
      // Add the code for sending the mail script.
      if(patient_condition !== "No Seizure Detected"){
        User.query({
          where: {mobile: patient_mobile }
        }).fetch().then((record)=> {
          console.log("Inside the send mail",record.attributes);
          send_mail(record.attributes.email,patient_condition);
        }).catch((err)=> {
          console.log("Error while sending the mail");
        })
      }
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



router.get('/:mobile', authenticate, (req, res)=> {
    Seizure.query({
      where: {patient_mobile: req.params.mobile }
    }).orderBy('-id').fetchAll().then((records)=> {
      res.send({records});
    });
  });
  



export default router;
