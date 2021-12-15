//jshint esversion:6
const express= require("express");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( 'public'));

app.get("/", (req,res) => {
  res.render("home");
});

app.get("/home", (req,res) => {
  res.render("home");
});


app.post("/", (req,res) => {
  const query = req.body.movieName;
  const url = "https://www.omdbapi.com/?apikey=a791e4c1&t=" + query;
  axios.get(url)
  .then(function(response){
    if(response.data.Response === "True"){
      res.render ('moviePage', {
        moviePoster: response.data.Poster,
        movieName: response.data.Title,
        movieYear: response.data.Year,
        movieGenre: response.data.Genre,
        movieDirector: response.data.Director,
        movieWriter: response.data.Writer,
        movieActors: response.data.Actors,
        moviePlot: response.data.Plot,
        movieLanguage: response.data.Language,
        movieCountry: response.data.Country,
        movieAwards: response.data.Awards,
        imbdRating: response.data.imdbRating
      });
    }
    else {
      res.render("error");
    }
  });
});

app.post("/back", (req,res) => {
  res.render("home");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
