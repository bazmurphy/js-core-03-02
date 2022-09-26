function getDogImage() {

    const newListItem = document.createElement("li");

    const newDogImage = document.createElement("img");
    newDogImage.classList.add("dog-image");

    fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then((data) => newDogImage.src = data.message)
        .catch((error) => console.log(error));
    
    newListItem.appendChild(newDogImage);
    
    // unorderedListOfDogImages.appendChild(newListItem);

    // this is the way to add the element as a first child rather than append to the end
    // i think this makes more stylistic sense in this context
    unorderedListOfDogImages.insertBefore(newListItem, unorderedListOfDogImages.firstChild);
    
}

function prePopulateList() {
    for (let i = 0; i < 5; i++) {
      getDogImage();
    }
}

const heading = document.createElement("h1");
heading.textContent = "Fetch🦴 Dog🐕 Images📸";

const getNewDogImageButton = document.createElement("button");
getNewDogImageButton.textContent = "Fetch A New Dog Image";
getNewDogImageButton.addEventListener("click", getDogImage);

const unorderedListOfDogImages = document.createElement("ul");

const appContainer = document.createElement("div");
appContainer.classList.add("app-container");

appContainer.appendChild(heading);
appContainer.appendChild(getNewDogImageButton);
appContainer.appendChild(unorderedListOfDogImages);

document.body.appendChild(appContainer);

prePopulateList();