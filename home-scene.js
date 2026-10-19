/* Fixed scene coordinates, native horizontal browsing, and a rear paper layer. */
(() => {
  const home = document.getElementById('home-view');
  const pan = document.getElementById('scene-pan');
  const board = document.getElementById('a-little-more');
  const status = document.getElementById('scene-status');
  const animations = new Map(), timers = new Map(), dancers = new Map(), idleTimers = new Map();
  const characters = [...document.querySelectorAll('[data-dance]')];
  let statusTimer, reveal = 0, maxReveal = 360, geometryReady = false, previousOverflow = false, panFraction = .5, revealRaf = 0, drag = null, suppressClick = false;
  const reduced = () => document.body.classList.contains('reduced-motion');
  const clamp = (value, max) => Math.max(0, Math.min(max, value));
  function setReveal(value) {
    reveal = clamp(value, maxReveal);
    home.style.setProperty('--reveal', `${reveal}px`);
    const visible = reveal > 1;
    board.inert = !visible;
    board.setAttribute('aria-hidden', String(!visible));
    home.dataset.paper = reveal < 1 ? 'closed' : reveal >= maxReveal - 1 ? 'open' : 'partial';
  }
  function animateReveal(value) {
    cancelAnimationFrame(revealRaf);
    if (reduced()) { setReveal(value); return; }
    const from = reveal, started = performance.now();
    function step(now) {
      const progress = clamp((now - started) / 220, 1);
      setReveal(from + (value - from) * (1 - (1 - progress) ** 3));
      if (progress < 1) revealRaf = requestAnimationFrame(step);
    }
    revealRaf = requestAnimationFrame(step);
  }
  pan.addEventListener('scroll', () => {
    if (!home.hidden && pan.scrollWidth > pan.clientWidth) panFraction = pan.scrollLeft / (pan.scrollWidth - pan.clientWidth);
  }, {passive:true});
  function layoutScene() {
    const width = home.clientWidth, height = home.clientHeight;
    const compact = matchMedia('(max-width:760px), (max-width:1100px) and (orientation:portrait)').matches;
    const scale = compact ? Math.min(1, height / 612) : Math.min(width / 1448, height / 612);
    const oldRange = Math.max(0, pan.scrollWidth - pan.clientWidth);
    const fraction = oldRange && !home.hidden ? pan.scrollLeft / oldRange : panFraction;
    home.style.setProperty('--scene-scale', String(scale));
    home.style.setProperty('--view-width', `${width}px`);
    maxReveal = Math.min(compact ? 480 : 380, height * .72);
    home.style.setProperty('--paper-height', `${maxReveal}px`);
    setReveal(reveal);
    const overflow = 1448 * scale > width + 1;
    const range = Math.max(0, 1448 * scale - width);
    pan.scrollLeft = overflow ? range * (geometryReady && previousOverflow ? fraction : .5) : 0;
    previousOverflow = overflow;
    geometryReady = true;
  }
  layoutScene();
  new ResizeObserver(layoutScene).observe(home);
  function closeBoard() { animateReveal(0); }
  document.getElementById('close-about').addEventListener('click', () => {
    closeBoard(); document.querySelector('.home-link').focus({preventScroll:true});
  });
  document.querySelector('.home-link').addEventListener('click', event => {
    if (!document.body.classList.contains('is-home')) return;
    event.preventDefault(); closeBoard();
  });
  home.addEventListener('wheel', event => {
    const horizontal = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (horizontal && event.target.closest('.home-layout')) {
      pan.scrollLeft += event.deltaX || event.deltaY;
      event.preventDefault(); return;
    }
    if (!event.deltaY) return;
    if (event.target.closest('.little-more') && reveal >= maxReveal - 1) {
      if (event.deltaY > 0 || board.scrollTop > 0) return;
    }
    cancelAnimationFrame(revealRaf);
    setReveal(reveal + event.deltaY * (event.deltaMode === 1 ? 16 : 1));
    event.preventDefault();
  }, {passive:false});
  home.addEventListener('pointerdown', event => {
    suppressClick = false;
    if (event.target.closest('.little-more')) return;
    const mouse = event.pointerType === 'mouse';
    if (mouse && (event.button !== 0 || event.target.closest('button, a'))) return;
    drag = {x:event.clientX, y:event.clientY, base:reveal, scroll:pan.scrollLeft, axis:null, mouse};
    if (mouse) home.setPointerCapture(event.pointerId);
  });
  home.addEventListener('pointermove', event => {
    if (!drag) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.axis && Math.hypot(dx,dy) > 9) drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (drag.axis) { suppressClick = true; home.dataset.dragging = 'true'; }
    if (drag.axis === 'x' && drag.mouse) { pan.scrollLeft = drag.scroll - dx; event.preventDefault(); }
    if (drag.axis === 'y') {
      cancelAnimationFrame(revealRaf);
      setReveal(drag.base - dy);
      event.preventDefault();
    }
  }, {passive:false});
  function endDrag() { drag = null; delete home.dataset.dragging; }
  home.addEventListener('pointerup', endDrag);
  home.addEventListener('pointercancel', endDrag);
  home.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopImmediatePropagation(); suppressClick = false; }
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.getElementById('contact-panel').hidden = true;
      document.getElementById('contact-toggle').setAttribute('aria-expanded', 'false');
      if (!home.hidden) closeBoard();
    }
    if (home.hidden || event.target.matches('input, textarea, select')) return;
    if (event.key === 'PageDown' || event.key === 'End') { event.preventDefault(); animateReveal(maxReveal); }
    if (event.key === 'PageUp' || event.key === 'Home') { event.preventDefault(); closeBoard(); }
    if (event.target === pan && ['ArrowLeft','ArrowRight'].includes(event.key)) {
      event.preventDefault(); pan.scrollBy({left:event.key === 'ArrowRight' ? 120 : -120, behavior:reduced() ? 'instant' : 'smooth'});
    }
  });
  document.addEventListener('click', event => {
    if (event.target.closest('#contact-toggle, #contact-panel')) return;
    document.getElementById('contact-panel').hidden = true;
    document.getElementById('contact-toggle').setAttribute('aria-expanded','false');
  });
  function idleFrame(button, closed = false) {
    button.dataset.dancing = 'false';
    button.dataset.blink = String(closed);
    button.dataset.motionMode = 'idle';
    button.dataset.frame = closed ? '1' : '0';
  }
  function startIdle(button) {
    clearTimeout(idleTimers.get(button));
    idleTimers.delete(button);
    idleFrame(button);
    if (reduced() || document.hidden || home.hidden) return;
    function schedule(delay) {
      idleTimers.set(button, setTimeout(() => {
        if (reduced() || document.hidden || home.hidden || button.dataset.dancing === 'true') return;
        idleFrame(button, true);
        idleTimers.set(button, setTimeout(() => { idleFrame(button); schedule(4300); }, 120));
      }, delay));
    }
    schedule(button.dataset.dance === 'bluey' ? 2200 : 3400);
  }
  function cancelAnimations() {
    animations.forEach(animation => animation.cancel()); animations.clear();
    timers.forEach(clearTimeout); timers.clear();
    dancers.forEach(clearInterval); dancers.clear();
    idleTimers.forEach(clearTimeout); idleTimers.clear();
    characters.forEach(button => idleFrame(button));
    home.querySelectorAll('.is-touched').forEach(el => el.classList.remove('is-touched'));
    clearTimeout(statusTimer); status.textContent = '';
  }
  function refreshIdle() {
    characters.forEach(button => { if (!idleTimers.has(button) && button.dataset.dancing !== 'true') startIdle(button); });
  }
  function announce(message) {
    clearTimeout(statusTimer); status.textContent = message;
    statusTimer = setTimeout(() => { status.textContent = ''; }, 3400);
  }
  characters.forEach(button => button.addEventListener('click', () => {
    clearTimeout(idleTimers.get(button)); idleTimers.delete(button);
    clearInterval(dancers.get(button)); dancers.delete(button);
    const name = button.dataset.dance === 'bluey' ? 'Bluey' : 'Bingo';
    announce(reduced() ? `${name} 和你打了个招呼。` : `${name} 跳起了搞怪的小舞步。`);
    if (reduced()) { idleFrame(button); return; }
    button.dataset.blink = 'false'; button.dataset.dancing = 'true'; button.dataset.motionMode = 'dance';
    let step = 0;
    function draw() {
      button.style.setProperty('--frame-x', `${(step % 4) * 100 / 3}%`);
      button.style.setProperty('--frame-y', step % 8 < 4 ? '0%' : '100%');
      button.dataset.frame = String(step % 8);
    }
    draw();
    dancers.set(button, setInterval(() => {
      step++;
      if (step >= 24) { clearInterval(dancers.get(button)); dancers.delete(button); startIdle(button); }
      else draw();
    },130));
  }));
  document.querySelectorAll('[data-play]').forEach(button => button.addEventListener('click', () => {
    animations.get(button)?.cancel(); clearTimeout(timers.get(button));
    const swing = button.dataset.play === 'swing';
    announce(swing ? '秋千摇起来了。' : '花丛也和你打了个招呼。');
    button.classList.add('is-touched');
    timers.set(button, setTimeout(() => { button.classList.remove('is-touched'); timers.delete(button); },500));
    if (reduced()) return;
    const degrees = swing ? [0,18,-14,10,-6,3,0] : [0,-7,6,-4,2,0];
    const animation = button.animate(degrees.map(deg => ({transform:`rotate(${deg}deg)`})), {duration:swing ? 2400 : 900,easing:'ease-in-out'});
    animations.set(button,animation);
    animation.onfinish = () => { if (animations.get(button) === animation) animations.delete(button); };
  }));
  new MutationObserver(() => {
    if (reduced() || !document.body.classList.contains('is-home')) cancelAnimations(); else refreshIdle();
  }).observe(document.body,{attributes:true,attributeFilter:['class']});
  new MutationObserver(() => {
    if (home.hidden) { cancelAnimations(); cancelAnimationFrame(revealRaf); setReveal(0); }
    else { layoutScene(); refreshIdle(); }
  }).observe(home,{attributes:true,attributeFilter:['hidden']});
  document.addEventListener('visibilitychange',() => { if (document.hidden) cancelAnimations(); else refreshIdle(); });
  refreshIdle();
  if (location.hash === '#a-little-more') setReveal(maxReveal);
})();
