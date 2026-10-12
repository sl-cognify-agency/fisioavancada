(function () {

    "use strict";


    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ===================================================== */

    var nav = document.getElementById("nav");
    var burger = document.getElementById("bg");

    var reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    if (burger && nav) {

        burger.addEventListener("click", function () {

            var open = nav.classList.toggle("o");

            burger.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

            burger.setAttribute(
                "aria-label",
                open ? "Fechar menu" : "Abrir menu"
            );

        });


        nav.querySelectorAll("ul a").forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("o");

                burger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                burger.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

    }


    /* =====================================================
       ANIMAÇÕES AO ENTRAR NO ECRÃ
    ===================================================== */

    var revealElements = document.querySelectorAll(
        ".rv, .story .big"
    );


    if ("IntersectionObserver" in window) {

        var observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("v");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


        revealElements.forEach(function (element) {

            element.style.setProperty("--d", "0s");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("v");

        });

    }


    /* =====================================================
       PARALLAX DAS FOTOGRAFIAS
    ===================================================== */

    var parallaxElements = Array.prototype.slice.call(
        document.querySelectorAll("[data-px]")
    );

    var timeline = document.getElementById("tl");


    function updatePage() {

        if (!reducedMotion) {

            parallaxElements.forEach(function (element) {

                var rect = element.getBoundingClientRect();

                if (
                    rect.bottom > 0 &&
                    rect.top < window.innerHeight
                ) {

                    element.style.setProperty(
                        "--y",
                        (rect.top * -0.06) + "px"
                    );

                }

            });

        }


        /* =================================================
           TIMELINE
        ================================================= */

        if (timeline) {

            var rect = timeline.getBoundingClientRect();

            var progress = Math.min(
                1,
                Math.max(
                    0,
                    (
                        window.innerHeight * 0.6 -
                        rect.top
                    ) / rect.height
                )
            );

            timeline.style.setProperty(
                "--p",
                (progress * 100) + "%"
            );

        }

    }


    /* =====================================================
       NAVBAR — SCROLL
    ===================================================== */

    var lastScrollY = window.scrollY;
    var ticking = false;


    function updateNavbar() {

        var currentScrollY = window.scrollY;


        /* -----------------------------------------------
           No topo
        ------------------------------------------------ */

        if (currentScrollY <= 20) {

            nav.classList.remove("nav-hidden");

        }


        /* -----------------------------------------------
           Scroll para baixo
        ------------------------------------------------ */

        else if (currentScrollY > lastScrollY) {

            nav.classList.add("nav-hidden");


            if (nav.classList.contains("o")) {

                nav.classList.remove("o");

                if (burger) {

                    burger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    burger.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }

            }

        }


        /* -----------------------------------------------
           Scroll para cima
        ------------------------------------------------ */

        else if (currentScrollY < lastScrollY) {

            nav.classList.remove("nav-hidden");

        }


        lastScrollY = currentScrollY;

        ticking = false;

    }


    /* =====================================================
       SCROLL
    ===================================================== */

    window.addEventListener(
        "scroll",
        function () {

            updatePage();

            if (!ticking) {

                window.requestAnimationFrame(
                    updateNavbar
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    updatePage();
    updateNavbar();


    /* =====================================================
       SERVIÇOS / ACCORDION
    ===================================================== */

    var serviceButtons = document.querySelectorAll(
        "#sv button"
    );


    serviceButtons.forEach(function (button) {


        function activateService() {

            serviceButtons.forEach(function (item) {

                var active = item === button;

                item.setAttribute(
                    "aria-expanded",
                    active ? "true" : "false"
                );

                var panel = document.getElementById(
                    item.getAttribute("aria-controls")
                );

                if (panel) {

                    panel.classList.toggle(
                        "a",
                        active
                    );

                }

            });

        }


        button.addEventListener(
            "click",
            activateService
        );


        button.addEventListener(
            "mouseenter",
            function () {

                if (
                    window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {

                    activateService();

                }

            }
        );

    });


    /* =====================================================
       FECHAR MENU COM ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                nav.classList.contains("o")
            ) {

                nav.classList.remove("o");

                if (burger) {

                    burger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    burger.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                    burger.focus();

                }

            }

        }
    );


    /* =====================================================
       FECHAR MENU AO CLICAR FORA
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !nav.classList.contains("o") ||
                nav.contains(event.target)
            ) {
                return;
            }

            nav.classList.remove("o");

            if (burger) {

                burger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                burger.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        }
    );

})();


function toggleReview(button) {
    const content = button.closest('.qt-review-content');
    const isExpanded = content.classList.toggle('is-expanded');

    button.setAttribute('aria-expanded', String(isExpanded));

    button.innerHTML = isExpanded
        ? 'Mostrar menos <span aria-hidden="true">↑</span>'
        : 'Ler testemunho completo <span aria-hidden="true">↓</span>';
}
