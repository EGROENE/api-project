const charsSection = document.getElementById('chars-container');
const charsURL = 'https://hp-api.herokuapp.com/api/characters';

// Get characters from API:
async function getChars() {
    const response = await fetch(charsURL);
    console.log(response.ok);
    const allCharsArr = await response.json();
    // A-Z by name:
    console.log(allCharsArr[0].name)
    allCharsArr.sort((a, b) => {
        return a.name - b.name;
    })
    
    // Push into newCharsArr all characters that are human & contain an image URL:
    let newCharsArr = [];
    for (let i = 0; i < allCharsArr.length; i++) {
        if (allCharsArr[i].species === 'human' && allCharsArr[i].image.length > 0) {
            newCharsArr.push(allCharsArr[i]);
        }
    }
    console.log(newCharsArr);
    return newCharsArr;
}

// Access newCharsArr outside of async function to populate homepage:
async function buildPages() {
    const newCharsArr = await getChars();
    // Populate char cards' HTML:
    for (let i = 0; i < newCharsArr.length; i++) {
        // Populate homepage (make cards visible by default)
        charsSection.innerHTML += 
            "<div class='char-card' data-name='" + newCharsArr[i].name.toLowerCase().replace(/\s/g, '-') + "'>" 
                + "<div class='char-img-container'>"
                + "<button class='favs-btn' title='Add to Favorites'><i class='far fa-heart'></i></button>"
                + "<img src='" + newCharsArr[i].image + "'>"
                + "</div>"
                + "<header class='char-header'>" + newCharsArr[i].name + "</header>"
                + "<p><span>Ancestry: </span>" + newCharsArr[i].ancestry + "</p>"
                + "<p><span>House: </span>" + newCharsArr[i].house + "</p>"
                + "<p><span>Actor/Actress: </span>" + newCharsArr[i].actor + "</p>"
            + "</div>"
        // Populate favs modal (make cards invisible by default):
        const favsModalBody = document.getElementById('favs-modal-body');
        favsModalBody.innerHTML += 
            "<div class='fav-char-card invisible' data-name='" + newCharsArr[i].name.toLowerCase().replace(/\s/g, '-') + "'>" 
                + "<div class='char-img-container'>"
                + "<button class='del-favs-btn' title='Remove from Favorites'><i class='fas fa-times'></i></button>"
                + "<img src='" + newCharsArr[i].image + "'>"
                + "</div>"
                + "<header class='char-header'>" + newCharsArr[i].name + "</header>"
                + "<p><span>Ancestry: </span>" + newCharsArr[i].ancestry + "</p>"
                + "<p><span>House: </span>" + newCharsArr[i].house + "</p>"
                + "<p><span>Actor/Actress: </span>" + newCharsArr[i].actor + "</p>"
            + "</div>"
    }
}
//buildPage();

// Func to add to favs array, delete from allCharsArr:
// Maybe need another async function
let favsArr = [];
async function favsFunctionality() {
    await buildPages();
    const newCharsArr = await getChars();
    
    let charCards = document.querySelectorAll('.char-card');
    charCards = Array.from(charCards);
    let favCharCards = document.querySelectorAll('.fav-char-card');
    favCharCards = Array.from(favCharCards);

    // Add EL to every favBtn to make card invisible on homepage & make visible on favs modal:
    let favBtns = document.querySelectorAll('.favs-btn');
    favBtns = Array.from(favBtns);
    for (let favBtn of favBtns) {
        favBtn.addEventListener('click', function() {
            for (let i = favBtns.indexOf(favBtn); i < favBtns.indexOf(favBtn) + 1; i++) {
                // Make card on homepage invisible:
                charCards[i].classList.add('invisible');
                // Make card on favs visible:
                favCharCards[i].classList.remove('invisible');
            }
        });
    }
    // Add EL to every delFavBtn to make invisible on favs modal & make card reappear on homepage:
    let delFavBtns = document.querySelectorAll('.del-favs-btn');
    delFavBtns = Array.from(delFavBtns);
    for (let delFavBtn of delFavBtns) {
        delFavBtn.addEventListener('click', function() {
            for (let i = delFavBtns.indexOf(delFavBtn); i < delFavBtns.indexOf(delFavBtn) + 1; i++) {
                // Make card on favs modal invisible again:
                charCards[i].classList.remove('invisible');
                // Make card reappear on homepage:
                favCharCards[i].classList.add('invisible');
            }
        })
    }
}
favsFunctionality();

// Func to delete from favs, re-add to 'all':
// Run on click of remove from favs btn (event listener)

// FAV MODAL JS
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Modal/Full site modal 'open buttons'
for (const elem of openModal) {
    elem.addEventListener('click', function() {
        document.getElementById('favs').classList.add(isVisible);
    })
}

// Remove isVisible class from elements in HTML with data-close attribute upon click:
for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        document.getElementById('favs').classList.remove(isVisible);
    })
}