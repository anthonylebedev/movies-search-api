const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const posterPath= 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=b71638a04e0b286b616599cdf999587c&language=ru-RU&page=1&include_adult=true&query=' + searchText;
    movie.innerHTML = 'Загрузка...';

    fetch(url)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(value.status);
            }
            return value.json();
        })
        .then(function(output) {
            let inner = '';
    
            output.results.forEach(function(item) {
                console.log(item);
                let nameItem = item.name || item.title;
                inner += `
                    <div class="item col-3">
                        <img src="${posterPath + item.poster_path}" alt="${nameItem}">
                        <h5>${nameItem}</h5>
                    </div>
                `;
            });
    
            movie.innerHTML = inner;    
        })
        .catch(function(reason) {
            movie.innerHTML = 'Упс...';
            console.log('err: ' + reason);
        });
}

searchForm.addEventListener('submit', apiSearch);