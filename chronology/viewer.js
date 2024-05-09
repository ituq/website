document.querySelector("#eighteen").elems = ["IMG_9349-Pano.jpeg","IMG_4401.jpeg","IMG_4488-2.jpeg"];
document.querySelector("#nineteen").elems= ["IMG_0830-2-Edit.jpeg","Montparnasse_newsky.jpeg"];
document.querySelector("#twenty").elems = ["IMG_1205-Edit-2.jpeg","IMG_0036-Pano-Edit.jpeg","IMG_3093_edited.jpeg"];
document.querySelector("#twentyone").elems= ["DSCF0164-Edit.jpeg","DSCF0229.jpeg","DSC02830-Edit-2.jpeg"];
document.querySelector("#twentytwo").elems = ["IMG_0292.jpeg","IMG_0296-2.jpeg"];
document.querySelector("#twentythree").elems= ["DSC01474-Edit.jpeg", "DSC01191-Edit-2.jpeg", "DSC03647-Edit.jpeg", "DSC03641-Edit.jpeg", "DSC04554-HDR-Edit.jpeg", "DSC02946-HDR-Edit.jpeg"];
document.querySelectorAll(".year").forEach((year)=>{
  year.addEventListener("click", (e)=>{
    addPhotos(e.target.elems)

  });
})

function addPhotos(list){
  const div=document.querySelector(".keen-slider");
  div.innerHTML="";
  for(let i=0;i<list.length;i++){
    let img=document.createElement("div");
    img.classList.add("keen-slider__slide");
    img.classList.add(`number-slide${i}`);
    div.appendChild(img);
  }
}
function navigation(slider) {
  let wrapper, dots, arrowLeft, arrowRight

  function markup(remove) {
    wrapperMarkup(remove)
    dotMarkup(remove)
    arrowMarkup(remove)
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment)
  }
  function createDiv(className) {
    var div = document.createElement("div")
    var classNames = className.split(" ")
    classNames.forEach((name) => div.classList.add(name))
    return div
  }

  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft)
      removeElement(arrowRight)
      return
    }
    arrowLeft = createDiv("arrow arrow--left")
    arrowLeft.addEventListener("click", () => slider.prev())
    arrowRight = createDiv("arrow arrow--right")
    arrowRight.addEventListener("click", () => slider.next())

    wrapper.appendChild(arrowLeft)
    wrapper.appendChild(arrowRight)
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper)
      removeElement(wrapper)
      return
    }
    wrapper = createDiv("navigation-wrapper")
    slider.container.parentNode.appendChild(wrapper)
    wrapper.appendChild(slider.container)
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots)
      return
    }
    dots = createDiv("dots")
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot")
      dot.addEventListener("click", () => slider.moveToIdx(idx))
      dots.appendChild(dot)
    })
    wrapper.appendChild(dots)
  }

  function updateClasses() {
    var slide = slider.track.details.rel
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled")
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled")
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active")
    })
  }

  slider.on("created", () => {
    markup()
    updateClasses()
  })
  slider.on("optionsChanged", () => {
    console.log(2)
    markup(true)
    markup()
    updateClasses()
  })
  slider.on("slideChanged", () => {
    updateClasses()
  })
  slider.on("destroyed", () => {
    markup(true)
  })
}

const years= document.querySelectorAll(".year");
years.forEach((year)=>{
  year.addEventListener("click",()=>{
    var slider = new KeenSlider("#my-keen-slider", {}, [navigation])

    document.querySelector(".navigation-wrapper").style.display="block";
    for(let i=0;i<year.elems.length;i++){
      document.querySelector(`.number-slide${i}`).style.backgroundImage=`url(../photos/${year.elems[i]})`;
    }
    const wrapper = document.querySelector(".navigation-wrapper");
    const closeButton = document.createElement("div");
    closeButton.style.color="black";
    closeButton.classList.add("closeButton");
    closeButton.innerHTML='<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve"><line class="st1" x1="216" y1="792" x2="792" y2="216"></line><line class="st1" x1="216" y1="216" x2="792" y2="792"></line></svg>';
    wrapper.appendChild(closeButton);
    closeButton.addEventListener("click", () => {
      document.querySelector("div.navigation-wrapper").remove();
      let div=document.createElement("div");
      div.classList.add("keen-slider");
      div.id="my-keen-slider";
      div.style="position: absolute;";
      document.querySelector("body").appendChild(div);
    })
  })
});
