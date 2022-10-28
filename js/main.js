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
async function addToFavs() {
    await buildPage();
    const newCharsArr = await getChars();
    const charCards = document.querySelectorAll('.char-card');
    console.log(charCards[0]);
    /* const remAllAddFavs = () => {
        for (let i = 1; i < 5; i++) {
            newCharsArr.splice(newCharsArr[i], 1);
            favsArr.push(charCards[i]);
            charCards[i].classList.add('invisible');
        }
    } */
    console.log(favsArr);
    console.log(newCharsArr);

    // Query all data-names
    // Add EL to every one
    // EL func should add particular item to favs & remove from newCharsArr
    
    // Run on click of favs btn (event listener). Put inside addToFavs().
    const hermioneFavBtn = document.querySelector('[data-name=hermione-granger]'); // maybe return all data-names
    console.log(hermioneFavBtn);
        // logic below is good, just figure out how to configure it with any given card
        hermioneFavBtn.addEventListener('click', function() {
            for (let i = 1; i < 2; i++) { // after returning all data-names, put contents of this loop into a function. Then, depending on the position of data-name in alldatanames, call a different for loop w/ same function containing this loop's contents.
                // Make charCard invisible:
                charCards[i].classList.add('invisible');

                // push item from api into favsArr, not its HTML elem, as this will be built w/o .invisible in separate function:
                //favsArr.push(charCards[i]);
                favsArr.push(newCharsArr[i]);
                console.log(favsArr);
                console.log(favsArr[0]);

                // Remove item from newCharsArr:
                newCharsArr.splice(i, 1); // first value here should equal init value of i in for loop
                console.log(newCharsArr);
                console.log(newCharsArr.length);
                
                // Add items in favsArr to favs modal. favsArr needs to be accessed:
                const favsModalBody = document.getElementById('favs-modal-body');
                for (let i = 0; i < favsArr.length; i++) {
                    favsModalBody.innerHTML += 
                    "<div class='char-card' data-name='" + favsArr[i].name.toLowerCase().replace(/\s/g, '-') + "'>" 
                        + "<div class='char-img-container'>"
                        + "<button class='del-favs-btn' title='Remove from Favorites'><i class='fas fa-times'></i></button>"
                        + "<img src='" + favsArr[i].image + "'>"
                        + "</div>"
                        + "<header class='char-header'>" + favsArr[i].name + "</header>"
                        + "<p><span>Ancestry: </span>" + favsArr[i].ancestry + "</p>"
                        + "<p><span>House: </span>" + favsArr[i].house + "</p>"
                        + "<p><span>Actor/Actress: </span>" + favsArr[i].actor + "</p>"
                    + "</div>"
                }
            }
        });
}
addToFavs();

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