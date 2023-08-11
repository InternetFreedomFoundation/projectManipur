function getButton(id) {
    // id + "-btn"
    return document.getElementById(id + "-btn");
};

function getSnapElement(btnId) {
    // btnId - "-btn"
    return document.getElementById(btnId.slice(0, -4));
};

function getSiblingButtons(btn) {
    let result = [];
    let btns = btn.parentElement.children;
    for (let i = 0; i < btns.length; i++) {
        if (btns[i] != btn) {
            result.push(btns[i]);
        }
    }
    return result;
}

// get scroll position of horizontal scroll of snappy-scroll-container.
// then, depending on that, set one of the buttons as active and the rest as inactive
function setButtonsStateForSnappyScroll(container, btns) {
    let scrollPos = getScrollPercentage(container);
    let btnIdx = Math.floor(scrollPos * 5);
    for (let i = 0; i < btns.length; i++) {
        if (i == btnIdx) {
            btns[i].classList.add("active");
        } else {
            btns[i].classList.remove("active");
        }
    }
}

function getScrollPercentage(container) {
    let scrollPos = container.scrollLeft;
    // get number between [0, 1)
    let result = scrollPos / (container.scrollWidth - container.clientWidth);
    if (result === 1) { result = 0.99 };
    return result;
}

// run this above function whenever scroll changes
function setButtonsStateForSnappyScrollOnChange(container, btns) {
    container.addEventListener("scroll", function(e) {
        setButtonsStateForSnappyScroll(container, btns);
    });
}

let snappyScrollContainer1 = document.getElementsByClassName("snappy-scroll-container")[0];
let snappyScrollButtons1 = document.getElementsByClassName("snappy-scroll-nav-button");
snappyScrollContainer1.addEventListener("scroll", function(e) {
    setButtonsStateForSnappyScroll(e.currentTarget, snappyScrollButtons1);
});

// on click each button, scroll to the corresponding element
function snappyButtonOnClick(btn) {
    let snapElement = getSnapElement(btn.id);
    // only do horizontal scroll, no vertical scroll
    snappyScrollContainer1.scrollTo({
        left: snapElement.offsetLeft,
        behavior: "smooth"
    });
}

// do this for all buttons with class "snappy-scroll-nav-button"
Array.from(snappyScrollButtons1).forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        snappyButtonOnClick(e.currentTarget);
    });
});
