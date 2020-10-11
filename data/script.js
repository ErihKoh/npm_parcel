import images from "./gallery-items.js";

const imagesGallery = document.querySelector(".js-gallery");
const imageModal = document.querySelector(".lightbox__content");
const btnModalClose = document.querySelector(".lightbox__button");
const modalBtnRight = document.querySelector(".scroll-right");
const modalBtnLeft = document.querySelector(".scroll-left");
const overlay = document.querySelector(".js-lightbox");
const backDrop = document.querySelector(".lightbox__overlay");
const currentImage = document.querySelector(".lightbox__image");

imagesGallery.addEventListener("click", onImageOpenClick);

const cardsImage = creatGalleryMarkup(images);
imagesGallery.insertAdjacentHTML("afterbegin", cardsImage);

function creatGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
         <img
             class="gallery__image"
             src=${preview}
             data-source=${original}
            alt=${description}
        />
 </li> `;
    })
    .join("");
}

function onImageOpenClick(evt) {
  window.addEventListener("keydown", modalImgScrolling);
  modalBtnRight.addEventListener("click", modalImgScrolling);
  modalBtnLeft.addEventListener("click", modalImgScrolling);
  currentImage.addEventListener("click", modalImgScrolling);
  btnModalClose.addEventListener("click", onImageClose);
  backDrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onEscKeyPress);
  const isGalleryImage = !evt.target.classList.contains("gallery__image");
  if (isGalleryImage) {
    return;
  }
  overlay.classList.add("is-open");
  // imageModal.innerHTML = `<a
  //       class="gallery__link"
  //       href=${evt.target.dataset.source}
  //   >
  //       <img
  //           class="lightbox__image"
  //           src=${evt.target.dataset.source}
  //           data-source=${evt.target.dataset.source}
  //           alt=${evt.target.alt}
  //       />
  //   </a>`;
  currentImage.src = `${evt.target.dataset.source}`;
  currentImage.alt = `${evt.target.alt}`;
}

function onImageClose() {
  btnModalClose.removeEventListener("click", onImageClose);
  backDrop.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", modalImgScrolling);
  modalBtnRight.removeEventListener("click", modalImgScrolling);
  modalBtnLeft.removeEventListener("click", modalImgScrolling);
  currentImage.removeEventListener("click", modalImgScrolling);
  overlay.classList.remove("is-open");
}

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    onImageClose();
  }
}

function onEscKeyPress(evt) {
  if (evt.code !== "Escape") {
    return;
  }
  onImageClose();
}

function modalImgScrolling(event) {
  let imgIndex = images.findIndex((img) => img.original === currentImage.src);

  if (
    event.code === "ArrowLeft" ||
    event.code === "ArrowDown" ||
    modalBtnLeft === event.target
  ) {
    if (imgIndex === 0) {
      imgIndex += images.length;
    }
    imgIndex -= 1;
  }

  if (
    event.code === "ArrowRight" ||
    event.code === "ArrowUp" ||
    modalBtnRight === event.target ||
    currentImage === event.target
  ) {
    if (imgIndex === images.length - 1) {
      imgIndex -= images.length;
    }
    imgIndex += 1;
  }

  currentImage.src = images[imgIndex].original;
  currentImage.alt = images[imgIndex].description;
}
console.log(document);
