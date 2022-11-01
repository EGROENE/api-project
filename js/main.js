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
async function buildPage() {
    const newCharsArr = await getChars();
    // Populate char cards' HTML:
    for (let i = 0; i < newCharsArr.length; i++) {
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
    }
}
//buildPage();

// Func to add to favs array, delete from allCharsArr:
// Maybe need another async function
let favsArr = [];
async function favsFunctionality() {
    await buildPage();
    const newCharsArr = await getChars();
    let charCards = document.querySelectorAll('.char-card');
    console.log(charCards[0]);
    console.log(favsArr);
    console.log(newCharsArr);

    // Get all items with data-name:
    let favBtns = document.querySelectorAll('.favs-btn');
    favBtns = Array.from(favBtns);
    console.log(favBtns);

    // Add EL to every favBtn:
    for (let favBtn of favBtns) {
        // logic below is good, just figure out how to configure it with any given card
        favBtn.addEventListener('click', function() {
            console.log(favBtns.indexOf(favBtn));
            console.log(favBtns.indexOf(favBtn) + 1);
            for (let i = favBtns.indexOf(favBtn); i < (favBtns.indexOf(favBtn) + 1); i++) {
                // Remove favBtn from favBtns:
                favBtns.splice(i, 1);
                console.log(favBtns);
                
                // Make charCard invisible:
                charCards[i].classList.add('invisible');
                let invisibleCards = document.getElementsByClassName('invisible');
                console.log(invisibleCards.length);
                console.log(i);
                charCards = Array.from(charCards);
                charCards.splice(i, 1);
                console.log(charCards[i]);
                console.log(charCards.indexOf(i));
                
                // push item from api into favsArr, not its HTML elem, as this will be built w/o .invisible in separate function:
                favsArr.push(newCharsArr[i]);
                console.log(favsArr);
                console.log(favsArr[0]);

                // Remove item from newCharsArr:
                newCharsArr.splice(i, 1); // first value here should equal init value of i in for loop
                console.log(newCharsArr);
                console.log(newCharsArr.length);

                
                // Add items in favsArr to favs modal. favsArr needs to be accessed:
                const favsModalBody = document.getElementById('favs-modal-body');
                for (let i = favBtns.indexOf(favBtn); i < (favBtns.indexOf(favBtn) + 1); i++) {
                    favsModalBody.innerHTML += 
                    "<div class='char-card' data-name='" + favsArr[favsArr.length - 1].name.toLowerCase().replace(/\s/g, '-') + "'>" 
                        + "<div class='char-img-container'>"
                        + "<button class='del-favs-btn' title='Remove from Favorites'><i class='fas fa-times'></i></button>"
                        + "<img src='" + favsArr[favsArr.length - 1].image + "'>"
                        + "</div>"
                        + "<header class='char-header'>" + favsArr[favsArr.length - 1].name + "</header>"
                        + "<p><span>Ancestry: </span>" + favsArr[favsArr.length - 1].ancestry + "</p>"
                        + "<p><span>House: </span>" + favsArr[favsArr.length - 1].house + "</p>"
                        + "<p><span>Actor/Actress: </span>" + favsArr[favsArr.length - 1].actor + "</p>"
                    + "</div>"
                }
            }
        });
    }
}
favsFunctionality();

// Func to delete from favs, re-add to 'all':
// Run on click of remove from favs btn (event listener)

// FAV MODAL JS
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
/* for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        this.parentElement.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
} */

for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        document.getElementById('favs').classList.remove(isVisible);
    })
}