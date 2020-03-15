const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const posterPath= 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();

    const searchText = document.querySelector('.form-control').value;

    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col12 text-center text-danger"> Поле поиска не должно быть пустым';
        return;
    }

    const url = 'https://api.themoviedb.org/3/search/movie?api_key=b71638a04e0b286b616599cdf999587c&language=ru-RU&page=1&include_adult=true&query=' + searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(url)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(value.status);
            }
            return value.json();
        })
        .then(function(output) {
            let inner = '';

            if (output.results.length == 0) {
                movie.innerHTML = '<h2 class="col12 text-center text-danger">По вашему запросу ничего не найдено';
                return;
            }
    
            output.results.forEach(function(item) {
                // console.log(item);

                movie.innerHTML += `
                    <div>
                        <h4 class="col-12 text-center text-info">${item.title}</h4>
                        <div class="col-4"></div>
                        <div class="col-8"></div>
                    </div>
                `;
                
                let nameItem = item.name || item.title;                
                let mediaType = item.title ? 'movie' : 'tv';
                const path = item.poster_path ? posterPath + item.poster_path : "./img/noposter.jpg";
                let dataInfo = '';                

                if (item.media_type !== 'person' || item.poster_path) {
                    dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                }

                inner += `
                    <div class="item col-12 col-md-6 col-xl-3">
                        <img src="${path}" alt="${nameItem}" ${dataInfo}>
                        <h5>${nameItem}</h5>
                    </div>
                `;

                // inner += movie;
            });
    
            movie.innerHTML = inner;

            addEventMedia();
        })
        .catch(function(reason) {
            movie.innerHTML = 'Упс...';
            console.log('err: ' + reason);
        });
}

searchForm.addEventListener('submit', apiSearch);

function addEventMedia() {
    const media = movie.querySelectorAll('img[data-id]');

    media.forEach(function(elem) {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });
}

function showFullInfo() {
    let url = '';
    if (this.dataset.type === 'movie') {
        url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=b71638a04e0b286b616599cdf999587c&language=ru-RU`;
    }
    else if (this.dataset.type === 'tv') {
        url = '#';    }
    else {
        movie.innerHTML = '<h2 class="col12 text-center text-danger">Произошла ошибка, повторте позже</h2>';
    }

    fetch(url)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then(function(output) {
            const path = output.poster_path ? posterPath + output.poster_path : "./img/noposter.jpg";
            movie.innerHTML = `
                <h4 class="col-12 text-center text-danger">${output.title || output.name}</h4>
                <div class="col-4">
                    <img src="${path}" alt="${output.title || output.name}">
                    ${(output.homepage) ? `<p class="text-center"> <a href=${output.homepage}>Official Page</a></p>` : ''}
                    ${(output.imdb_id) ? `<p class="text-center"> <a href=${`https://imdb.com/title/${output.imdb_id}`}>IMDB</a></p>` : ''}
                </div>
                <div class="col-8">
                    <p>Рейтинг: ${output.vote_average}</p>
                    <p>Статус: ${output.status}</p>
                    <p>Премьера: ${output.first_air_date || output.release_date}</p>                    
                </div>
            `;
        })
        .catch(function(reason) {
        });

}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=b71638a04e0b286b616599cdf999587c&language=ru-RU')
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(value.status);
            }
            return value.json();
        })
        .then(function(output) {
            let inner = '';

            if (output.results.length == 0) {
                return;
            }

            output.results.forEach(function(item) {
                // console.log(item);

                // movie.innerHTML = `
                //     <h4 class="col-12 text-center text-info">${item.title}</h4>
                //     <div class="col-4"></div>
                //     <div class="col-8"></div>
                // `;
                
                let nameItem = item.name || item.title;                
                const path = item.poster_path ? posterPath + item.poster_path : "./img/noposter.jpg";
                let dataInfo =`data-id="${item.id}" data-type="${item.media_type}"`;
                

                inner += `
                    <div class="item col-12 col-md-6 col-xl-3">
                        <img src="${path}" alt="${nameItem}" ${dataInfo}>
                        <h5>${nameItem}</h5>
                    </div>
                `;

                // inner += movie;
            });

            movie.innerHTML = inner;

            addEventMedia();
        })
        .catch(function(reason) {
            movie.innerHTML = 'Упс...';
            console.log('err: ' + reason);
        });        
});