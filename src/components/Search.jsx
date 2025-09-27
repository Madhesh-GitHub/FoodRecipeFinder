import { useState, useEffect } from "react"

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = import.meta.env.VITE_FOOD_API_KEY; 

import styles from './search.module.css'

export default function Search({foodData , setFoodData}){
    const[query, setQuery] = useState("pizza");
    useEffect(()=>{
        async function fetchFood(){
            const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
            const data = await res.json();
            console.log(data.results);
            setFoodData(data.results);
        }
       fetchFood();
    }, [query])
    return(
        <div className={styles.searchContainer}>
            <input className={styles.input} type="text" onChange={(e)=>setQuery(e.target.value)} value={query} />
        </div>

    )
    
    
}