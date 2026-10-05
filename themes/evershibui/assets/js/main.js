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
    // Below this width the drawer overlays the content instead of pushing it.
    var overlayQuery = window.matchMedia('(max-width: 900px)');
    var isSidebarOpen = function () {
      return shell.getAttribute('data-sidebar-open') === 'true';
    };
    var setSidebarOpen = function (open) {
      shell.setAttribute('data-sidebar-open', String(open));
      sidebarToggle.setAttribute('aria-expanded', String(open));
    };

    setSidebarOpen(isSidebarOpen());

    sidebarToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      setSidebarOpen(!isSidebarOpen());
    });

    // Crossing the breakpoint: overlay starts closed, desktop restores the page default.
    overlayQuery.addEventListener('change', function (event) {
      setSidebarOpen(!event.matches && shell.dataset.sidebarDefault === 'true');
    });

    // Close the overlay when clicking outside the drawer (e.g. the backdrop).
    document.addEventListener('click', function (event) {
      if (overlayQuery.matches && isSidebarOpen() && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    });

    // Close the overlay after following a link inside the drawer.
    sidebar.addEventListener('click', function (event) {
      if (overlayQuery.matches && event.target.closest('a')) {
        setSidebarOpen(false);
      }
    });

    // Close the overlay on Escape.
    document.addEventListener('keydown', function (event) {
      if (overlayQuery.matches && event.key === 'Escape') {
        setSidebarOpen(false);
      }
    });
  }
})();
