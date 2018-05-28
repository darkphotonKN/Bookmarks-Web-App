
const form = document.getElementById('myForm');

form.addEventListener('submit', saveBookmark);

// save bookmarks to local storage
function saveBookmark(e) {
    e.preventDefault();
    // retrieving form values 
    let siteName = document.getElementById("siteName").value;
    let siteURL = document.getElementById("siteUrl").value;

    // saving as object 
    let bookmark = {
        name: siteName,
        url: siteURL
    }

    // local storage test using JSON. Local storage is shown under "Application > Storage > Local Storage > file://"

    if(localStorage.getItem('bookmarks') === null) {
        
        // init array
        let bookmarks = []; 

        // add new bookmarks to array
        bookmarks.push(bookmark);

        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // turn JSON into string 

    } else {

        // get bookmarks from local storage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // turn string into JSON
        
        // add bookmark to array
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // temporary to prevent form from submitting
    console.log(localStorage.getItem('test'));
    e.preventDefault();
}

// delete bookmarks
function deleteBookmark(url) {
    // get bookmark from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    // loop through bookmarks to find match
    for(let i=0; i<bookmarks.length; i++) {
        if(bookmarks[i].url == url) { // check JSON object's 'url' property matches
            // remove from array
            bookmarks.splice(i, 1); // remove the one
        }
    }
    console.log(bookmarks);
    // reset local storage after deleting bookmark 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmark(); // reshow the current bookmarks of user 
}   


// fetching the bookmarks to display on page 
let outputBtn = document.getElementById('results-btn');

outputBtn.addEventListener('click', fetchBookmark);

function fetchBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let output = document.querySelector('#bookmarks-output .output');
    let bookOutput = document.getElementById('bookmarks-output');

    // build output 
    let stringList = "";
    for(let i=0; i<bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        
        
        stringList += '<div class="output">' + name + ",  url: " + url + 
                   '<button class="btn delete" onclick="deleteBookmark(\'' + url + '\')">delete</button>'+ '</div><br>';
                        

        
    }
    // write to output section for bookmarks
    bookOutput.innerHTML = stringList;
    // style output 
    let outputDivs = bookOutput.getElementsByTagName('DIV'); // target all divs of output
        
    for(let i=0; i<outputDivs.length; i++) {
        outputDivs[i].classList.add("show");
    }
    bookOutput.classList.add("show");

}



