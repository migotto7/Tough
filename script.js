const prevBtn = document.querySelector("#prev-button");
const nextBtn = document.querySelector("#next-button");
const indicators = document.querySelector("[indicators]");
const productCards = document.querySelector("[product-cards]");

const changeIndicator = (newIndicatorIndex) => {
  const activeIndicator = indicators.querySelector(".active");

  indicators.children[newIndicatorIndex].classList.add("active");
  activeIndicator.classList.remove("active");
};

const getNewIndex = ({ elments, activeElement, offset }) => {
  let newIndex = [...elments.children].indexOf(activeElement) + offset;
  if (newIndex < 0) newIndex = elments.children.length - 1;
  if (newIndex >= elments.children.length) newIndex = 0;

  return newIndex;
};

const disableFirstCard = () => {
  const disabledCard = productCards.querySelector(".disabled-product-card");

  productCards.children[0].classList.add("disabled-product-card");
  disabledCard.classList.remove("disabled-product-card");
};

const moveCardForward = () => {
  const lastChild = productCards.lastElementChild;
  const secondLastChild = lastChild.previousElementSibling;

  productCards.insertBefore(
    secondLastChild,
    productCards.firstElementChild.nextSibling
  );
  productCards.insertBefore(lastChild, productCards.firstElementChild);

  disableFirstCard();
};

const moveCardBackward = () => {
  const firstChild = productCards.firstElementChild;
  const secondChild = firstChild.nextElementSibling;

  productCards.appendChild(firstChild);
  productCards.insertBefore(secondChild, productCards.firstElementChild);

  disableFirstCard();
};

const moveCards = ({ offset }) => {
  offset === 1 ? moveCardForward() : moveCardBackward();
};

const moveCarrousel = ({ isFoward }) => {
  const offset = isFoward ? 1 : -1;
  const slides = document.querySelector("[data-slides]");
  const activeSlide = slides.querySelector("[data-active]");

  const newIndex = getNewIndex({
    elments: slides,
    activeElement: activeSlide,
    offset,
  });

  moveCards({ offset });
  changeIndicator(newIndex);
  slides.children[newIndex].dataset.active = true;

  delete activeSlide.dataset.active;
};

prevBtn.addEventListener("click", () => {
  moveCarrousel({ isFoward: false });
});

nextBtn.addEventListener("click", () => {
  moveCarrousel({ isFoward: true });
});
