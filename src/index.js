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


// pixabayApi.fetchRequest().then(data => {
//     refs.pageContent.innerHTML = pixabayDefault(data)
// })

refs.search.addEventListener('input', debounce((e) => {
    pixabayApi.fetchQuery(e.target.value).then(data => {
        refs.pageContent.innerHTML = pixabayDefault(data)
    })
}, 300))