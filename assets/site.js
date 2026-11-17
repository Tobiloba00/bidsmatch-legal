(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Back to top
  var top = document.querySelector('.to-top');
  if (top) {
    window.addEventListener('scroll', function () {
      top.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  }

  // Table of contents built from h2 headings
  var tocHost = document.getElementById('toc');
  var content = document.querySelector('.content');
  if (!tocHost || !content) return;
  var heads = content.querySelectorAll('h2');
  if (heads.length < 3) { tocHost.parentNode.style.display = 'none'; return; }

  var list = document.createElement('ol');
  var links = [];
  heads.forEach(function (h, i) {
    if (!h.id) h.id = 's' + (i + 1);
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
    links.push(a);
  });

  var narrow = window.matchMedia('(max-width: 900px)').matches;
  if (narrow) {
    var d = document.createElement('details');
    var s = document.createElement('summary');
    s.textContent = 'On this page';
    d.appendChild(s);
    d.appendChild(list);
    tocHost.appendChild(d);
  } else {
    var t = document.createElement('h4');
    t.textContent = 'On this page';
    tocHost.appendChild(t);
    tocHost.appendChild(list);
  }

  // Scroll spy
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          var idx = Array.prototype.indexOf.call(heads, e.target);
          links[idx].classList.add('active');
          if (!narrow) links[idx].scrollIntoView({ block: 'nearest' });
        }
      });
    }, { rootMargin: '-90px 0px -70% 0px' });
    heads.forEach(function (h) { io.observe(h); });
  }
})();
