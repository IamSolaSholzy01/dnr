var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
const gen = (length = 6) => {
  const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(length)].reduce((a) => a + p[~~(Math.random() * p.length)], '');
};

router.get('*',async (req, res) => {
  if(req.query.link){
    if(!(String(req.query.link).startsWith('https://') || String(req.query.link).startsWith('http://'))) {
      const url = 'https://donotreplysecure.herokuapp.com/?go=' + btoa(req.query.link);
      const postUrl = 'https://api-ssl.bitly.com/v4/shorten'
      const data = {
        "domain": "bit.ly",
        "long_url": url
      }
      token = '95013fb0117e2a4b5e82f88a0371fbd2b2aaa69b';
      try{
        const result = await axios.post(postUrl, data, {
          headers: {Authorization: 'Bearer ' + token}
        });
        console.log(result.data)
        return res.send(`Your link is ${result.data.link}?${gen(25)}`);
      } catch (e) {
        console.log(e);
      }
    }
    return res.send(req.query.link);
  } else if(req.query.go){
    if(!(String(req.query.go).startsWith('https://') || String(req.query.go).startsWith('http://'))) {
      return res.redirect('https://' + atob(req.query.go))
    }
    return res.redirect(req.query.go);
  }
  else res.render('index', { title: 'DoNotReply' });
})

// router.get('*', (req, res, next) => {
//   console.log(req.query.go)
//   if(req.query.go){
//     if(!(String(req.query.go).startsWith('https://') || String(req.query.go).startsWith('http://'))) {
//       return res.redirect('https://' + atob(req.query.go))
//     }
//     return res.redirect(req.query.go);
//   }
//   else res.render('index', { title: 'DoNotReply' });
// })

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
