import React, {Component} from "react";
import SearchBar from "../components/SearchBar";
import ResultsContainer from "../components/ResultsContainer";
import API from "../utils/API";
import SaveButton from "../components/SaveButton";
import RequestButton from "../components/RequestButton";
import FormButton from "../components/FormButton";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
const axios = require('axios');

class Recipes extends Component {
    state = {
        recipes: [],
        //expectedCaloriesList: [],
        title: "",
        //ingredients: [],
        image: "",
        source: "",
        link: "",
        saved: false,
        modalIsOpen: false,
        caloriesText: "",
        fatText: "",
        proteinText: "",
        carbsText: ""
    };

    //expectedCalories = [];
    
   

    toggleModal () {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }
    componentDidMount() {
        // this.loadBooks();
    };

    checkState() {
        // for (var i = 0; i < this.state.books.length; i++) {
            // if(this.state.books.volumeInfo.imageLinks) {
            // console.log(this.state.books[i].volumeInfo.imageLinks);
            // }
        // }
    }

    handleRequest = recipe => {
        this.state.caloriesText = "";
        this.state.fatText = "";
        this.state.proteinText = "";
        this.state.carbsText = "";
        axios.get(`https://api.spoonacular.com/recipes/guessNutrition?apiKey=a0bece895fc54992b366eb36481e0618&title=${recipe.recipe.label}`)
        .then((response)=>{
            //alert("Estimated Calories: " + response.data.calories.value)
            if (response.data.status === 'error')  {
                console.log("No")
                var text1 = "Estimated Calories: No data returned from API";
                var text2 = "Estimated Fat: No data returned from API" ; 
                var text3 = "Estimated Protein: No data returned from API";
                var text4 = "Estimated Carbs: No data returned from API";
                this.setState({
                    caloriesText: text1,
                    fatText: text2,
                    proteinText: text3,
                    carbsText: text4
                });
                
               
            }
            else if (response.data.status === 'failure') {
                console.log("No")
                var text1 = "Estimated Calories: Daily Limit Exceeded";
                var text2 = "Estimated Fat: Daily Limit Exceeded" ; 
                var text3 = "Estimated Protein: Daily Limit Exceeded";
                var text4 = "Estimated Carbs: Daily Limit Exceeded";
                this.setState({
                    caloriesText: text1,
                    fatText: text2,
                    proteinText: text3,
                    carbsText: text4
                });
                
            }
            else {
                console.log("Yes")
                var text1 = "Estimated Calories: " + response.data.calories.value + " " + response.data.calories.unit;
                var text2 = "Estimated Fat: " + response.data.fat.value + " " + response.data.fat.unit; 
                var text3 = "Estimated Protein: " + response.data.protein.value + " " + response.data.protein.unit;
                var text4 = "Estimated Carbs: " + response.data.carbs.value +  " " + response.data.carbs.unit;
                this.setState({
                    caloriesText: text1,
                    fatText: text2,
                    proteinText: text3,
                    carbsText: text4
                });
            }
        })
        this.toggleModal();
    }
                        
    handleSave = recipe => {
        // console.log(book.volumeInfo.title + 
        //     book.volumeInfo.authors +
        //     book.volumeInfo.description +
        //     book.volumeInfo.infoLink);
            API.saveRecipe({
                title:recipe.recipe.label,
                //ingredients: recipe.ingredients,
                //link: recipe.href,
                link:recipe.recipe.url,
                source: recipe.recipe.source,
                //nutrientInfo:this.expectedCalories,
                //actualCalories: recipe.recipe.calories,
                image: recipe.recipe.image
            }).then(res => console.log("Returned from DB")).catch(err => console.log(err));
            alert('Recipe Saved!');
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title === '' ){
            alert("Please enter an ingredient!");
        }
        else {
            
            console.log(this.state.title);
            API.searchAPI({
                title: this.state.title
            }).then(res => {
                console.log('json ' , res.data)
                if (res.data.count === 0){
                    alert("No recipe found in API")
                }
                for(var i = 0; i < res.data.hits.length; i++) {
                    console.log("Image:" + res.data.hits[1]);
                    
                    
                  

                    if(res.data.hits[i]) {
                        this.setState({
                            recipes: res.data.hits
                        })
                    }

                    
                    
                    
                }
                this.checkState();
                
            })
            
            .catch(err => console.log(err));
            
        }
    
    };


    render() {
        return(
            <Container fluid>
            <Jumbotron>
            {"Recipes Search"}
            </Jumbotron>
                <form>
                    <SearchBar
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Enter an ingredient or a dish here!"
                        />
                    <FormButton
                        onClick={this.handleFormSubmit}
                    >Search Recipe
                    </FormButton>
                </form>
                {this.state.recipes.length ? (
                    <ResultsContainer fluid>
                        {this.state.recipes.map((recipe, index) => {
                            return (<div className="col-sm-12 col-md-4 col-lg-4 col-xl-3"><Card key={recipe._id}
                            title={recipe.recipe.label}
                            //ingredients={recipe.ingredients}
                            //image={recipe.thumbnail}
                            link={recipe.recipe.url}
                            source={recipe.recipe.source}
                            //expectedCalories={this.state.expectedCaloriesList[this.state.expectedCaloriesList[index]]}
                            //actualCalories={recipe.recipe.calories}
                            // image={book.volumeInfo.imageLinks.smallThumbnail}
                            image={recipe.recipe.image !== undefined ? 
                            recipe.recipe.image : "https://via.placeholder.com/100"}
                            />
                            <RequestButton onClick={() => this.handleRequest(recipe)}>
                            {recipe.recipe.label}
                            </RequestButton>
                            <SaveButton onClick={() => this.handleSave(recipe)}>
                            {recipe.recipe.label}
                            </SaveButton>
                            </div>
                            );
                        })}
                        
                        <Modal isOpen = {this.state.modalIsOpen}>
                            <ModalHeader toggle={this.toggleModal.bind(this)}>Estimated Nutrition</ModalHeader>
                            <ModalBody>{this.state.caloriesText}</ModalBody>
                            <ModalBody>{this.state.fatText}</ModalBody>
                            <ModalBody>{this.state.proteinText}</ModalBody>
                            <ModalBody>{this.state.carbsText}</ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal.bind(this)}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </ResultsContainer>
                ) : (
                    <h3>No Results to Display</h3>
                )}
            </Container>
        );
    };
}

export default Recipes;