const search = document.getElementById("search");
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealEl = document.getElementById('meals');
const resultHeading = document.getElementsByClassName('result-heading');
const single_meal = document.getElementById('single-meal');
const reshead = document.getElementById('result-heading');
const favlist = document.getElementById("favoriteList");
const favbar = document.getElementById("favbar");
let count=0;
const favlistarr =[] ;

var c=0;
favbar.addEventListener('click', function(){
    c++;
    if(c % 2!= 0){
        favbar.innerHTML='<h5>Favorite Meal List</h5><a href="#"><i class="fa fa-close"></i></a>';
        favlist.style.height = "100vh";
        favlist.style.width = "50vw";
    }else{
        favbar.innerHTML='<h5>Favorite Meal List</h5><a href="#favoriteList"><i class="fa fa-bars"></i></a>';
        favlist.style.width = "0px";
        favlist.style.height = "0px";
    }
});

const fetchMealsFromApi = async (url, value) => {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}
function isFav(list, id) {
    let res = false;
    for (let i = 0; i < list.length; i++) {
        if (id == list[i]) {
            res = true;
        }
    }
    return res;
}


async function showMealDetails(mealId){
        const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
        var mymeal = await fetchMealsFromApi(url,mealId);
        console.log(mymeal.meals.map(elmeal => {elmeal.idMeal}));
        let ele = document.getElementById(mealId);
        let html ="";
        html = mymeal.meals.map(element => {
            return `

                <div class="mealInformation" id="${element.idMeal}">
                <h3>${element.strMeal}</h3>
                <div class="mealdiv">
                <img src="${element.strMealThumb}" alt="${element.strMeal}" class="meal-img">  
                <div class="p"> ${element.strInstructions}</div>
                </div>
                 <div class="more-info" >
                <div class="a"><a href="${element.strYoutube}">Watch Video</a></div> 
                <div id="fav-icon" onclick="hideinfo(${element.idMeal})">
                    <a >HideInfo</a>
                    </div>
                    </div>
                </div>
            `
        }).join('');
        ele.innerHTML=html;
      
        
    
    }
async function hideinfo(mealID){
    const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    var mymeal = await fetchMealsFromApi(url,mealID);
    console.log(mymeal.meals.map(elmeal => {elmeal.idMeal}));
    let ele = document.getElementById(mealID);
    let html ="";
    html = mymeal.meals.map(element => {
        return `
        <img src="${element.strMealThumb}" alt="${element.strMeal}" class="meal-img">  
        <div class="meal-info" data-meadID="${element.idMeal}">
            <h3>${element.strMeal}</h3>
        </div>
        <div class="more-info" >
        <div class="a" Onclick="showMealDetails(${element.idMeal})">Know More</div> 
        <div id="fav-icon">
        <i class='fas fa-heart' Onclick="addfavorite(${element.idMeal})" ></i>
        </div>
        </div>
    
        `
    }).join('');
    ele.innerHTML=html;
}
//Search Random Meal
async function RandomMeal(){
   
    single_meal.innerHTML = "";
    
        const url = "https://www.themealdb.com/api/json/v1/1/random.php";
        const mealsData = await fetchMealsFromApi(url,"");
        console.log(mealsData);
        let html = "";
        if(mealsData.meals){
            html = mealsData.meals.map(element => {
                  count++;
                return `

                    <div class="meal" id="${element.idMeal}">
                        <img src="${element.strMealThumb}" alt="${element.strMeal}" class="meal-img">  
                        <div class="meal-info" data-meadID="${element.idMeal}">
                            <h3>${element.strMeal}</h3>
                        </div>
                        <div class="more-info" >
                        <div class="a" Onclick="showMealDetails(${element.idMeal})">Know More</div> 
                        <div id="${count}">
                        <i class='fas fa-heart' Onclick="addfavorite(${element.idMeal},${count})" ></i>
                        </div>
                        </div>
                    </div>
                `
            }).join('');
            reshead.innerHTML = "Seraches for random meal are...";
            mealEl.innerHTML = html;
        }
    

}
//search meals
async function searchMeal(e){
    e.preventDefault();
    //clear single meal
    single_meal.innerHTML = "";
    //get search meal
    var term = search.value;
    console.log(fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=${term}"));
    //check for Empty
    if(term.trim()){
        const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        const mealsData = await fetchMealsFromApi(url, term);
        console.log(mealsData);
        let html = "";
        if(mealsData.meals){
            html = mealsData.meals.map(element => {
                  count++;
                return `

                    <div class="meal" id="${element.idMeal}">
                        <img src="${element.strMealThumb}" alt="${element.strMeal}" class="meal-img">  
                        <div class="meal-info" data-meadID="${element.idMeal}">
                            <h3>${element.strMeal}</h3>
                        </div>
                        <div class="more-info" >
                        <div class="a" Onclick="showMealDetails(${element.idMeal})">Know More</div> 
                        <div id="${count}">
                        <i class='fas fa-heart' Onclick="addfavorite(${element.idMeal},${count})" ></i>
                        </div>
                        </div>
                    </div>
                `
            }).join('');
            reshead.innerHTML = "Seraches for " + term + " are...";
            mealEl.innerHTML = html;
        }
    
    }else{
        alert('Please insert a value in search bar');
    }

}
async function addfavorite(mealId,count){
    favlist.innerHTML ="";
    const myitem = localStorage.getItem(mealId);
   var d =  document.getElementById(count);
    if(myitem !== null){
        localStorage.removeItem(mealId);
        d.style.display="flex";
        d.style.justifyContent="center";
        d.style.alignItems="center";
        d.style.height="50px";
        d.style.width="50px";
        d.style.textAlign="center";
        d.style.borderRadius ="50%";
        d.style.backgroundColor="black";
       
        alert("Meal is removed from favorite list");
       
        
    }else{
        localStorage.setItem(mealId,count);
        console.log(localStorage.getItem(mealId));
       d.style.backgroundColor="red";
       d.style.display="flex";
       d.style.justifyContent="center";
       d.style.alignItems="center";
       d.style.height="50px";
       d.style.width="50px";
       d.style.textAlign="center";
       d.style.borderRadius ="50%";

        alert("Meal is added to favorite list");
    }
    allStorage();
}
    

function clearLocal() {
    localStorage.clear();
    alert("LOCAL STORAGE IS CLEARED");
}


async function allStorage() {
    for(let i=0;i<localStorage.length;i++){
        const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
         const favitem = await fetchMealsFromApi(url,localStorage.key(i));
       console.log(favitem);
       let ct = localStorage.getItem(localStorage.key(i));
       let html = "";
       if(favitem.meals){
           html = favitem.meals.map(element => {
            
               return `
                   <div class="favmeal" >
                       <img src="${element.strMealThumb}" alt="${element.strMeal}" class="meal-img">  
                       <div class="meal-info" data-meadID="${element.idMeal}">
                           <h3>${element.strMeal}</h3>
                       </div>
                       <div class="more-info" >
                       <div class="a" Onclick="showMealDetails(${element.idMeal})">Know More</div> 
                       <div class="fav-icon" id="${ct}">
                       <i class='fas fa-heart' Onclick="addfavorite(${element.idMeal},${ct})" ></i>
                       </div>
                       </div>
                   </div>
               `
           }).join('');
          // reshead.innerHTML = "Seraches for " + term + " are...";
           favlist.innerHTML += html;
       }
   
   }
}

//event listeners
submit.addEventListener('submit',searchMeal);

