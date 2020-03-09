const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=b71638a04e0b286b616599cdf999587c&language=ru-RU&page=1&include_adult=true&query=' + searchText;
    movie.innerHTML = 'Загрузка...';

    fetch(url)
        .then(function(value) {
            return value.json();
        })
        .then(function(output) {
            let inner = '';
    
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `<div class="col-3">${nameItem}</div>`;            
            });
    
            movie.innerHTML = inner;    
        })
        .catch(function() {
            movie.innerHTML = 'Упс...';
            console.log(reason.status);
        });
}

searchForm.addEventListener('submit', apiSearch);