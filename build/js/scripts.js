/*!
* Start Bootstrap - Creative v7.0.5 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    const normalizePath = function(path) {
        if (!path) return '/';
        const cleaned = path.replace(/\/+$/, '');
        return cleaned === '' ? '/' : cleaned;
    };

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Highlight current page in navbar and services dropdown.
    const currentPath = normalizePath(window.location.pathname);
    const navLinks = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link[href]'));
    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href === '#') return;
        const url = new URL(href, window.location.origin);
        const linkPath = normalizePath(url.pathname);
        const linkHash = url.hash || '';
        const currentHash = window.location.hash || '';

        let isActive = false;
        if (currentPath === linkPath) {
            if (linkHash) {
                // Section links (/#contact etc.) should activate only on exact hash match.
                isActive = currentHash === linkHash;
            } else {
                // Pure page links should activate only when current URL has no hash.
                isActive = currentHash === '';
            }
        }

        if (isActive) {
            link.classList.add('active');
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const toggle = parentDropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.classList.add('active');
            }
        }
    });

    const dropdownItems = [].slice.call(document.querySelectorAll('#navbarResponsive .dropdown-item[href]'));
    dropdownItems.forEach((item) => {
        const itemPath = normalizePath(new URL(item.getAttribute('href'), window.location.origin).pathname);
        if (currentPath === itemPath) {
            item.classList.add('active');
            const parentDropdown = item.closest('.dropdown');
            if (parentDropdown) {
                const toggle = parentDropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.classList.add('active');
            }
        }
    });

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link, #navbarResponsive .dropdown-item')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin only on pages that load it.
    if (typeof SimpleLightbox !== 'undefined' && document.querySelector('#portfolio a.portfolio-box')) {
        new SimpleLightbox({
            elements: '#portfolio a.portfolio-box'
        });
    }

    // Show a centered pop-up for contact email instead of navigating away.
    const emailLinks = [].slice.call(document.querySelectorAll('a[href="mailto:balpopinstal@gmail.com"]'));
    if (emailLinks.length > 0) {
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'email-popup-overlay';
        popupOverlay.setAttribute('aria-hidden', 'true');
        popupOverlay.innerHTML = `
            <div class="email-popup" role="dialog" aria-modal="true" aria-label="Date de contact email">
                <button type="button" class="email-popup-close" aria-label="Inchide">×</button>
                <h3 class="email-popup-title">Contact email</h3>
                <p class="email-popup-value">balpopinstal@gmail.com</p>
                <p class="email-popup-help">Emailul a fost copiat in clipboard.</p>
            </div>
        `;
        document.body.appendChild(popupOverlay);

        const closePopup = () => {
            popupOverlay.classList.remove('is-visible');
            popupOverlay.setAttribute('aria-hidden', 'true');
        };

        const showPopup = async () => {
            const help = popupOverlay.querySelector('.email-popup-help');
            try {
                await navigator.clipboard.writeText('balpopinstal@gmail.com');
                help.textContent = 'Emailul a fost copiat in clipboard.';
            } catch (_err) {
                help.textContent = 'Copiere indisponibila. Poti folosi adresa afisata.';
            }
            popupOverlay.classList.add('is-visible');
            popupOverlay.setAttribute('aria-hidden', 'false');
        };

        const closeBtn = popupOverlay.querySelector('.email-popup-close');
        closeBtn.addEventListener('click', closePopup);
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) closePopup();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupOverlay.classList.contains('is-visible')) {
                closePopup();
            }
        });

        emailLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPopup();
            });
        });
    }

});
