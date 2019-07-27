previousScrolls = 0;
END_SCROLL = 450;
START_SCROLL = 0;
WIDTH_SCROLL = 150;
AMOUNT_SCROLL = 300;
CONCAT_LENGTH = 4;

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
        transform: translateX(-0px);\
    }\
    to {\
       transform: translateX(A_DYNAMIC_VALUE);\
    }\
}';
    style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, WIDTH_ANIMATE);
    document.getElementsByTagName('head')[0].appendChild(style);
  }

}

function destroyAnimateClass() {
  const slides = document.getElementsByClassName('track');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.removeProperty('animation-name');
    slides[i].style.removeProperty('animation-duration');
    slides[i].style.removeProperty('animation-timing-function');
    slides[i].style.removeProperty('animation-iteration-count');
  }
}

function tickerScroll(event) {

  const scope = this;
  if (this.previousScrolls <= event.srcElement.scrollLeft) {
    if (event.srcElement.scrollLeft >= this.END_SCROLL) {
      event.srcElement.scrollTo({
        top: 0,
        left: scope.WIDTH_SCROLL,
        behavior: 'auto'
      });
    }
  }
  if (this.previousScrolls > event.srcElement.scrollLeft) {

    if (event.srcElement.scrollLeft <= this.START_SCROLL) {

      event.srcElement.scrollTo({
        top: 0,
        left: scope.AMOUNT_SCROLL,
        behavior: 'auto'
      });
    }
  }

  this.previousScrolls = event.srcElement.scrollLeft;


}

function changeScrollParam(lengthData) {
  this.END_SCROLL = this.WIDTH_SCROLL * (lengthData + 1);
  this.AMOUNT_SCROLL = this.WIDTH_SCROLL * lengthData;
}

function increaseDataForMarquee(array) {

  let data = [];
  if (array.length < 3) {
    data = data.concat(array).concat(array).concat(array).concat(array);
    this.CONCAT_LENGTH = 4;
  } else {
    data = data.concat(array).concat(array).concat(array);
    this.CONCAT_LENGTH = 3;
  }
  return data;
}

function decreaseDataForMarquee(array) {
  // increaseDataForMarquee have how many concat on so much you devided
  return array.length / this.CONCAT_LENGTH;
}

function scrollTouchStart() {
  document.getElementById('trackId').classList.add('track-stop');
}

function scrollTouchEnd() {
  document.getElementById('trackId').classList.remove('track-stop');
}

changeScrollParam(6)
createKeyFrames(6);

setTimeout(function () {
  document.getElementById('marqueeId').scrollTo({
    top: 0,
    left: 150,
    behavior: 'smooth'
  });
}, 0);