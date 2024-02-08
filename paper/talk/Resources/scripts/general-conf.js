let slider = null;

function getSlider() {
  if (slider) {
    return slider;
  }
  slider = document.querySelector('.slider');
  return slider;
}

function scrollToNextPage() {
  getSlider().scrollBy({top: 0, left: 1000, behavior: 'smooth'});
}
function scrollToPrevPage() {
  getSlider().scrollBy({top: 0, left: -1000, behavior: 'smooth'});
}

function stopEvent(event) {
    if (event.preventDefault && navigator.userAgent.indexOf("Mozilla") !== -1) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else if (event.stopPropagation) {
      event.stopPropagation();
    }
    event.cancelBubble = true;
  }

window.addEventListener('load', function(e) {
  document.body.addEventListener('keydown', function(e) {
    let code = e.keyCode;
    if(code === 34 || code === 39 || code === 32) {
      scrollToNextPage();
      return stopEvent(e);
    }
    if(e.keyCode === 33 || code === 37) {
      scrollToPrevPage();
      return stopEvent(e);
    }
    return true;
  });
  let next = document.querySelector('.btn.next');
  if (next) {
    next.addEventListener('click', scrollToNextPage);
  }
  let prev = document.querySelector('.btn.prev');
  if (prev) {
    prev.addEventListener('click', scrollToPrevPage);
  }
});
