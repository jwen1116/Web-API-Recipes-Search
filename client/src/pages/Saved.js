import React, {Component} from "react";
import ResultsContainer from "../components/ResultsContainer";
import API from "../utils/API";
import DeleteButton from "../components/DeleteButton";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";



class Saved extends Component {
    state = {
        recipes:[]
    };

   

    componentDidMount() {
        this.loadRecipes();
    };

    loadRecipes = () => {
        API.getRecipes({}).then(res => {
            console.log(res);
            this.setState({recipes: res.data})
        })
        .catch(err => console.log(err));
    };

    handleDelete = id => {
        API.deleteRecipe(id).then(res => {
            this.loadRecipes();
        }).catch(err => console.log(err))
    };

    render() {
        return(
            <Container fluid>
            <Jumbotron>
            {"Saved Recipes"}
            </Jumbotron>
                {this.state.recipes.length ? (
                    <ResultsContainer fluid>
                        {this.state.recipes.map(recipe => {
                            return (<div className="col-sm-12 col-md-4 col-lg-4 col-xl-3"><Card 
                            key={recipe._id}
                            title={recipe.title}
                            //authors={recipe.authors}
                            //ingredients={recipe.ingredients}
                            link={recipe.link}
                            actualCalories={recipe.actualCalories}
                            expectedCalories={recipe.expectedCalories}
                            source={recipe.source}
                            //image={recipe.image_url}
                            image={recipe.image}
                            />
                            
                            <DeleteButton onClick={() => this.handleDelete(recipe._id)}>
                            {recipe.title}
                            </DeleteButton>
                            </div>
                            );
                        })}
                    </ResultsContainer>
                ) : (
                    <h3>No Results to Display</h3>
                )}
            </Container>
        );
    };

}

export default Saved;