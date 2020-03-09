const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/movie?api_key=b71638a04e0b286b616599cdf999587c&language=ru-RU&page=1&include_adult=true&query=' + searchText;
    console.log(requestApi('GET', server));
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {

    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status !== 200) {
            console.log(request.status);
        }

        const output = JSON.parse(request.responseText);
        let inner = '';

        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            //console.log(item);
            inner += `<div class="col-3">${nameItem}</div>`;
            
        });

        movie.innerHTML = inner;
                
        //console.log(output);
    });

    
    
}