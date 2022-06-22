

//Good Day! The code below is from a Udemy course by Andrei Neagoie on NodeJS.
//Here I have recreated the code and annotated it for others who are new (like me) 
//to understand and try it for themselves. HERE WE USE NASA's CSV FILE ON EXOPLANET RESEARCH 
//TO AID US IN FILTERING OUT PLANETS THAT ARE POTENTIALLY HABITABLE!!!



//The THREE LINES OF CODE BELOW IS CALLED UPON THROUGH THE REQUIRE FUNCTION 
//TO ALLOW US TO GATHER EXTRA RESOURCES TO MAKE OUR TASK AT HAND EASIER

const {parse} = require ('csv-parse'); // required to make reading the csv file easier
const fs = require ('fs'); // required to allow us to read the csv file
const { pipeline } = require('stream'); // we require the "stream API" to make the way we get large amounts of data efficient.

//THE CONSTANT DECLARATION BELOW IS CREATED WITH A NULL SET WITH OUT INTEWNT TO PUSH DATA INTO IT
const habitablePlanets = []; //we are going to push all the relevant kepler data into here

//The FUCTION BELOW WILL FILTER OUT PLANETS THAT DO NOT MEET THE CRITERION OF BEING HABITABLE

function isHabitablePlanet(planet){ //Litmus Test for Habitable Planet
    return planet['koi_disposition'] === 'CONFIRMED' // Tells us that the planet is a potential candidate to contain life.
    
    && planet['koi_insol']>0.36 // "Stellar Flux" must be between 1.11 and 0.36. In other words, the energy or light that the planet gets must be in this range to be habitable.

    && 1.11>planet['koi_insol'] //"Stellar Flux" must be between 1.11 and 0.36. SEE NOTE ABOVE FOR MORE DETAILS
    
    && planet['koi_prad']<1.6; // The size of the planet (Earth Radii) must be less than 1.6, otherwise it will be too big to be habitable.
}

//we can add koi_steff and research ideal temperature for planet. Then integrate into litmus test.

fs.createReadStream('kepler_data.csv') //the fs (filesystem module) along with the required csv-parse package and Stream application programming interface (API) will allow us to read the csv kepler Data file for use.

//the function below will turn the random data into a readable format with the aid of the csv-parse package (check in the package.json file under dependencies)
.pipe(parse({
    comment:'#',
    columns:true,
}))

// THE METHOD BELOW TAKES THE FILTERS WE HAVE PUT INTO PLACE AND FROM THE RETURNED DATA, INTEGRATES IT INTO THE "habitablePlanets" constant
.on('data',(data)=> {
    if(isHabitablePlanet(data)){
    habitablePlanets.push(data);
}

})

// IF THERE IS ANY ERRORS, IT WILL BE DISPLAYED WITH THE FOLLOWING METHOD
.on('error', (err)=>{
console.log(err);
})


//FINALLY, WE SHOW OFF OUR DATA
.on('end', ()=>{
   // console.log(results);
   // console.log('done);')
    console.log(`${habitablePlanets.length} habitable planets found!`); //WE USE AN OBJECT LITERAL TO CAPTURE THE AMOUNT OF PLANETS FOUND FROM OUR CURRENT FILTERS
    console.log(habitablePlanets.map((planet) => {  //HERE WE USE THE MAP METHOD TO DECLARE THE OBJECT kEY WHICH WILL SPIT OUT THE VALUE WHICH IS THE ACTUAL NAME OF THE PLANET
        return planet['kepler_name']})) // HERE IS THE "OBJECT KEY" NAME, 'KEPLER_NAME'
    
});


//NOTE: MAKE SURE YOU ARE RUNNING "   ~node index.js   " from the correct folder in YOUR terminal. It may be in your downloads folder, so do "   ~ cd Downloads   "
