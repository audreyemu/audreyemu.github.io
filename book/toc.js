// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded "><a href="projects/projects.html"><strong aria-hidden="true">1.</strong> Projects</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="projects/adblocker-lab.html"><strong aria-hidden="true">1.1.</strong> ??? TODO: Adblocker Lab</a></li><li class="chapter-item expanded "><a href="projects/advanced-and-secure-computer-architecture.html"><strong aria-hidden="true">1.2.</strong> *** TODO: Advanced and Secure Computer Architecture</a></li><li class="chapter-item expanded "><a href="projects/secure-and-reliable-network.html"><strong aria-hidden="true">1.3.</strong> *** TODO: Secure and Reliable Network</a></li><li class="chapter-item expanded "><a href="projects/secure-sqlite-library.html"><strong aria-hidden="true">1.4.</strong> ??? TODO: Secure SQLite Library</a></li><li class="chapter-item expanded "><a href="projects/lactf.html"><strong aria-hidden="true">1.5.</strong> ??? TODO: LA CTF</a></li><li class="chapter-item expanded "><a href="projects/bruinwalk-security-audit.html"><strong aria-hidden="true">1.6.</strong> ??? TODO: Bruinwalk Security Audit</a></li><li class="chapter-item expanded "><a href="projects/game-hacking.html"><strong aria-hidden="true">1.7.</strong> ??? TODO: Game Hacking</a></li><li class="chapter-item expanded "><a href="projects/rootkit-malware.html"><strong aria-hidden="true">1.8.</strong> ??? TODO: Rootkit Malware</a></li></ol></li><li class="chapter-item expanded "><a href="blog/blog.html"><strong aria-hidden="true">2.</strong> Blog</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="blog/ghidra.html"><strong aria-hidden="true">2.1.</strong> *** TODO: Ghidra</a></li><li class="chapter-item expanded "><a href="blog/gdb-scripting.html"><strong aria-hidden="true">2.2.</strong> *** TODO: GDB Scripting</a></li><li class="chapter-item expanded "><a href="blog/security-plus.html"><strong aria-hidden="true">2.3.</strong> ??? TODO: Security+ (SY0-701)</a></li><li class="chapter-item expanded "><a href="blog/microcorruption.html"><strong aria-hidden="true">2.4.</strong> *** TODO: Microcorruption</a></li><li class="chapter-item expanded "><a href="blog/process-injection.html"><strong aria-hidden="true">2.5.</strong> ??? TODO: Process Injection</a></li></ol></li><li class="chapter-item expanded "><a href="other/other.html"><strong aria-hidden="true">3.</strong> Other</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="other/survivor.html"><strong aria-hidden="true">3.1.</strong> Survivor @ UCLA</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
