const movieApp = {};
const searchTerm = document.getElementById('search-input').value;
movieApp.imageUrl = `https://image.tmdb.org/t/p/w500`;


movieApp.baseUrl = 'https://api.themoviedb.org/3';
movieApp.apiKey = 'fdc64670b61843a5841c94be98a6df3b';
movieApp.mainUrl = movieApp.baseUrl + '/discover/movie?sort_by=popularity.desc&api_key=' + movieApp.apiKey;
movieApp.search = `https://api.themoviedb.org/3/search/movie?api_key=fdc64670b61843a5841c94be98a6df3b&query=${searchTerm}`;
movieApp.searchURL = movieApp.baseUrl + '/search/movie?api_key=' + movieApp.apiKey;


movieApp.init = () => {
    movieApp.getMovies();
}
movieApp.getMovies = () => {
    fetch(movieApp.search)
        .then((response)=>{
            return response.json();
        })
        .then((jsonResponse)=>{
            movieApp.displayMovies(jsonResponse);
        })
};

const form = document.getElementById('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(searchTerm) {
        movieApp.getMovies(movieApp.searchURL + '&query=' + searchTerm)
    }else{
        getMovies(movieApp.mainUrl);
    }
})

movieApp.displayMovies = (dataFromApi) => {
    // Target the element where we want to append our photos (gallery.ul)
    const ul = document.querySelector('.movieList');
    console.log(dataFromApi)
    dataFromApi.results.forEach((imageObject) => {
        // Create list item element
        const listElement = document.createElement('li');
        // Create img element
        const image = document.createElement('img');
        // Add src and alt attributes to our image
        const description = document.createElement('p');
        console.log(imageObject);
        image.src = movieApp.imageUrl + imageObject.poster_path;
        // Append the image to its parents li.
        listElement.appendChild(image);
        listElement.appendChild(description);
        description.textContent = imageObject.overview;
        // Append the list item into the gallery ul
        ul.appendChild(listElement);
        const rating = document.createElement('p');
        listElement.appendChild(rating);
        rating.textContent = imageObject.vote_average + ' / 10';
    });
};



movieApp.init();