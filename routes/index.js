var express = require('express');
var router = express.Router();
var main = require('../public/javascripts/main')

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
        "Date": "2012-09-04",
        "Distance": 20
    },  { "Name": "James Sanderson",
        "Age": 16,
        "Date": "2012-04-04",
        "Distance": 20
    },  { "Name": "Tony Montana",
          "Age": 12,
          "Date": "2013-12-04",
          "Distance": 30
    },  { "Name": "Tony Montana",
          "Age": 19,
          "Date": "2013-03-04",
          "Distance": 21
    },  { "Name": "Tony Montana",
          "Age": 8,
          "Date": "2014-05-04",
          "Distance": 65
    },  { "Name": "Tony Montana",
          "Age": 12,
          "Date": "2013-09-04",
          "Distance": 102
    },  { "Name": "Tony Montana",
          "Age": 14,
          "Date": "2015-08-04",
          "Distance": 48
    },  { "Name": "James Sanderson",
          "Age": 9,
          "Date": "2013-11-04",
          "Distance": 200
    }, { "Name": "James Sanderson",
            "Age": 9,
            "Date": "2013-02-04",
            "Distance": 200
        }
    ]

    res.send( JSON.stringify(graphData) )
})

router.get('/form', function(req, res, next) {
    res.render('form' );
})

router.post('/form', function(req, res, next) {
    data = req.body;
    main.James(data);
    res.redirect('/form');
    // res.send( data );
})

module.exports = router;
