WIDTH_SCROLL = 150;
arrayLength = 6;
arrayRepeat = 5;
commonArray = arrayLength * arrayRepeat;

function createKeyFrames(lengthData) {
  const TIME = lengthData * 2 + 's';
  const WIDTH_ANIMATE = '-' + (this.WIDTH_SCROLL * lengthData) + 'px';
  {
    const slides = document.getElementsByClassName('track');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.animationName = 'marquee';
      slides[i].style.animationDuration = TIME;
      slides[i].style.animationTimingFunction = 'linear';
      slides[i].style.animationIterationCount = 'infinite';
    }

  }
  {
    const style = document.createElement('style');
    style.type = 'text/css';

    const keyFrames = '\
@keyframes marquee {\
    from {\
        transform: translate3d(0, 0, 0);\
    }\
    to {\
       transform: translate3d(A_DYNAMIC_VALUE, 0, 0);\
    }\
}';
    style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, WIDTH_ANIMATE);
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}

function createDiv() {
  var toAdd = document.createDocumentFragment();
  var temp = document.getElementsByTagName("template")[0];
  var a;
  for (var i = 0; i < commonArray; i++) {
    var clon = temp.content.cloneNode(true);
    clon.querySelector('.up-content-left').textContent = 'asdasdas';
    clon.querySelector('.up-content-right').textContent = 'asdasdas';
    clon.querySelector('.down-content-left').textContent = 'asdasdas';
    clon.querySelector('.down-content-right').textContent = 'asdasdas';
    // var newDiv = document.createElement('div');
    // newDiv.id = 'r' + i;
    // newDiv.classList.add('carousel-cell')
    // newDiv.classList.add('track')
    // newDiv.innerHTML = i
    toAdd.appendChild(clon);
  }
  document.querySelector('.carousel').appendChild(toAdd)
}


function scrollTouchStart() {
  document.querySelectorAll('.track').forEach(el => {
    el.classList.add('track-stop')
  })
}

function scrollTouchEnd() {
  document.querySelectorAll('.track').forEach(el => {
    el.classList.remove('track-stop')
  })
}

function createGSlider() {
  var elem = document.querySelector('.carousel');
  var flkty = new GSlider(elem, {
    wrapAround: true,
    prevNextButtons: false,
    initialIndex: 4,
    pageDots: false,
  });
  var isThrotle = false;
  flkty.on('change', function f(event) {
    if (isThrotle) {
      return
    }
    if (event >= (arrayLength * 2) + 4) {
      isThrotle = true
      setTimeout(() => {
        isThrotle = false
        flkty.select(event - arrayLength, false, true)
      }, 400)
    }
    if (event <= arrayLength) {
      isThrotle = true
      setTimeout(() => {
        isThrotle = false
        flkty.select(event + arrayLength, false, true)
      }, 400)
    }
  })
}

createDiv();
createKeyFrames(arrayLength);
createGSlider();
