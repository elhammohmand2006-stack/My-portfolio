// 1. Filter the projects
const buttons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    // change the active button
    buttons.forEach(function (b) { b.classList.remove('active'); });
    button.classList.add('active');

    // show or hide cards
    const choice = button.dataset.filter;
    cards.forEach(function (card) {
      if (choice === 'all' || card.dataset.cat.includes(choice)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// 2. Day / Night mode
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('day');
  if (document.body.classList.contains('day')) {
    themeBtn.textContent = 'Night mode';
  } else {
    themeBtn.textContent = 'Day mode';
  }
});

// 3. Menu button for phones
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', function () {
  menu.classList.toggle('open');
});
// close the menu after clicking a link
menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () { menu.classList.remove('open'); });
});

// 4. Show items slowly when you scroll down to them
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        watcher.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (item) { watcher.observe(item); });
} else {
  items.forEach(function (item) { item.classList.add('show'); });
}

// 5. Current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
