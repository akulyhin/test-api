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
    refs.pageContent.innerHTML = pixabayDefault(data.hits)
    let card = document.querySelectorAll('.card');
    card.forEach(el => {
        el.addEventListener('click', (e) => {
            refs.modalImage.src = e.target.getAttribute('data-image')
        })
    })
})

refs.search.addEventListener('input', debounce((e) => {
    pixabayApi.fetchQuery(e.target.value).then(data => {
        if (e.target.value.length < 5) {
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


