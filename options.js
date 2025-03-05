document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get(["urls"], function (data) {
        let urls = data.urls || [];
        let container = document.getElementById("urlInputs");
        container.innerHTML = "";
        urls.forEach(url => {
            addUrlField(url);
        });
    });
});

document.getElementById("generateFields").addEventListener("click", function () {
    let count = parseInt(document.getElementById("urlCount").value);
    for (let i = 0; i < count; i++) {
        addUrlField("");
    }
});

document.getElementById("save").addEventListener("click", function () {
    let inputs = document.querySelectorAll("#urlInputs input");
    let urls = [];
    inputs.forEach(input => {
        if (validateUrl(input.value)) {
            urls.push(input.value);
        } else {
            alert("Geçersiz URL: " + input.value);
        }
    });
    chrome.storage.sync.set({ urls: urls }, function () {
        alert("Kaydedildi!");
    });
});

function addUrlField(value) {
    let container = document.getElementById("urlInputs");
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "URL girin";
    input.value = value;
    div.appendChild(input);
    let removeBtn = document.createElement("button");
    removeBtn.innerText = "X";
    removeBtn.addEventListener("click", function () {
        div.remove();
    });
    div.appendChild(removeBtn);
    container.appendChild(div);
}

function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
