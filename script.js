AOS.init({ duration: 700, once: true, offset: 80 });

const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / h) * 100 + "%";
});

const fills = document.querySelectorAll(".skill-fill");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("animate");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.4 },
);
fills.forEach((f) => io.observe(f));

const words = ["Public Policy Analyst", "Research Analyst", "Data Analyst", "Policy Evaluation", "Strategic Insight"];
let wi = 0,
  ci = 0,
  deleting = false;
const el = document.getElementById("typed-text");
function type() {
  const word = words[wi];
  if (!deleting) {
    el.textContent = word.substring(0, ci++);
    if (ci > word.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    el.textContent = word.substring(0, ci--);
    if (ci < 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      ci = 0;
    }
  }
  setTimeout(type, deleting ? 45 : 85);
}
type();

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ==========================================
// FUNGSI UNTUK MODAL PROYEK
// ==========================================

function openProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Mencegah scroll background
  }
}

function closeProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Mengembalikan scroll background
  }
}

// Menutup modal jika area di luar konten diklik
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('project-modal')) {
    event.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Menutup modal jika tombol Escape ditekan
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const activeModal = document.querySelector('.project-modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});


/* ==========================================
   ANIMASI RESEARCH HIGHLIGHTS
========================================== */

const researchItems = document.querySelectorAll(
  ".research-highlights .research-heading, .research-highlights .stat"
);

const researchObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        researchObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

researchItems.forEach((item, index) => {
  if (item.classList.contains("stat")) {
    item.style.transitionDelay = `${(index - 1) * 0.12}s`;
  }

  researchObserver.observe(item);
});
