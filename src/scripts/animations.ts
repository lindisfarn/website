/**
 * Lindisfarn Scroll Animations
 * GSAP + ScrollTrigger powered journey
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // ═══════════════════════════════════════════════════════════════════════════
  // ACT I: Hero Opening
  // ═══════════════════════════════════════════════════════════════════════════
  const heroTl = gsap.timeline({ delay: 0.5 });

  heroTl
    .to('.hero-word', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
    .to('.hero-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4')
    .to('.hero-location', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5')
    .to('.scroll-indicator', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3');

  // ═══════════════════════════════════════════════════════════════════════════
  // ACT II: The Problem
  // ═══════════════════════════════════════════════════════════════════════════
  gsap.utils.toArray('.problem-line').forEach((line, i) => {
    gsap.to(line as Element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line as Element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ACT III: The Way
  // ═══════════════════════════════════════════════════════════════════════════
  gsap.to('.way-image', {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#the-way',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.utils.toArray('.way-line').forEach((line, i) => {
    gsap.to(line as Element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line as Element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ACT IV: The Land (Horizontal Scroll)
  // ═══════════════════════════════════════════════════════════════════════════
  const landSection = document.querySelector('#the-land');
  const landTrack = document.querySelector('.land-track');

  if (landSection && landTrack) {
    const landCards = gsap.utils.toArray('.land-card');
    const totalWidth = (landTrack as HTMLElement).scrollWidth - window.innerWidth;

    // First, fade in all cards
    landCards.forEach((card, i) => {
      gsap.to(card as Element, {
        opacity: 1,
        duration: 0.5,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: landSection,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Horizontal scroll
    gsap.to(landTrack, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: landSection,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ACT V: The Invitation
  // ═══════════════════════════════════════════════════════════════════════════
  gsap.to('.invitation-label', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: '#invitation',
      start: 'top 70%',
    },
  });

  gsap.utils.toArray('.invitation-line').forEach((line, i) => {
    gsap.to(line as Element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line as Element,
        start: 'top 80%',
      },
    });
  });

  // Counter animation
  const counterTrigger = {
    trigger: '.invitation-counter',
    start: 'top 80%',
  };

  gsap.to('.invitation-counter', {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: counterTrigger,
    onComplete: animateCounter,
  });

  gsap.to('.invitation-cta', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: '.invitation-cta',
      start: 'top 90%',
    },
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ACT VI: The Ledger
  // ═══════════════════════════════════════════════════════════════════════════
  gsap.to('.ledger-label', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: '#ledger',
      start: 'top 70%',
    },
  });

  gsap.utils.toArray('.ledger-field').forEach((field, i) => {
    gsap.to(field as Element, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: i * 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.ledger-form',
        start: 'top 70%',
      },
    });
  });

  gsap.to('.ledger-submit', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: '.ledger-submit',
      start: 'top 90%',
    },
  });

  gsap.to('.ledger-trust', {
    opacity: 1,
    duration: 0.6,
    scrollTrigger: {
      trigger: '.ledger-trust',
      start: 'top 95%',
    },
  });
}

// Counter animation helper
function animateCounter() {
  const counterEl = document.querySelector('.counter-number');
  if (!counterEl) return;

  const target = parseInt(counterEl.getAttribute('data-target') || '25', 10);
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(easeOut * target);

    counterEl!.textContent = currentValue.toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
