let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(i) {
    let {
        title,
        link,
        description
    } = i;
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    searchResults.appendChild(resultContainer);

    let anchorEle1 = document.createElement("a");
    anchorEle1.setAttribute("href", link);
    anchorEle1.setAttribute("target", "_blank");
    anchorEle1.classList.add("result-title");
    anchorEle1.textContent = title;
    resultContainer.appendChild(anchorEle1);

    let brEle = document.createElement("br");
    resultContainer.appendChild(brEle);

    let anchorEle2 = document.createElement("a");
    anchorEle2.setAttribute("target", "_blank");
    anchorEle2.setAttribute("href", link);
    anchorEle2.classList.add("result-url");
    anchorEle2.textContent = link;
    resultContainer.appendChild(anchorEle2);

    let brEle2 = document.createElement("br");
    resultContainer.appendChild(brEle2);

    let p = document.createElement("p");
    p.textContent = description;
    p.classList.add("link-description");
    resultContainer.appendChild(p);

};





function displayResults(data) {
    spinner.classList.toggle("d-none");
    let {
        search_results
    } = data;
    console.log(search_results);
    for (let i of search_results) {
        createAndAppend(i);
    }
}

searchInput.addEventListener("keydown", function(e) {
    searchResults.textContent = "";
    //spinner.classList.toggle("d-none");

    if (e.key === "Enter") {
        let val = searchInput.value;
        if (val === "") {
            alert("Enter a input");
            return;
        }
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + val;
        spinner.classList.toggle("d-none");
        fetch(url, options)
            .then(function(res) {
                return res.json();
            }).then(function(data) {
                //console.log(data)
                displayResults(data);
            });
    }
});