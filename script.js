const images = document.querySelectorAll('.portfolio .item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.querySelector('.close');

images.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

close.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
});

const items = document.querySelectorAll('.portfolio .item');
const btn = document.getElementById('showMore');

let visible = 6;

items.forEach((item, index) => {
  if (index >= visible) {
    item.style.display = 'none';
  }
});

btn.addEventListener('click', () => {
  visible += 6;

  items.forEach((item, index) => {
    if (index < visible) {
      item.style.display = 'block';
    }
  });

  if (visible >= items.length) {
    btn.style.display = 'none';
  }
});

const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsPrev = document.getElementById('reviewsPrev');
const reviewsNext = document.getElementById('reviewsNext');
const reviewSlides = document.querySelectorAll('.review-slide');

if (reviewsTrack && reviewsPrev && reviewsNext && reviewSlides.length > 0) {
  let reviewsIndex = 0;

  function getVisibleSlides() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function updateReviewsSlider() {
    const visibleSlides = getVisibleSlides();
    const slideWidth = reviewSlides[0].offsetWidth;
    const maxIndex = reviewSlides.length - visibleSlides;

    if (reviewsIndex > maxIndex) {
      reviewsIndex = maxIndex;
    }

    if (reviewsIndex < 0) {
      reviewsIndex = 0;
    }

    reviewsTrack.style.transform = `translateX(-${reviewsIndex * slideWidth}px)`;
  }

  reviewsNext.addEventListener('click', function () {
    const visibleSlides = getVisibleSlides();
    const maxIndex = reviewSlides.length - visibleSlides;

    if (reviewsIndex < maxIndex) {
      reviewsIndex++;
      updateReviewsSlider();
    }
  });

  reviewsPrev.addEventListener('click', function () {
    if (reviewsIndex > 0) {
      reviewsIndex--;
      updateReviewsSlider();
    }
  });

  window.addEventListener('resize', updateReviewsSlider);

  updateReviewsSlider();
}