/* ===== Hamburger Menu ===== */
const menuToggle = document.getElementById('menu-toggle');

function setMenu(open) {
  menuToggle.checked = open;
  document.body.style.overflow = open ? 'hidden' : '';
}

function enableHamburgerMenu() {
  if (!menuToggle) return;

  menuToggle.addEventListener('change', function () {
    setMenu(menuToggle.checked);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) setMenu(false);
  });
}

/* ===== Loop ===== */
function closeMenuOnLinkClick() {
  const menuLinks = document.querySelectorAll('.menu-overlay a');

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function () {
      setMenu(false);
    });
  }
}

/* ===== Array ===== */
function showSelectedFacilities() {
  const summary = document.querySelector('.multi-select summary');
  const boxes = Array.from(document.querySelectorAll('input[name="facility"]'));

  if (!summary || boxes.length === 0) return;

  boxes.forEach(function (box) {
    box.addEventListener('change', function () {
      const picked = boxes.filter(function (b) {
        return b.checked;
      });
      const names = picked.map(function (b) {
        return b.parentElement.textContent.trim();
      });

      summary.textContent = picked.length > 0 ? picked.length + ' selected' : 'Select facilities';
      summary.title = names.join(', ');
    });
  });
}

/* ===== Conditions ===== */
function validateStayDates() {
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');

  if (!checkin || !checkout) return;

  function check() {
    if (checkin.value && checkout.value && checkout.value <= checkin.value) {
      checkout.setCustomValidity('Check-out date must be after check-in date.');
    } else {
      checkout.setCustomValidity('');
    }
  }

  checkin.addEventListener('change', check);
  checkout.addEventListener('change', check);
  check();
}

/* ===== Start ===== */
enableHamburgerMenu();
closeMenuOnLinkClick();
showSelectedFacilities();
validateStayDates();