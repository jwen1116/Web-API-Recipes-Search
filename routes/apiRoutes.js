const axios = require("axios");
const router = require("express").Router();
const db = require("../models");

//const key = process.env.MY_API_KEY;
const id = 'c9c317f1';
const key = 'bdaab22b64494040c8739fc7e2ae5d57';



router.get("/recipes/:title", (req, res) => {
  var title = req.params.title.replace(/\s+/g, "+");
  console.log(`https://api.edamam.com/search?q=chicken&app_id=${id}&app_key=${key}&q=${title}`);
  axios
    .get(`https://api.edamam.com/search?app_id=${id}&app_key=${key}&q=${req.params.title}`)
    .then(({ data }) => {
      console.log(data);
      
      res.json(data); 
    })
    .catch(err => res.status(422).json(err));
});


router.post("/recipes", (req, res) => {
  db.Recipe.create(req.body).then(response => res.json(response))
  .catch(err => res.json(err));
});

router.get("/recipes", (req, res) => {
  db.Recipe.find({}).then(response => {
    res.json(response)})
  .catch(err => res.json(err));
});

router.delete("/recipes/:id", (req, res) => {
  var id = req.params.id;
  db.Recipe.deleteOne({_id:id}).then(response => {
    res.json(response)
  }).catch(err => res.json(res));
});

module.exports = router;

