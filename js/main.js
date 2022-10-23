const charsSection = document.getElementById('chars-container');
const charsURL = 'https://hp-api.herokuapp.com/api/characters';

fetch(charsURL)
    .then(response => response.json())
    .then(responseJson => {
        for (let i = 0; i < 22; i++) {
            console.log(responseJson[i]);
            console.log(responseJson[i].name);
            if (responseJson[i].species === 'human' && responseJson[i].image) {
                charsSection.innerHTML += 
                "<div class='char-card display-in-all'>" 
                    + "<div class='char-img-container'>"
                    + "<button class='favs-btn' title='Add to Favorites'><i class='far fa-heart'></i></button>"
                    + "<img src='" + responseJson[i].image + "'>"
                    + "</div>"
                    + "<header class='char-header'>" + responseJson[i].name + "</header>"
                    + "<p>" + responseJson[i].ancestry + "</p>"
                    + "<p>" + responseJson[i].house + "</p>"
                + "</div>"
            }
        }
    })

// FAV MODAL JS
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Modal/Full site modal 'open buttons'
for (const elem of openModal) {
    elem.addEventListener('click', function() {
        const modalId = this.dataset.open; // this refers to parent element, which is elem here. It then accesses datasets that are followed by 'open'. Don't use arrow func here, so that this keyword works;
        document.getElementById(modalId).classList.add(isVisible); // this adds .is-visible as a class to everything in document with data-open="about" or "contact"
    })
}

// Remove isVisible class from elements in HTML with data-close attribute upon click:
for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
}