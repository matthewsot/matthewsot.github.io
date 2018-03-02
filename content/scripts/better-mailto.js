// Allows the user to choose if they want to use "real" mailto:s or just copy/view the email
// Note that links will default to their mailto: form on noscript browsers, ensuring graceful
// fallback.

// Licensed under the MIT license. Contact masotoudeh@ucdavis.edu

(function() {
    function copyText(text) {
        // See https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
        let el = document.createElement("input");
        el.value = text;

        document.body.append(el);
        el.select();

        var successful = document.queryCommandSupported("copy") && document.execCommand("copy");
        el.remove();
        return successful;
    };
    
    // Handles the clicking of an <a href="mailto:..."></a> tag
    function handleMailto(e) {
        e.preventDefault();

        var anchor = this;
        var originalDisplay = anchor.style.display;
        var email = anchor.href.substr("mailto:".length);

        // Create elements for the options
        var choiceSend = document.createElement("a");
        choiceSend.textContent = "Send Email";
        choiceSend.href = anchor.href;
        choiceSend.target = anchor.target;

        var delim = document.createElement("span");
        delim.textContent = " or ";

        var choiceCopy = document.createElement("a");
        choiceCopy.textContent = "Copy Address";
        choiceCopy.href = anchor.href;

        var choiceView = document.createElement("a");
        choiceView.textContent = "View Address";
        choiceView.href = anchor.href;

        var finish = function (resetAnchor) {
            choiceSend.remove();
            choiceCopy.remove();
            choiceView.remove();
            delim.remove();
        };

        // Removes elements and replaces with some text
        // flash determines whether the text stays for ever
        // or disappears after some time
        var finishWithText = function (displayText, flash) {
            finish();

            var text = document.createElement("span");
            text.textContent = displayText;
            anchor.parentNode.insertBefore(text, anchor);
            
            if (flash) {
                setTimeout(function () {
                    text.remove();
                    anchor.style.display = originalDisplay;
                }, 750);
            }
        };

        // Handles copy/view clicks
        var handleCopy = function (e) {
            e.preventDefault();

            if (copyText(email)) {
                finishWithText("Copied!", true);
            } else {
                finishWithText(email, false);
            }

            return false;
        };
        choiceCopy.addEventListener("click", handleCopy);

        var handleView = function (e) {
            finishWithText(email, false);
            e.preventDefault();
            return false;
        };
        choiceView.addEventListener("click", handleView);

        // Add the elements to the DOM
        anchor.parentNode.insertBefore(choiceSend, anchor);
        anchor.parentNode.insertBefore(delim, anchor);
        if (document.queryCommandSupported("copy")) {
            anchor.parentNode.insertBefore(choiceCopy, anchor);
        } else {
            anchor.parentNode.insertBefore(choiceView, anchor);
        }

        // Hide the original anchor
        anchor.style.display = "none";

        return false;
    }

    // Handle the clicks on the mailto: links
    var allAnchors = document.getElementsByTagName("a");
    for (var i = 0; i < allAnchors.length; i++) {
        var anchor = allAnchors[i];
        if (anchor.href.startsWith("mailto:")) {
            anchor.addEventListener("click", handleMailto);
        }
    }
})();
