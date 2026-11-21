// ==========================================================
// PAT TECH - Cầu nối Live Brand Customizer & Telegram 1s Sim
// Dùng chung cho toàn bộ các trang Demo độc lập (/demos/*/)
// ==========================================================
(function () {
  if (window.__PAT_DEMO_BRIDGE_LOADED__) return;
  window.__PAT_DEMO_BRIDGE_LOADED__ = true;

  const COLOR_VARS = [
    '--gold-primary', '--gold-bronze', '--gold-light', '--gold-gradient',
    '--champagne', '--rose-gold', '--rose-deep', '--champagne-gold',
    '--accent-cerulean', '--accent-cobalt', '--accent-emerald', '--accent-teal',
    '--red-primary', '--red-hover', '--red-gradient',
    '--brand-indigo', '--brand-blue',
    '--primary-emerald', '--emerald-light', '--emerald-dark', '--emerald-gradient',
    '--crimson-royal', '--crimson-bright',
    '--cinnabar-red', '--cinnabar-bright',
    '--terracotta', '--boba-amber'
  ];

  const PALETTES = {
    'royal-gold': {
      primary: '#C59B27',
      dark: '#8E6B13',
      light: '#E8CF82',
      gradient: 'linear-gradient(135deg, #D9B44A 0%, #C59B27 55%, #8E6B13 100%)'
    },
    'emerald-zen': {
      primary: '#10B981',
      dark: '#047857',
      light: '#A7F3D0',
      gradient: 'linear-gradient(135deg, #34D399 0%, #059669 55%, #065F46 100%)'
    },
    'ocean-pro': {
      primary: '#0284C7',
      dark: '#0369A1',
      light: '#BAE6FD',
      gradient: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 55%, #1D4ED8 100%)'
    },
    'rose-luxe': {
      primary: '#B76E79',
      dark: '#964E59',
      light: '#F3D5D9',
      gradient: 'linear-gradient(135deg, #D18A94 0%, #B76E79 55%, #964E59 100%)'
    },
    'crimson-vip': {
      primary: '#E11D48',
      dark: '#9F1239',
      light: '#FECDD3',
      gradient: 'linear-gradient(135deg, #FB7185 0%, #E11D48 55%, #9F1239 100%)'
    }
  };

  let origTitle = document.title;
  const phoneTextNodeMap = new Map();
  let audioCtx = null;

  function getBrandTarget() {
    return (
      document.querySelector('.brand-logo h1') ||
      document.querySelector('.brand-logo .brand-name strong') ||
      document.querySelector('.brand-logo .brand-title') ||
      document.querySelector('a.brand-logo')
    );
  }

  function getInitials(name) {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '';
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function collectPhoneTextNodes() {
    if (phoneTextNodeMap.size > 0) return;
    const containers = document.querySelectorAll('header, footer, .top-bar, .navbar, .branch-hours, .booking-features, .booking-perks-card, .concierge-box');
    const phoneRegex = /\b(?:\+?84|0)(?:[\s.]?\d){8,10}\b|\b1[89]00(?:[\s.]?\d){4,6}\b/;
    containers.forEach(root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && node.parentElement.closest('a[href^="tel:"]')) continue;
        if (phoneRegex.test(node.nodeValue || '')) {
          phoneTextNodeMap.set(node, node.nodeValue);
        }
      }
    });
  }

  function applyBrandPreview(payload) {
    const brandName = (payload && payload.brandName ? String(payload.brandName) : '').trim();
    const phone = (payload && payload.phone ? String(payload.phone) : '').trim();
    const paletteKey = (payload && payload.palette) ? String(payload.palette) : 'default';

    // 1. Brand Name & Emblem
    const brandEl = getBrandTarget();
    if (brandEl) {
      if (brandEl.dataset.patOrigHtml === undefined) {
        brandEl.dataset.patOrigHtml = brandEl.innerHTML;
      }
      if (brandName) {
        brandEl.textContent = brandName;
      } else {
        brandEl.innerHTML = brandEl.dataset.patOrigHtml;
      }
    }

    const emblemEl = document.querySelector('.brand-logo .logo-emblem, .brand-logo .brand-mark');
    if (emblemEl) {
      if (emblemEl.dataset.patOrigEmblem === undefined) {
        emblemEl.dataset.patOrigEmblem = emblemEl.textContent.trim();
      }
      const origEmblem = emblemEl.dataset.patOrigEmblem;
      if (/^[A-Za-z0-9&]{1,3}$/.test(origEmblem)) {
        emblemEl.textContent = brandName ? getInitials(brandName) : origEmblem;
      }
    }

    document.title = brandName ? `${brandName} — Live Preview | PAT TECH` : origTitle;

    // 2. Phone / Hotline
    const telPattern = /\b(?:\+?84|0|1[89]00)[\d.\s]{4,}/;
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      if (a.dataset.patOrigHref === undefined) {
        a.dataset.patOrigHref = a.getAttribute('href') || '';
        a.dataset.patOrigHtml = a.innerHTML;
      }
      if (phone) {
        const digits = phone.replace(/[^0-9+]/g, '') || phone;
        a.setAttribute('href', `tel:${digits}`);
        a.innerHTML = a.dataset.patOrigHtml;
        let replaced = false;
        const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null);
        let tNode;
        while ((tNode = walker.nextNode())) {
          if (telPattern.test(tNode.nodeValue || '')) {
            tNode.nodeValue = tNode.nodeValue.replace(telPattern, phone);
            replaced = true;
          }
        }
        if (!replaced) {
          a.textContent = phone;
        }
      } else {
        a.setAttribute('href', a.dataset.patOrigHref);
        a.innerHTML = a.dataset.patOrigHtml;
      }
    });

    collectPhoneTextNodes();
    phoneTextNodeMap.forEach((origText, node) => {
      if (phone) {
        node.nodeValue = origText.replace(/\b(?:\+?84|0)(?:[\s.]?\d){8,10}\b|\b1[89]00(?:[\s.]?\d){4,6}\b/g, phone);
      } else {
        node.nodeValue = origText;
      }
    });

    // 3. Accent Palette
    const rootStyle = document.documentElement.style;
    if (!paletteKey || paletteKey === 'default' || !PALETTES[paletteKey]) {
      COLOR_VARS.forEach(v => rootStyle.removeProperty(v));
    } else {
      const p = PALETTES[paletteKey];
      const varMap = {
        '--gold-primary': p.primary,
        '--gold-bronze': p.dark,
        '--gold-light': p.light,
        '--gold-gradient': p.gradient,
        '--champagne': p.primary,
        '--rose-gold': p.primary,
        '--rose-deep': p.dark,
        '--champagne-gold': p.light,
        '--accent-cerulean': p.primary,
        '--accent-cobalt': p.dark,
        '--accent-emerald': p.primary,
        '--accent-teal': p.dark,
        '--red-primary': p.primary,
        '--red-hover': p.dark,
        '--red-gradient': p.gradient,
        '--brand-indigo': p.primary,
        '--brand-blue': p.dark,
        '--primary-emerald': p.primary,
        '--emerald-light': p.light,
        '--emerald-dark': p.dark,
        '--emerald-gradient': p.gradient,
        '--crimson-royal': p.primary,
        '--crimson-bright': p.dark,
        '--cinnabar-red': p.primary,
        '--cinnabar-bright': p.dark,
        '--terracotta': p.primary,
        '--boba-amber': p.light
      };
      Object.entries(varMap).forEach(([k, val]) => {
        rootStyle.setProperty(k, val);
      });
    }
  }

  const TELEGRAM_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M21.2 4.4L2.9 11.4c-.9.3-.9 1.6.1 1.9l4.5 1.4 1.7 5.4c.3.8 1.3 1.1 1.9.5l2.6-2.5 4.9 3.6c.8.6 1.9.1 2.1-.8l2.5-14.7c.2-1.1-.8-2.1-2-1.8z" fill="#fff"/><path d="M9.7 14.3l8.6-7.7-6.6 8.9-.3 3.7-1.7-4.9z" fill="#dbeafe" opacity=".55"/></svg>`;

  function ensureBridgeStyles() {
    if (document.getElementById('patDemoBridgeStyles')) return;
    const style = document.createElement('style');
    style.id = 'patDemoBridgeStyles';
    style.textContent = `
      @media (max-width: 768px) {
        input[type="text"], input[type="tel"], input[type="email"], input[type="number"], input[type="date"], select, textarea {
          font-size: max(16px, 1em) !important;
        }
      }
      @keyframes patTgRingPulse {
        0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.55); }
        70% { box-shadow: 0 0 0 8px rgba(56, 189, 248, 0); }
        100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
      }
      @keyframes patTgProgress {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
      }
      .pat-demo-tg-toast {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 99999;
        width: 356px;
        max-width: calc(100vw - 24px);
        background: rgba(15, 23, 42, 0.94);
        color: #f8fafc;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 18px;
        padding: 12px 14px 14px;
        box-shadow: 0 20px 48px rgba(2, 6, 23, 0.48);
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        overflow: hidden;
        visibility: hidden;
        pointer-events: none;
        opacity: 0;
        transform: translateY(-18px) scale(0.96);
        transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.28s;
      }
      .pat-demo-tg-toast.open {
        visibility: visible;
        pointer-events: auto;
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      .pat-demo-tg-row {
        display: flex;
        align-items: center;
        gap: 11px;
      }
      .pat-demo-tg-icon {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background: linear-gradient(135deg, #38bdf8, #0284c7);
        display: grid;
        place-items: center;
        flex-shrink: 0;
        animation: patTgRingPulse 1.8s ease-out 2;
      }
      .pat-demo-tg-content {
        min-width: 0;
        flex: 1;
      }
      .pat-demo-tg-meta {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.74rem;
        line-height: 1.25;
        margin-bottom: 2px;
        overflow: hidden;
        white-space: nowrap;
      }
      .pat-demo-tg-title { font-weight: 800; color: #ffffff; }
      .pat-demo-tg-speed { font-weight: 800; color: #4ade80; }
      .pat-demo-tg-sub {
        color: #94a3b8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pat-demo-tg-line1 {
        font-size: 0.84rem;
        font-weight: 700;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
      }
      .pat-demo-tg-line2 {
        font-size: 0.77rem;
        color: #cbd5e1;
        line-height: 1.35;
        margin-top: 2px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .pat-demo-tg-close {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.12);
        color: #cbd5e1;
        display: grid;
        place-items: center;
        font-size: 0.82rem;
        font-weight: 700;
        cursor: pointer;
        flex-shrink: 0;
      }
      .pat-demo-tg-progress {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2.5px;
        background: linear-gradient(90deg, #38bdf8, #4ade80);
        transform-origin: left center;
      }
      .pat-demo-tg-toast.open .pat-demo-tg-progress {
        animation: patTgProgress 6s linear forwards;
      }
      @media (max-width: 768px) {
        .pat-demo-tg-toast {
          left: 12px;
          right: 12px;
          top: calc(10px + env(safe-area-inset-top, 0px));
          width: auto;
          max-width: 406px;
          margin: 0 auto;
        }
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function unlockChimeOnce() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    } catch (e) {}
  }

  document.addEventListener('pointerdown', unlockChimeOnce, { once: true, passive: true });

  // Soft Telegram "ting!" chime via Web Audio API
  function playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtx) audioCtx = new AudioCtx();

      const playNotes = () => {
        try {
          const now = audioCtx.currentTime;
          [880, 1174.66].forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.001, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.28);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.3);
          });
        } catch (e) {}
      };

      if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(playNotes).catch(() => {});
      } else {
        playNotes();
      }
    } catch (e) {}
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showStandaloneTgToast(order) {
    ensureBridgeStyles();
    playChime();
    let toast = document.getElementById('patDemoTgToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'patDemoTgToast';
      toast.className = 'pat-demo-tg-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    const detailLine = order.note ? `${order.service} — ${order.note}` : order.service;
    toast.classList.remove('open');
    toast.innerHTML = `
      <div class="pat-demo-tg-row">
        <div class="pat-demo-tg-icon">${TELEGRAM_SVG}</div>
        <div class="pat-demo-tg-content">
          <div class="pat-demo-tg-meta">
            <span class="pat-demo-tg-title">Telegram Bot</span>
            <span class="pat-demo-tg-speed">• 0.8s</span>
            <span class="pat-demo-tg-sub">${escapeHtml(order.brand)}</span>
          </div>
          <div class="pat-demo-tg-line1">🔥 ${escapeHtml(order.name)} — ${escapeHtml(order.phone)}</div>
          <div class="pat-demo-tg-line2">${escapeHtml(detailLine)}</div>
        </div>
        <button type="button" class="pat-demo-tg-close" aria-label="Đóng" onclick="this.closest('#patDemoTgToast').classList.remove('open')">✕</button>
      </div>
      <div class="pat-demo-tg-progress" key="${Date.now()}"></div>
    `;

    void toast.offsetWidth;
    toast.classList.add('open');

    clearTimeout(window.__patToastTimer);
    window.__patToastTimer = setTimeout(() => {
      if (toast) toast.classList.remove('open');
    }, 6500);
  }

  function extractOrderFromForm(form) {
    const brandEl = getBrandTarget();
    const brand = (brandEl ? brandEl.textContent.trim() : '') || origTitle.split('-')[0].trim() || 'PAT TECH';

    const nameInput = form.querySelector('input[id*="Name" i], input[name*="name" i], input[placeholder*="Tên" i], input[type="text"]');
    const phoneInput = form.querySelector('input[type="tel"], input[id*="Phone" i], input[name*="phone" i], input[placeholder*="SĐT" i]');
    const serviceInput = form.querySelector('select');
    const noteInput = form.querySelector('textarea, input[id*="Note" i], input[id*="Addr" i]');

    let serviceText = origTitle.split('-')[0].trim();
    if (serviceInput && serviceInput.options && serviceInput.selectedIndex >= 0) {
      serviceText = serviceInput.options[serviceInput.selectedIndex].text;
    }

    return {
      brand,
      name: (nameInput && nameInput.value.trim()) || 'Khách hàng trải nghiệm',
      phone: (phoneInput && phoneInput.value.trim()) || '0912.345.678',
      service: serviceText,
      note: (noteInput && noteInput.value.trim()) || ''
    };
  }

  window.patEmitDemoOrder = function (orderObj) {
    const brandEl = getBrandTarget();
    const order = Object.assign({
      brand: (brandEl ? brandEl.textContent.trim() : '') || 'PAT TECH',
      name: 'Khách hàng mới',
      phone: '0912.345.678',
      service: origTitle.split('-')[0].trim(),
      note: ''
    }, orderObj || {});

    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'PAT_TELEGRAM_SIM', order }, '*');
    } else {
      showStandaloneTgToast(order);
    }
  };

  // Listen to parent Live Preview customizer messages
  window.addEventListener('message', (event) => {
    const data = event && event.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'PAT_BRAND_PREVIEW') {
      applyBrandPreview(data);
    }
  });

  // Listen to any form submission inside demo without blocking existing handlers
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form || form.tagName !== 'FORM') return;
    const order = extractOrderFromForm(form);
    window.patEmitDemoOrder(order);
  });

  function notifyParentReady() {
    ensureBridgeStyles();
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'PAT_DEMO_READY', title: origTitle }, '*');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', notifyParentReady);
  } else {
    notifyParentReady();
  }
})();
