const Result = require('../models/result');

exports.allResults = (req, res) => {
    Result.find()
    .populate('user_id')
    .exec()
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        if(err) {
            res.status(400).json({
                error: err
            })
        }
    })
}

exports.userResults = (req, res) => {
    Result.find({user_id: req.params.id})
    .populate('user_id')
    .exec()
    .then(results => {
        res.status(200).json(results);
    })
    .catch(err => {
        if(err) {
            res.statu(500).json({
                error: err
            })
        }
    })
}

exports.createResult = (req, res) => {
    var result = new Result({
        wpm: req.body.wpm,
        accuracy: req.body.accuracy,
        played_at: Date.now(),
        user_id: req.body.user_id
    })
    result.save(err => {
        if(err) {
            res.status(500).json({
                error: err
            })
        }else {
            res.status(200).json({
                msg: "Result created."
            })
        }
    })
}
