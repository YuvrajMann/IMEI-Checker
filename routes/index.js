var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { name: 'Express' });
});
router.post('/checkImei',(req,res,next)=>{
  let imeiNum=req.body.imei;
  imeiNum=parseInt(imeiNum,10);
  let lastDig=imeiNum%10;
  console.log(imeiNum);
  var isValid=true;
  let imeiStr=imeiNum.toString();
  if(imeiStr.length!=15){
    isValid=false;
    res.render('notEnoughLen');
  }
  else{
      let sumDig=(n)=>{
          let a = 0;
          while (n > 0)
          {
              a = a + n % 10;
              n = parseInt(n / 10, 10);
          }
          return a;
      }

      let sum=0;
      for(let i=imeiStr.length;i>=1;--i){
        let digit=imeiNum%10;
        if(i%2==0){
          digit*=2;
        }
        sum+=sumDig(digit);
        imeiNum=parseInt(imeiNum/10,10);
      }

      if(sum%10==0){
        isValid=true;
        res.render('resultDisp',{imeiNum:req.body.imei,isValid:true});
        
      }
      else{
        isValid=false;
      
        let x=sum/10;
        let ceilVal=Math.ceil(x);
        let floorVal=Math.floor(x);
        
        floorVal*=10;
        ceilVal*=10;
        floorVal=sum-floorVal;
        ceilVal=ceilVal-sum;

        let numToadd=-1;
        console.log(sum,ceilVal,floorVal);
        if((lastDig-floorVal)>=0){
          res.render('resultDisp',{imeiNum:req.body.imei,isValid:false,floorVal:floorVal,ceilVal:null});
        }
        else if((lastDig+ceilVal)<=9){
          res.render('resultDisp',{imeiNum:req.body.imei,isValid:false,ceilVal:ceilVal,floorVal:null});
        }
        else{
          res.render('resultDisp',{imeiNum:req.body.imei,isValid:false,ceilVal:null,floorVal:null});
        }
      }
  }
});
module.exports = router;
