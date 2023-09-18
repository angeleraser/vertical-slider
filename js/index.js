const slider = document.getElementById("slider");
const leftSide = document.querySelector(`[data-side="left"]`);
const rightSide = document.querySelector(`[data-side="right"]`);

const data = [
  {
    photoUrl: "https://images.unsplash.com/photo-1508768787810-6adc1f613514",
    color: "yellow",
    title: "Flying eagle",
    subtitle: "in the sunset",
  },

  {
    photoUrl: "https://images.unsplash.com/photo-1519981593452-666cf05569a9",
    color: "black",
    title: "Lonely castle",
    subtitle: "in the wilderness",
  },

  {
    photoUrl: "https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b",
    color: "blue",
    title: "Blue Skye",
    subtitle: "with it's mountains",
  },

  {
    photoUrl: "https://images.unsplash.com/photo-1510942201312-84e7962f6dbb",
    color: "red",
    title: "Nature Flower",
    subtitle: "all in pink",
  },
];
let index = 0;
let timeout;

function debounce(fn, delay = 300) {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
}

function setSliderTranslateY(pixels) {
  leftSide.style.transform = `translateY(${pixels}px)`;
  rightSide.style.transform = `translateY(${-pixels}px)`;
}

slider.classList.add(`bg-${data[index].color}`);
leftSide.style.top = `-${(data.length - 1) * 100}vh`;

slider.addEventListener("click", function ({ target }) {
  const side = target.dataset.btnSide;
  if (!side) return;

  if (side === "left") {
    index = index === 0 ? data.length - 1 : index - 1;
  }

  if (side === "right") {
    index = index === data.length - 1 ? 0 : index + 1;
  }

  slider.classList.add(`bg-${data[index].color}`);
  setSliderTranslateY(index * this.getBoundingClientRect().height);
});

window.addEventListener("resize", function () {
  rightSide.style.transitionDuration = "0ms";
  leftSide.style.transitionDuration = "0ms";

  debounce(() => {
    rightSide.style.transitionDuration = ".3s";
    leftSide.style.transitionDuration = ".3s";
  });

  setSliderTranslateY(index * slider.getBoundingClientRect().height);
});

data.forEach((element, i) => {
  leftSide.innerHTML += `
  <div class="slider-content bg-${data[data.length - 1 - i].color}">
    <h2 class="slider-content-title">
      ${data[data.length - 1 - i].title}
    </h2>
    <p class="slider-content-subtitle">
      ${data[data.length - 1 - i].subtitle}
    </p>
  </div>
  `;
  rightSide.innerHTML += `
  <div style="background-image: url('${element.photoUrl}') ;" class="slider-content bg-${element.color}"></div>
  `;
});
