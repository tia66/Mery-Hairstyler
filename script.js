    // Tab functionality for price list
function showTab(btn, id) {
  // Remove active class from all price lists
  document.querySelectorAll('.price-list').forEach(el => el.classList.remove('active'));
  // Remove active class from all tabs
  document.querySelectorAll('.ptab').forEach(el => el.classList.remove('active'));
  // Add active class to selected price list
  document.getElementById('tab-' + id).classList.add('active');
  // Add active class to clicked button
  btn.classList.add('active');
}

// Booking form handler
async function handleBooking() {

  const data = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    notes: document.getElementById("notes").value
  };

  try {
    const btn = document.getElementById('bookbtn');

    btn.textContent = "Invio in corso...";
    btn.disabled = true;

    const res = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      btn.textContent = "Prenotazione inviata!";
    } else {
      btn.textContent = "Errore prenotazione";
      btn.disabled = false;
    }

  } catch (error) {
    console.error(error);
    alert("Server non raggiungibile");
  }
}
document
.getElementById("bookingForm")
.addEventListener("submit", async (e) => {

   e.preventDefault();

   const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value
   };

   const response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   });

   const result = await response.json();

   console.log(result);

});
// Scroll reveal animation using Intersection Observer
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      // Optional: unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Observe elements for scroll reveal
document.querySelectorAll('.service-card, .value-item, .testimonial, .exp-step, .info-item').forEach(function(el) {
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === "#" || href === "") return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Dynamic year in copyright (optional)
document.addEventListener('DOMContentLoaded', function() {
  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom) {
    const year = new Date().getFullYear();
    footerBottom.innerHTML = footerBottom.innerHTML.replace('2025', year);
  }
});

