var formPages = [
    "mainPage",
    "about",
    "skills-id",
    "covid",
    "devtalks",
    "lastSubmit",
    "thanks"
];

var currentPage = 0;

function hideAll() {
    var containers = document.getElementsByTagName('container');
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.display = "none";
      }
}

function showContainer(containerID) {
    hideAll();
    document.getElementById(containerID).style.display = "flex";
}

function prevPage() {
    if (currentPage > 0) {
        currentPage = currentPage - 1;
    }
    showContainer(formPages[currentPage]);
}

function nextPage() {
    if(currentPage < 6){
        currentPage = currentPage + 1;
    } else {
        currentPage = 0;
    }
    showContainer(formPages[currentPage]);
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        nextPage();
    } else if (event.keyCode === 8) {
        prevPage();
    }
});


function checkPhone (phoneNumber) {
    return phoneNumber.match(/^\+9955\d\d\d\d\d\d\d\d$/g) !== null;
}


