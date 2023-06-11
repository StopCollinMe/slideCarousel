const buttons = document.querySelectorAll('[data-carousel-button]');



//We want to sync the current newIndex with the index and setActiveSlide
buttons.forEach(button =>{
  button.addEventListener('click', ()=>   {

    //This one works: const offset = button.classList.contains('next') ? 1 : -1;
    //Figure out why this one doesn't vvvvv (FOUND OUT THAT IT WAS BECASUE I HAD )
    const offset = button.dataset.carouselButton == 'next' ? 1 : -1;
    const slides = button.closest('[data-carousel]').querySelector('[data-slides]');


    const activeSlide = slides.querySelector('[data-active]');
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if(newIndex < 0){
      newIndex = slides.children.length - 1;
    }
    if( newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    //Make sure to grab active slide with selector, then delete the active dataset
    delete activeSlide.dataset.active;

    setActiveSlide(newIndex);
    clearInterval(intervalId);
    //This is what I needed to work on. Forgot to make index = newIndex.
    //We set the activeSlide which ONLY adds the active, but does not keep track
    //And cleared the interval
    index = newIndex;
    intervalId = setInterval(() => {
      index++; // Increment the index
      if (index >= dots.length) {
        index = 0; // Reset index to 0 if it exceeds the maximum
      }
      setActiveSlide(index);
    }, 4000);

  });
});

const startInterval = () =>{
  const buttonRight = document.querySelector('.next');
    setInterval(() => {
    buttonRight.click();
  }, 4000);
}

const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');



//This all works FINALLY GOOD JOB!
const setActiveSlide = (index)=>{

  //Make sure there is no active
  dots.forEach((dot) =>{
    delete dot.dataset.active;
  });

  slides.forEach((slide) =>{
    delete slide.dataset.active;
  });

  dots[index].dataset.active = true;
  slides[index].dataset.active = true;

}

let intervalId = setInterval(() => {
  index++; // Increment the index
  if (index >= dots.length) {
    index = 0; // Reset index to 0 if it exceeds the maximum
  }
  setActiveSlide(index);
}, 4000);


dots.forEach((dot,dotIndex)=>{
  dot.addEventListener('click',()=>{
    clearInterval(intervalId);
    index = dotIndex;
    setActiveSlide(index);
    intervalId = setInterval(() => {
      index++;
      if(index >= dots.length){
        index = 0;
      }
      setActiveSlide(index);
    }, 4000);
  });
});




  //Add active to slide and dot
  //Make sure the index changes when clicked



let index = 0;
setActiveSlide(index);