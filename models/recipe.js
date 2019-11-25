const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String},
    link: {type: String},
    source: {type:String},
    saved: {type: Boolean}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
