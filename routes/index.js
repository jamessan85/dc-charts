var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Goose' });
});

router.get('/data', function(req, res, next) {

    graphData = [{
        "Name": "James Sanderson",
        "Age": 15,
        "Date": "2012-08-04",
        "Distance": 20
    }, {
        "Name": "James Sanderson",
        "Age": 15,
        "Date": "2012-08-04",
        "Distance": 60
    }, { "Name": "Tony Montana",
          "Age": 15,
          "Date": "2013-08-04",
          "Distance": 60 }
    ]

    res.send( JSON.stringify(graphData) )
})

router.get('/form', function(req, res, next) {
    res.render('form')
})

router.post('/get_form_data', function(req, res, next) {
    data = req.body;
    console.log(data);
    res.redirect('/');
})



module.exports = router;
