import axios from "axios";

export default {
    getRecipes: function() {
        return axios.get("/api/recipes");
    },
    searchAPI: function(query) {
        return axios.get("/api/recipes/" + query.title );
    },
    deleteRecipe: function(id) {
        console.log("Delete request at front-end" + id);
        return axios.delete("/api/recipes/" + id);
    },
    saveRecipe: function(bookData) {
        return axios.post("/api/recipes", bookData);
    }
};