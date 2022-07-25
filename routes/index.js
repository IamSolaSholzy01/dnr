var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('*', (req, res, next) => {
  console.log(req.query.go)
  if(req.query.go){
    if(!(String(req.query.go).startsWith('https://') || String(req.query.go).startsWith('http://'))) {
      return res.redirect('https://' + req.query.go)
    }
    return res.redirect(req.query.go);
  }
  else res.render('index', { title: 'DoNotReply' });
})

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
