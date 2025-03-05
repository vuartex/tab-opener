document.getElementById("openTabs").addEventListener("click", openSavedTabs);

document.getElementById("settings").addEventListener("click", function () {
    chrome.runtime.openOptionsPage();
});

document.getElementById("about").addEventListener("click", function () {
    chrome.tabs.create({ url: "https://github.com/vuartex" });
});

function openSavedTabs() {
    chrome.storage.sync.get(["urls"], function (data) {
        let urls = data.urls || [];
        if (urls.length === 0) {
            alert("Önce Ayarlara gidip sekme eklemelisiniz!");
            return;
        }
        urls.forEach(url => {
            let validUrl = validateUrl(url) ? url : "https://www.google.com";
            chrome.tabs.create({ url: validUrl });
        });
    });
}

function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}