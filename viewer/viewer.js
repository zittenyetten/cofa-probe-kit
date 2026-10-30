const dialog = document.querySelector('#image-dialog');
const largeImage = document.querySelector('#large-image');
const viewport = document.querySelector('.image-viewport');
const title = document.querySelector('#image-title');
const level = document.querySelector('#zoom-level');
const minus = document.querySelector('#zoom-out');
const plus = document.querySelector('#zoom-in');
const fit = document.querySelector('#zoom-fit');
const close = document.querySelector('#image-close');
let zoom = 1;
let baseWidth = 0;
let trigger = null;

function paintZoom() {
  if (!baseWidth) return;
  largeImage.style.width = `${Math.round(baseWidth * zoom)}px`;
  level.textContent = `${Math.round(zoom * 100)}%`;
  minus.disabled = zoom <= 1;
  plus.disabled = zoom >= 4;
}
function fitImage() {
  if (!largeImage.naturalWidth) return;
  const availableWidth = Math.max(100, viewport.clientWidth - 36);
  const availableHeight = Math.max(100, viewport.clientHeight - 36);
  baseWidth = Math.min(largeImage.naturalWidth, availableWidth,
    availableHeight * largeImage.naturalWidth / largeImage.naturalHeight);
  zoom = 1;
  paintZoom();
  viewport.scrollTo(0, 0);
}
document.querySelectorAll('.image-open').forEach(button => {
  button.addEventListener('click', () => {
    trigger = button;
    title.textContent = button.dataset.caption;
    largeImage.alt = button.dataset.caption;
    baseWidth = 0;
    largeImage.style.width = '0px';
    largeImage.onload = fitImage;
    largeImage.src = button.dataset.image;
    dialog.showModal();
    document.body.classList.add('image-opened');
    if (largeImage.complete && largeImage.naturalWidth) fitImage();
    close.focus();
  });
});
plus.addEventListener('click', () => { zoom = Math.min(4, zoom + .5); paintZoom(); });
minus.addEventListener('click', () => { zoom = Math.max(1, zoom - .5); paintZoom(); });
fit.addEventListener('click', fitImage);
close.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('image-opened');
  if (trigger) trigger.focus({ preventScroll:true });
});
window.addEventListener('resize', () => { if (dialog.open) fitImage(); });

const links = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('.chapter')];
function markChapter() {
  const active = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 120) || sections[0];
  links.forEach(link => {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => { markChapter(); scheduled = false; });
}, { passive:true });
markChapter();
