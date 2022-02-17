const movieApp = {};
const searchTerm = document.getElementById('search-input');
movieApp.imageUrl = `https://image.tmdb.org/t/p/w500`;
movieApp.baseUrl = 'https://api.themoviedb.org/3';
movieApp.apiKey = 'fdc64670b61843a5841c94be98a6df3b';
movieApp.mainUrl = movieApp.baseUrl + '/discover/movie?sort_by=popularity.desc&api_key=' + movieApp.apiKey;
movieApp.search = `https://api.themoviedb.org/3/search/movie?api_key=fdc64670b61843a5841c94be98a6df3b&query=${searchTerm}`;
movieApp.searchURL = movieApp.baseUrl + '/search/movie?api_key=' + movieApp.apiKey;


movieApp.init = () => {
    movieApp.searchFunction();
}

movieApp.getMovies = (asd) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=fdc64670b61843a5841c94be98a6df3b&query=${asd}`)
        .then((response)=>{
            return response.json();
        })
        .then((jsonResponse)=>{
            movieApp.displayMovies(jsonResponse);
        })
};




movieApp.searchFunction = function(){
    const searchButton = document.querySelector('button')

    searchButton.addEventListener('click', function(){
        console.log(searchTerm.value)
        movieApp.getMovies(searchTerm.value)
    })
}


movieApp.displayMovies = (dataFromApi) => {
    const details = document.querySelector('.textContainer');
        
    details.innerHTML = "";
    
    console.log(dataFromApi)
    
    dataFromApi.results.forEach((imageObject) => {
        
        const moviePoster = document.createElement('img');
        moviePoster.src = movieApp.imageUrl + imageObject.poster_path;
        details.appendChild(moviePoster);
        moviePoster.classList.add('imageBox');
        
        const movieDetails = document.createElement('div');
        details.appendChild(movieDetails);
        movieDetails.classList.add('textBox');
        
        const name = document.createElement('h3');
        name.textContent = imageObject.title;
        movieDetails.appendChild(name);

        const description = document.createElement('p');
        description.textContent = imageObject.overview;
        movieDetails.appendChild(description);

        const rating = document.createElement('p');
        rating.textContent = imageObject.vote_average + ' / 10';
        movieDetails.appendChild(rating);
    });
};



movieApp.init();