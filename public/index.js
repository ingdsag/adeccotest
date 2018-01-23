const app = function() {

    /**
     * General request for the hotels and hotels list api
     * @type {{url: string, init: {method: string, headers: {"Content-Type": string}, mode: string, cache: string}}}
     */
    const hotelsSettings = {
        url: 'http://localhost:8765/api/hotels',
        init: {
            method: 'GET',
            headers: {
                "Content-Type": "text/plain"
            },
            mode: 'cors',
            cache: 'default'
        }
    };

    const appContainer = document.getElementById('app');
    const container = document.createElement('div');
    container.className = 'container';
    var detailColumn = document.createElement('div');
    detailColumn.className = 'column';
    detailColumn.id = 'detail';

    /**
     * Display the header in rough html
     * @returns {string}
     */
    const renderHeader = function() {
        return '<header><img src="./images/lmn-logo-white.svg"/></header>';
    };

    /**
     * A single button with its proper callback
     * @param button
     * @param callback
     * @returns {HTMLDivElement}
     */
    const renderMenuButton = function(button, callback) {
        var buttonEl = document.createElement('div');
        buttonEl.href = '';
        buttonEl.onclick = function() {
            callback(button.id)
        };
        buttonEl.className = 'button';
        buttonEl.id = 'button-' + button.id;
        buttonEl.innerHTML = button.name;
        return buttonEl;
    };

    /**
     * Renders the menu buttons and iterates over each single button.
     * @param hotelsList
     * @returns {HTMLDivElement}
     */
    const renderMenuBar = function(hotelsList) {

        const menuElement = document.createElement('div');
        menuElement.className = 'column';
        menuElement.id = 'menu';
        hotelsList.forEach(function(button) {
            menuElement.appendChild(renderMenuButton(button, fetchAndRenderDetails))
        });
        return menuElement;
    };

    /**
     * Renders the stars depending on its proper rating
     * @param rating
     * @returns {HTMLDivElement}
     */
    const renderDetailStars = function(rating) {

        const starContainer = document.createElement('div');
        starContainer.className = 'stars';
        for(var i = 0; i < 5; i++) {
            var singleStar = document.createElement('i');
            singleStar.className = 'fa fa-star fa-lg';
            console.log(rating);
            if (i > rating - 1) {
                singleStar.className = 'fa fa-star-o fa-lg';
            }
            starContainer.appendChild(singleStar);
        }
        return starContainer;
    };

    /**
     * Renders and attaches the details card everytime you click on one element.
     * @param detail
     */
    const renderDetails = function(detail) {

        detailColumn.innerHTML = '';
        const detailCardContainer = document.createElement('div');
        detailCardContainer.className = 'detail-card-container';
        detailColumn.appendChild(detailCardContainer);
        const detailCard = document.createElement('div');
        detailCard.className = 'detail-card';
        detailCardContainer.appendChild(detailCard);
        const hotelImage = document.createElement('img');
        hotelImage.className = 'detail-image';
        hotelImage.src = detail.imgUrl;
        detailCard.appendChild(hotelImage);
        const detailSummary = document.createElement('div');
        detailSummary.innerHTML = detail.name;
        detailSummary.className = 'detail-summary';
        detailSummary.appendChild(renderDetailStars(detail.rating));
        detailCard.appendChild(detailSummary);
        const detailPrice = document.createElement('div');
        detailPrice.className = 'detail-price';
        detailPrice.innerHTML = '&pound;' + detail.price + '.00';

        const detailPriceSubText = document.createElement('div');
        detailPriceSubText.className = 'detail-price-sub-text';
        detailPriceSubText.innerHTML = 'Total hotel stay';
        detailPrice.appendChild(detailPriceSubText);
        detailCard.appendChild(detailPrice);
        const clearFix = document.createElement('div');
        clearFix.className = 'clearfix';
        detailCard.appendChild(clearFix);
    };

    /**
     * Fetches and renders details using promises
     * @param id
     */
    const fetchAndRenderDetails = function(id) {
        const loader = document.createElement('img');
        loader.src = './images/loader.svg';
        loader.className = 'loader';
        detailColumn.innerHTML = loader.outerHTML;

        fetch(hotelsSettings.url + '/' + id, hotelsSettings.init)
            .then(function(response) {
                return response.json();
            }).then(renderDetails);
    };

    /**
     * Renders the entire app.
     * @param hotelsList
     */
    const renderApp = function(hotelsList) {
        appContainer.innerHTML = renderHeader();
        if (hotelsList && hotelsList[0] && hotelsList[0].id) {
            const menuBar = renderMenuBar(hotelsList);
            fetchAndRenderDetails(hotelsList[0].id);
            container.appendChild(menuBar);
            appContainer.appendChild(container);
            container.appendChild(detailColumn);
        }
    };


    /**
     * App initializer (what it would be a constructor if we were using pure ES6)
     * @type {string}
     */
    appContainer.innerHTML = renderHeader();
    fetch(hotelsSettings.url, hotelsSettings.init)
        .then(function(response) {
            return response.json();
        }).then(renderApp);
};
window.onload = function() {

    app();
};
