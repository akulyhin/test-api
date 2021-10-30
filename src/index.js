import './sass/styles.scss';
import debounce from 'lodash.debounce';

import pixabayApi from './api/pixabayApi';
import pixabayDefault from './templates/pixabayDefault.hbs';
import refs from './refs/refs';


refs.search.addEventListener('focus', () => {
    refs.placeholder.classList.add('active');
})

refs.search.addEventListener('blur', () => {
    if (!refs.search.value) {
        refs.placeholder.classList.remove('active');
    }
})



pixabayApi.fetchRequest().then(data => {
    refs.pageContent.innerHTML = pixabayDefault(data.hits);

    if (data.totalHits > 1 && data.totalHits >= 5) {
        for (let i = 2; i <= 5; i++) {
            refs.pagination.insertAdjacentHTML('beforebegin', `<li class="page-item"><a class="page-link" data-page="${i}" href="${i}">${i}</a></li>`);
            console.log(i)        
        }

        const pageLink = document.querySelectorAll('.page-link');

        pageLink.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(+e.target.getAttribute('data-page'))
                pixabayApi.fetchPagination(e.target.getAttribute('data-page')).then(data => {
                    refs.pageContent.innerHTML = pixabayDefault(data.hits);
                })
            })
        })
    }

    else if (data.totalHits > 1 && data.totalHits < 5) {
        for (let i = 2; i <= data.totalHits; i++) {
            refs.pagination.insertAdjacentHTML('beforebegin', `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`);
        }
    }


    let card = document.querySelectorAll('.card');
    card.forEach(el => {
        el.addEventListener('click', (e) => {
            refs.modalImage.src = e.target.getAttribute('data-image')
        })
    })
})

refs.search.addEventListener('input', debounce((e) => {
    pixabayApi.fetchQuery(e.target.value).then(data => {
        if (e.target.value.length < 4) {
            data.hits.forEach(item => {
                const option = document.createElement('option');
                option.value = item.tags;
                refs.searchList.appendChild(option)
            })
        }
        else {
            data.hits.forEach(item => {
                const option = document.createElement('option');
                option.value = item.tags;
                refs.searchList.appendChild(option)
            })
            refs.pageContent.innerHTML = pixabayDefault(data.hits);
            
                let card = document.querySelectorAll('.card');
                card.forEach(el => {
                    el.addEventListener('click', (e) => {
                        refs.modalImage.src = e.target.getAttribute('data-image')
                    })
                })
        }
    })

}, 300))


function paginationStart(total) {

}