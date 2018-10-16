var settings = {};

function reloadAvatars() {
    var r = document.getElementById('content');
    if (r) {
        //console.log("Querying filter-element-s...");
        var users = r.querySelectorAll("li[id^='filter-element-']");
        if (users.length == 0) {
            setTimeout(function () { reloadAvatars(); }, 1000)
            return;
        }
        var avatarList = document.getElementById('jbhm-avatar-list');
        while (avatarList && avatarList.firstChild) {
            avatarList.removeChild(avatarList.firstChild);
        }
        if (!avatarList) {
            avatarList = document.createElement('ul');
            avatarList.setAttribute("id", "jbhm-avatar-list");
            r.insertAdjacentElement('afterbegin', avatarList)
        }
        var quickFiltersList = document.getElementById('jbhm-quick-filter-list');
        while (quickFiltersList && quickFiltersList.firstChild) {
            quickFiltersList.removeChild(quickFiltersList.firstChild);
        }
        if (!quickFiltersList) {
            quickFiltersList = document.createElement('ul');
            quickFiltersList.setAttribute("id", "jbhm-quick-filter-list");
            r.insertAdjacentElement('afterbegin', quickFiltersList)
        }
        users.forEach(function(userItem) {
            var e = userItem;
            e.setAttribute("id", "jbhm-" + e.getAttribute("id"));
            e.setAttribute("style", "display: inline-block; width: fit-content; white-space: nowrap;");
            var img = e.querySelector("img");
            if (img) {
                var label = e.querySelector("label");
                if (label) {
                    label.setAttribute("style", "background-color: white;");
                }
                var span = e.querySelector("span");
                if (span) {
                    span.setAttribute("style", "display: none;");
                }
                var input = e.querySelector("input");
                if (input) {
                    input.setAttribute("style", "display: none;");
                }
                img.setAttribute("title", span.innerText);
                img.setAttribute("class", "zoom");
                var avatarSize = settings["avatarSize"];
                var size = avatarSize ? avatarSize : "32";
                img.setAttribute("style", "max-width: " + avatarSize + "px; max-height: " + avatarSize + "px;");
                avatarList.insertAdjacentElement('beforeend', e)
            } else {
                if (settings["popQuickFilters"]) {
                    quickFiltersList.insertAdjacentElement('beforeend', e)
                }
            }
        });
        setTimeout(function () { reloadAvatars(); }, 1000)
    }
}

if (window.top === window) {

    // listen for an incoming setSettings message
    safari.self.addEventListener("message", function(e) {
        if(e.name === "setSettings") {
            settings = e.message;
        }
    }, false );

    // ask proxy.html for settings
    safari.self.tab.dispatchMessage("getSettings");

    setTimeout(reloadAvatars, 500)
}
