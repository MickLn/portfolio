import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project Details Data
const PROJECTS_DATA = {
  'pansies': {
    title: 'Pansies',
    category: 'Mobile App / Sprint',
    timeline: '4-day Academic Sprint',
    tools: ['Figma', 'UX Research', 'Interactive Prototyping', 'Design System'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    problem: 'Standard voice note apps produce long, unstructured audio files that users rarely replay, resulting in lost tasks and cognitive overload.',
    solution: 'Designed an ultra-fast mobile workflow allowing 1-tap voice recording directly from iOS lock screen widgets, instant conversion into structured action bullet points, and intelligent urgency notification triggers.',
    results: [
      'Engineered an interactive Figma prototype from wireframes to hi-fi micro-states in a 4-day sprint.',
      'Reduced voice-to-structured-action capture time from 15s to under 3s in user testing.',
      'Defined a comprehensive 8pt scalable design token system for typography, spacing, and controls.'
    ]
  },
  'cms-ai': {
    title: 'CMS & AI Web Systems',
    category: 'Web Design & CMS Architecture',
    timeline: 'Continuous Exploration & Client Work',
    tools: ['Framer', 'Webflow', 'AI Workflows', 'UI Systems', 'Information Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    problem: 'Traditional website redesign cycles suffer from weeks of repetitive layout coding, stalling fast-moving marketing iterations.',
    solution: 'Built a systematic web creation framework combining modern visual builders (Webflow / Framer) and AI workflows to generate responsive layouts and production-ready CMS collections in days.',
    results: [
      'Delivered fully responsive production landing pages with zero CSS framework bloat.',
      'Achieved 100/100 Lighthouse performance and accessibility benchmarks.',
      'Reduced iteration cycles by 50% through reusable modular component libraries.'
    ]
  },
  'notion': {
    title: 'Notion Productivity Systems',
    category: 'Information Architecture & Systems',
    timeline: 'Personal & Public Release',
    tools: ['Notion', 'Database Architecture', 'UX Mapping', 'System Design'],
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    problem: 'Most workspace frameworks are overloaded with redundant properties and lack intuitive UX hierarchy, creating cognitive drag for designers and sprint teams.',
    solution: 'Architected a minimalist relational database system structured around 3 core pillars (Inputs, Actions, Archives) with contextual sprint dashboards.',
    results: [
      'Simplified daily task retrieval through filtered sprint view dashboards.',
      'Cut unnecessary relational database properties by 40% to maintain clean ergonomics.',
      'Adopted by design peers for tracking design milestones and asset repositories.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initScrollDrivenAccordion();
  initModalsAndDrawers();
  initLiveClock();
  initBackToTop();
});

// 1. Rock-Solid Scroll-Driven Dynamic Accordion using GSAP & ScrollTrigger
function initScrollDrivenAccordion() {
  const accordionContainer = document.getElementById('projects-accordion');
  const items = Array.from(document.querySelectorAll('.project-accordion-item'));
  if (!items.length) return;

  let activeIndex = 0;
  let isAnimating = false;

  function setActiveAccordion(targetIndex, animate = true) {
    if (activeIndex === targetIndex && items[targetIndex].classList.contains('is-active')) {
      return;
    }
    activeIndex = targetIndex;
    isAnimating = true;

    items.forEach((item, idx) => {
      const content = item.querySelector('.accordion-content');
      const inner = item.querySelector('.accordion-content-inner');
      const media = item.querySelector('.accordion-media-block');
      const text = item.querySelector('.accordion-text-block');

      if (idx === targetIndex) {
        item.classList.add('is-active');

        // Measure natural content height
        const targetHeight = inner.offsetHeight || 380;

        if (animate) {
          gsap.to(content, {
            height: targetHeight,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => {
              isAnimating = false;
              ScrollTrigger.refresh();
            }
          });

          gsap.fromTo(
            [media, text],
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.05 }
          );
        } else {
          gsap.set(content, { height: targetHeight, opacity: 1 });
          isAnimating = false;
        }
      } else {
        item.classList.remove('is-active');
        if (animate) {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.inOut',
            overwrite: 'auto'
          });
        } else {
          gsap.set(content, { height: 0, opacity: 0 });
        }
      }
    });
  }

  // Initialize first item
  setTimeout(() => {
    setActiveAccordion(0, false);
    ScrollTrigger.refresh();
  }, 100);

  // Recalculate on window resize
  window.addEventListener('resize', () => {
    const activeItem = items[activeIndex];
    if (activeItem) {
      const content = activeItem.querySelector('.accordion-content');
      const inner = activeItem.querySelector('.accordion-content-inner');
      if (content && inner) {
        gsap.set(content, { height: inner.offsetHeight });
        ScrollTrigger.refresh();
      }
    }
  });

  // Global scroll listener for continuous robust detection in both scroll directions
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (isAnimating) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const viewportCenter = window.innerHeight * 0.5;

      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const header = item.querySelector('.accordion-header') || item;
        const rect = header.getBoundingClientRect();
        const headerCenter = rect.top + rect.height / 2;
        const distance = Math.abs(headerCenter - viewportCenter);

        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= window.innerHeight * 0.2) {
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (minDistance < window.innerHeight * 0.4 && closestIndex !== activeIndex) {
        setActiveAccordion(closestIndex, true);
      }
    }, 40);
  }, { passive: true });

  // Attach ScrollTriggers to each item header for initial threshold triggers
  items.forEach((item, index) => {
    const header = item.querySelector('.accordion-header');

    ScrollTrigger.create({
      trigger: header,
      start: 'top 65%',
      end: 'bottom 35%',
      onEnter: () => setActiveAccordion(index, true),
      onEnterBack: () => setActiveAccordion(index, true)
    });

    // Manual click on header
    if (header) {
      header.addEventListener('click', () => {
        setActiveAccordion(index, true);
      });
    }

    // Hover dimming
    item.addEventListener('mouseenter', () => {
      if (accordionContainer) accordionContainer.classList.add('has-hover');
      item.classList.add('is-hovered');
    });

    item.addEventListener('mouseleave', () => {
      if (accordionContainer) accordionContainer.classList.remove('has-hover');
      item.classList.remove('is-hovered');
    });
  });
}

// 2. Modals & Drawers Management
function initModalsAndDrawers() {
  const aboutModal = document.getElementById('about-modal');
  const projectDrawer = document.getElementById('project-drawer');
  const openAboutBtns = document.querySelectorAll('.open-about-btn');
  const closeAboutBtn = document.getElementById('close-about-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const modalBackdrop = document.getElementById('modal-backdrop');

  // Open About Modal
  openAboutBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (aboutModal) aboutModal.classList.add('is-active');
    });
  });

  // Close About Modal
  if (closeAboutBtn) {
    closeAboutBtn.addEventListener('click', () => {
      if (aboutModal) aboutModal.classList.remove('is-active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', () => {
      if (aboutModal) aboutModal.classList.remove('is-active');
    });
  }

  // Open Project Case Study Drawer from buttons
  document.querySelectorAll('[data-open-drawer]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-open-drawer');
      if (projectId && PROJECTS_DATA[projectId]) {
        openProjectDrawer(PROJECTS_DATA[projectId]);
      }
    });
  });

  // Close Project Drawer
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      if (projectDrawer) projectDrawer.classList.remove('is-active');
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => {
      if (projectDrawer) projectDrawer.classList.remove('is-active');
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (aboutModal) aboutModal.classList.remove('is-active');
      if (projectDrawer) projectDrawer.classList.remove('is-active');
    }
  });
}

function openProjectDrawer(data) {
  const drawer = document.getElementById('project-drawer');
  if (!drawer) return;

  document.getElementById('drawer-category').textContent = data.category;
  document.getElementById('drawer-title').textContent = data.title;
  document.getElementById('drawer-timeline').textContent = `Timeline: ${data.timeline}`;
  document.getElementById('drawer-img').src = data.thumbnail;
  document.getElementById('drawer-img').alt = data.title;
  document.getElementById('drawer-problem').textContent = data.problem;
  document.getElementById('drawer-solution').textContent = data.solution;

  // Render results
  const resultsContainer = document.getElementById('drawer-results');
  resultsContainer.innerHTML = data.results
    .map(
      (res) => `
    <div style="border: 1px solid var(--border-sharp); padding: 0.75rem 1rem; background-color: #EAE8E2; font-size: 0.85rem; display: flex; gap: 0.5rem; align-items: flex-start; margin-bottom: 0.5rem;">
      <span style="color: var(--accent-green); font-weight: bold;">✓</span>
      <span>${res}</span>
    </div>
  `
    )
    .join('');

  // Render tools
  const toolsContainer = document.getElementById('drawer-tools');
  toolsContainer.innerHTML = data.tools
    .map(
      (tool) => `
    <span class="tag-badge" style="background-color: #EAE8E2;">${tool}</span>
  `
    )
    .join('');

  drawer.classList.add('is-active');
}

// 3. Live Paris / UTC Clock in Space Mono
function initLiveClock() {
  const clockElement = document.getElementById('live-clock');
  if (!clockElement) return;

  const update = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Paris',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockElement.textContent = timeStr;
  };

  update();
  setInterval(update, 1000);
}

// 4. Back-to-Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
