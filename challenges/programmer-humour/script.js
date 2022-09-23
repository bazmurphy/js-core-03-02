let currentComic;

function getComic(getComicArgument = "latest") {

    // hide the error message if displayed
    errorMessage.style.display = "none";

    // clear the existing comic container
    while (comicContainer.firstChild) {
        comicContainer.removeChild(comicContainer.lastChild);
    }
    
    // create and append the comic elements
    const comicTitle = document.createElement("p");
    comicTitle.classList.add("comic-title");

    const comicDate = document.createElement("p");
    comicDate.classList.add("comic-date");

    const comicImage = document.createElement("img");
    comicImage.classList.add("comic-image");

    comicContainer.appendChild(comicTitle);
    comicContainer.appendChild(comicDate);
    comicContainer.appendChild(comicImage);

    // check the argument provided
    if (getComicArgument === "previous") {
        currentComic -= 1;
        getComicArgument = currentComic;
    } else if (getComicArgument === "next") {
        currentComic += 1;
        getComicArgument = currentComic;
    }
    
    // fetch using the argument
    fetch(`https://xkcd.now.sh/?comic=${getComicArgument}`)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        currentComic = data.num;
        // console.log(`currentComic ${currentComic}`)
        comicTitle.textContent = data.title;
        comicDate.textContent = `${data.day}/${data.month}/${data.year}`
        comicImage.src = data.img;
        comicImage.alt = data.alt;
    })
    .catch((error) => {
        console.log(error);
        errorMessage.style.display = "block";
    });
    
}

const appContainer = document.createElement("div");
appContainer.classList.add("app-container");

const heading = document.createElement("h1");
heading.textContent = "XKCD Comic Fetch";

const previousComicButton = document.createElement("button");
previousComicButton.textContent = "< Previous";
previousComicButton.addEventListener("click", () => getComic("previous"));

const nextComicButton = document.createElement("button");
nextComicButton.textContent = "Next >";
nextComicButton.addEventListener("click", () => getComic("next"));

const buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("buttons-container");
buttonsContainer.appendChild(previousComicButton);
buttonsContainer.appendChild(nextComicButton);

const errorMessage = document.createElement("p");
errorMessage.classList.add("error-message");
errorMessage.textContent = "Error: that Comic does not exist";
errorMessage.style.display = "none";

const comicContainer = document.createElement("div");
comicContainer.classList.add("comic-container");

appContainer.appendChild(heading);
appContainer.appendChild(buttonsContainer);
appContainer.appendChild(errorMessage);
appContainer.appendChild(comicContainer);

document.body.appendChild(appContainer);

getComic("latest");
