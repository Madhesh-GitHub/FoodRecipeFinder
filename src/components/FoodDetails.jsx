import {useState, useEffect} from "react";

import styles from './fooddetails.module.css'
import ItemList from "./ItemList";

export default function FoodDetails({foodId}){
    const [food, setFood] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY=import.meta.env.VITE_FOOD_API_KEY;

    useEffect(()=>{
        async function fetchRecipe(){
            const res = await fetch(`${URL}?apiKey=${API_KEY}`);
            const data = await res.json();
            setFood(data);
            setIsLoading(false);

        }
        fetchRecipe();
    }, [foodId])


    return <div>
                <div className={styles.recipeCard} >
                    <h1 className={styles.recipeName} >{food.title}</h1>
                    <img className={styles.recipeImage}  src={food.image} alt="" />
                    <div className={styles.recipeDetails} >
                        <span>
                            <strong>{food.readyInMinutes} Minutes</strong>
                        </span>
                        <span>
                            👨‍👩‍👧‍👦<strong>Serves {food.servings}</strong>
                        </span>
                        <span>
                            <strong>{food.vegetarian ? "🥕 Vegeterian": "🥩 Non-vegeterian"}</strong>
                        </span>
                        <span><strong>{food.vegan? "Vegan": ""}</strong></span>
                    </div>
                    <div>
                        $<span>{food.pricePerServing/100} per serving</span>
                    </div>
                        <h2>Ingredients</h2>
                        <ItemList food={food} isLoading={isLoading} />
                        <h2>Instructions</h2>
                        <div className={styles.recipeInstructions} >
                        {isLoading? <p>Loading...</p>: 
                            food.analyzedInstructions && food.analyzedInstructions[0] ? 
                                <ol>
                                    {food.analyzedInstructions[0].steps.map((step, index)=>(<li key={index}>{step.step}</li>))}
                                </ol> :
                                <p>No instructions available</p>
                        }
                        
                    </div>
                 </div>
            </div>
}