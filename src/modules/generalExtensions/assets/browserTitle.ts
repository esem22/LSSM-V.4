export default (LSSM: Vue): void => {
    const heading = document.querySelector('h1, h2, h3, h4, h5, h6');
    let title =
        heading?.textContent
            ?.trim()
            .replace(/\n/g, ' ')
            .replace(/ {2,}/g, ' ') ||
        window.location.pathname.replace(/^\/|\/$/g, '');
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand && navbarBrand?.textContent?.trim())
        title = `${navbarBrand?.textContent.trim()}: ${title}`;
    if (window.location !== window.parent.location && title.length)
        title = `[${title}] `;
    else if (title.length) title = `${title} | `;
    window.tellParent(
        `var _a;
        if (((_a = document.getElementById('lightbox_box')) === null || _a === void 0 ? void 0 : _a.style.display) !== 'none') document.title = ${JSON.stringify(
            title + LSSM.$store.state.games[LSSM.$store.state.lang].name
        )};`
    );
    LSSM.$store
        .dispatch('hook', {
            event: 'lightboxClose',
            post: true,
            callback() {
                document.title = `${title}${
                    LSSM.$store.state.games[LSSM.$store.state.lang].name
                }`;
            },
        })
        .then();
};
