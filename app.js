'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var app = express();

//DB
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('we have a connection');
});

mongoose.connect('mongodb://localhost:27017/banddb');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.appname = 'Band App';

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

//Model
var Schema = mongoose.Schema;

var bandSchema = new Schema({
    bandname: String,
    createdate: {
        type: Date,
        default: Date.now
    },
    contact: {
        type: String,
        default: 'pinky@possible.com'
    }
});

var BandModel = mongoose.model('Band', bandSchema);

//route
app.get('/', function(req, res) {
    res.render('index', {
        title: app.locals.appname
    });
});


//Rest API

/**
 * Create a new entry
 */
app.post('/bandList', function(req, res) {
    var band;
    band = new BandModel({
        bandname: req.body.name
    });
    band.save(function(err) {
        if (!err) {
            //return html for one entry.
            return res.render('bandListItem', {
                'band': band
            });
        } else {
            return console.log(err);
        }
    });
});

/**
 * GET all entries
 */
app.get('/bandList', function(req, res) {
    return BandModel.find(function(err, bands) {
        if (!err) {
            return res.render('bandList', {
                'bandList': bands
            });

        } else {
            return console.log(err);
        }
    });
});

/**
 * GET a specific entry based on id
 */
app.get('/bandList/:id', function(req, res) {
    return BandModel.findById(req.params.id, function(err, band) {
        if (!err) {
            return res.send(band);
        } else {
            return console.log(err);
        }
    });
});


/**
 * UPDATE a specific enry based on an id.
 */
app.put('/bandList/:id', function(req, res) {
    return BandModel.findById(req.params.id, function(err, band) {
        band.bandname = band.bandname + ' updated';
        return band.save(function(err) {
            if (!err) {
                console.log('updated');
            } else {
                console.log(err);
            }
            return res.send(band);
        });
    });
});

/**
 * DELETE an entry by id.
 */
app.delete('/bandList/:id', function(req, res) {
    return BandModel.findById(req.params.id, function(err, band) {
        return band.remove(function(err) {
            if (!err) {
                console.log('removed');
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });

});

//start server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
