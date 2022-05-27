const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const mongoose = require("mongoose");

const isValidTheatreId = async (req,res, next) =>{
    try {

        // check whether TheatreId it is valid or not
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send({
                message: "Theatre Id Id is not valid"
            })
        }
 
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });
    
        // check whether theatre exists or not
        if (theatre == null) {
            return res.status(400).send({
                message: "Theatre doesn't exist"
            })
        }
        
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyAddTheatre = async (req,res, next) =>{
    try {

        if(!req.body.name || req.body.name == ""){
            return res.status(400).send({
                message: "Theatre name is required"
            })
        }
        else if(!req.body.description || req.body.description == ""){
            return res.status(400).send({
                message: "Theatre description is required"
            })
        }
        else if(!req.body.city || req.body.city == ""){
            return res.status(400).send({
                message: "Theatre city location is required"
            })
        }
        else if(!req.body.pinCode || req.body.pinCode == ""){
            return res.status(400).send({
                message: "Theatre pinCode is required"
            })
        }
        else if(!req.body.totalSeats || req.body.totalSeats == ""){
            return res.status(400).send({
                message: "Theatre Total Seats is required"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const areMoviesValid = async (req,res, next) =>{
    try {
        if(req.body.movies.length > 0){
            Movie.countDocuments({
                _id: {
                    $in : req.body.movies
                }
            }, (err, count)=>{
                if(err){
                    return res.status(400).send({
                        message: "Some internal error"
                    })
                }
                console.log("movie count", count, req.body.movies);
                if(count != req.body.movies.length){
                    return res.status(400).send({
                        message: "Some of the movies are not valid"
                    })
                }else{
                    next();
                }
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const isMovieAvailableInTheatre = async (req,res, next) =>{
    try {

        const theatreHasMovie = await Theatre.findOne({
            _id: req.params.id,
            $in: {
                movies: req.params.movieId
            }
        });

        if(theatreHasMovie == null){
            return res.status(400).send({
                message: "This movie is not available inside this theatre"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const verifyTheatre = {
    isValidTheatreId : isValidTheatreId,
    verifyAddTheatre : verifyAddTheatre,
    areMoviesValid: areMoviesValid,
    isMovieAvailableInTheatre: isMovieAvailableInTheatre
};
module.exports= verifyTheatre;
