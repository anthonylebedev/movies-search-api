const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/movie?api_key=b71638a04e0b286b616599cdf999587c&language=ru-RU&page=1&include_adult=true&query=' + searchText;
    movie.innerHTML = 'Загрузка...';
    requestApi('GET', server)
        .then(function(result) {
            const output = JSON.parse(result);

            let inner = '';
    
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `<div class="col-3">${nameItem}</div>`;            
            });
    
            movie.innerHTML = inner;    
        })
        .catch(function( ) {
            movie.innerHTML = 'Упс...';
        })
        ;
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    return new Promise (function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open(method, url);

        request.addEventListener('load', function() {
            if (request.status !== 200) {
                reject({
                    status: request.status
                });        
            }
            resolve(request.response);
        });

        request.addEventListener('error', function() {
            reject({
                status: request.status
            });        
        });

        request.send();
    });   
}