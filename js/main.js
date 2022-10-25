const charsSection = document.getElementById('chars-container');
const charsURL = 'https://hp-api.herokuapp.com/api/characters';

// Populate 'all':
async function getChars() {
    const response = await fetch(charsURL);
    console.log(response.ok);
    const allCharsArr = await response.json();
    console.log(allCharsArr);
    console.log(allCharsArr[2]);
    console.log(allCharsArr[2].species);
    console.log(allCharsArr.length);
    // Delete from allCharsArr any item that is not human and/or doesn't have an image:
    /* const filterAllCharsArr = () => {
        for (let i = 0; allCharsArr.length; i++) {
            if (allCharsArr[i].species !== 'human' || !allCharsArr[i].image) {
                //let indexOfItemToBeDel = allCharsArr.indexOf(allCharsArr[i]);
                allCharsArr.splice(allCharsArr[i], 1);
            }
        }
    }
    setTimeout(filterAllCharsArr(), 8000); */
    for (let i = 0; allCharsArr.length; i++) {
        if (allCharsArr[i].species !== 'human' || !allCharsArr[i].image) {
            allCharsArr.splice(allCharsArr[i], 1);
        }
    }
    console.log(allCharsArr);
    /* for (let i = 0; i < 22; i++) {
        if (allCharsArr[i].species === 'human' && allCharsArr[i].image) {
            charsSection.innerHTML += 
            "<div class='char-card'>" 
                + "<div class='char-img-container'>"
                + "<button id='favs-btn' title='Add to Favorites'><i class='far fa-heart'></i></button>"
                + "<img src='" + allCharsArr[i].image + "'>"
                + "</div>"
                + "<header class='char-header'>" + allCharsArr[i].name + "</header>"
                + "<p>" + allCharsArr[i].ancestry + "</p>"
                + "<p>" + allCharsArr[i].house + "</p>"
            + "</div>"
        }
    } */
    // Func to add to favs array then delete from allCharsArr:
    
    // Run on click of favs btn (event listener)


    // Func to delete from favs, re-add to 'all':
    // Run on click of remove from favs btn (event listener)
}
getChars();

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