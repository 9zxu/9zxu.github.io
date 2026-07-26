(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* localStorage unavailable, theme just won't persist */
      }
    });
  }

  var shell = document.querySelector('.shell');
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebar-toggle');

  if (shell && sidebar && sidebarToggle && !sidebarToggle.dataset.bound) {
    sidebarToggle.dataset.bound = 'true';
    var setSidebarOpen = function (open) {
      shell.setAttribute('data-sidebar-open', String(open));
      sidebarToggle.setAttribute('aria-expanded', String(open));
    };

    sidebarToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var isOpen = shell.getAttribute('data-sidebar-open') === 'true';
      setSidebarOpen(!isOpen);
    });

    // Close when clicking outside the drawer (e.g. the backdrop).
    document.addEventListener('click', function (event) {
      var isOpen = shell.getAttribute('data-sidebar-open') === 'true';
      if (isOpen && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    });

    // Close after following a link inside the drawer.
    sidebar.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setSidebarOpen(false);
      }
    });

    // Close on Escape.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    });
  }
})();
