var headerButton = document.querySelector('.header-button');

headerButton.addEventListener('click', handleHeaderClick);

function handleHeaderClick() {
  location.reload();
}

var stockSearchForm = document.querySelector('#symbol-form');
stockSearchForm.addEventListener('submit', handleSubmit); // sumbit

function handleSubmit(event) {
  event.preventDefault();
  var symbol = event.target.querySelector('#stock-search-input').value;
  // console.log(symbol);
  // call some function
  getOverviewData(symbol);
  getDailyPrices(symbol);
  getQuoteData(symbol);
}

var homeContainerEl = document.querySelector('.home-container');
var tabContainerEl = document.querySelector('.tab-container');
var profileContainerEl = document.querySelector('.profile-container');
var chartContainerEl = document.querySelector('.chart-container');

var findButton = document.querySelector('.find-button');
findButton.addEventListener('click', handleFindClick);

function handleFindClick(event) {

  homeContainerEl.classList.remove('view');
  homeContainerEl.classList.add('hidden');
  tabContainerEl.classList.remove('hidden');
  tabContainerEl.classList.add('view');
  profileContainerEl.classList.remove('hidden');
  profileContainerEl.classList.add('view');
  chartContainerEl.classList.remove('hidden');
  chartContainerEl.classList.add('view');
}

var symbolStr = 'Symbol: ';
var symbolString = symbolStr.bold();
var nameStr = 'Name: ';
var nameString = nameStr.bold();
var quoteStr = 'Quote: ';
var quoteString = quoteStr.bold();
var exchangeStr = 'Exchange: ';
var exchangeString = exchangeStr.bold();
var sectorStr = 'Sector: ';
var sectorString = sectorStr.bold();

function getOverviewData(symbol) {
  var xhrOverview = new XMLHttpRequest();
  xhrOverview.open('GET', `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrOverview.responseType = 'json';
  xhrOverview.addEventListener('load', function () {
    var profileDataEl = document.querySelector('.profile-data');
    var symbolEl = document.createElement('li');
    symbolEl.className = 'symbol';
    symbolEl.innerHTML = symbolString + xhrOverview.response.Symbol;
    profileDataEl.appendChild(symbolEl);

    var stockNameEl = document.createElement('li');
    stockNameEl.className = 'stock-name';
    stockNameEl.innerHTML = nameString + xhrOverview.response.Name;
    profileDataEl.appendChild(stockNameEl);

    var exchangeNameEl = document.createElement('li');
    exchangeNameEl.className = 'exchange-name';
    exchangeNameEl.innerHTML = exchangeString + xhrOverview.response.Exchange;
    profileDataEl.appendChild(exchangeNameEl);

    var sectorNameEl = document.createElement('li');
    sectorNameEl.className = 'sector-name';
    sectorNameEl.innerHTML = sectorString + xhrOverview.response.Sector;
    profileDataEl.appendChild(sectorNameEl);

    // var address = xhrOverview.response.Address;
  });
  xhrOverview.send();
}

function getQuoteData(symbol) {
  var xhrQuote = new XMLHttpRequest();
  xhrQuote.open('GET', `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrQuote.responseType = 'json';
  xhrQuote.addEventListener('load', function () {

    var profileDataEl = document.querySelector('.profile-data');
    var quoteEl = document.createElement('li');
    quoteEl.className = 'quote';
    quoteEl.innerHTML = quoteString + xhrQuote.response['Global Quote']['05. price'];
    profileDataEl.appendChild(quoteEl);

  });
  xhrQuote.send();
}

function getDailyPrices(symbol) {
  var xhrDailyPrices = new XMLHttpRequest();
  xhrDailyPrices.open('GET', `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrDailyPrices.responseType = 'json';
  xhrDailyPrices.addEventListener('load', function () {
    var dailyPrices = xhrDailyPrices.response['Time Series (Daily)'];
    var dailyPriceData = [];
    dailyPriceData.push(dailyPrices);

    var closePrices = [];
    var chartLabels = [];
    var stockData = dailyPriceData[0];
    for (var key in stockData) {
      closePrices.push(stockData[key]['4. close']);
      chartLabels.push(key);
    }

    var chart = document.getElementById('dailyPriceChart');

    var dailyPriceChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Close Price by Day' + ' ' + `${symbol}`,
          data: closePrices,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      }
    });
  });
  xhrDailyPrices.send();
}

var $tabContainer = document.querySelector('.tab-container');
var $tabElements = document.querySelectorAll('.tab');
var $viewElements = document.querySelectorAll('.view');

$tabContainer.addEventListener('click', function () {
  if (!event.target.matches('.tab')) {
    return;
  }

  for (var i = 0; i < $tabElements.length; i++) {
    if ($tabElements[i] === event.target) {
      $tabElements[i].className = 'tab active';
    } else {
      $tabElements[i].className = 'tab';
    }
  }

  var dataView = event.target.getAttribute('data-view');

  for (var k = 0; k < $viewElements.length; k++) {
    if ($viewElements[k].getAttribute('data-view') === dataView) {
      $viewElements[k].className = 'view';
    } else if (dataView === 'home') {
      location.reload();
      return false;
    } else {
      $viewElements[k].className = 'view hidden';
    }
  }
});
