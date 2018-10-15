

function reloadAvatars() {
    var r = document.getElementById('content');
    if (r) {
        console.log("Querying filter-element-s...");
        var users = r.querySelectorAll("li[id^='filter-element-']");
        if (users.length == 0) {
            setTimeout(reloadAvatars, 500)
        }
        console.log('users', users);
        var avatarList = document.createElement('ul');
        r.insertAdjacentElement('afterbegin', avatarList)
        var quickFiltersList = document.createElement('ul');
        r.insertAdjacentElement('afterbegin', quickFiltersList)
        users.forEach(function(userItem) {
            var e = userItem;
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
                var avatarSize = null;
                var size = avatarSize ? avatarSize : "32";
                img.setAttribute("style", "max-width: " + avatarSize + "px; max-height: " + avatarSize + "px;");
                avatarList.insertAdjacentElement('beforeend', e)
            } else {
                var popQuickFilters = true
                if (popQuickFilters) {
                    quickFiltersList.insertAdjacentElement('beforeend', e)
                }
            }
        });
    }
}

if (window.top === window) {
    setTimeout(reloadAvatars, 500)
}
