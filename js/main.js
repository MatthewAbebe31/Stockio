// handleInput and handleClick functions for homepage. Takes User to Profile page view. //

var stockSearchInput = document.getElementById('stock-search-input');
stockSearchInput.addEventListener('input', handleInput);
var keyword;
var symbol;

function handleInput(event) {
  symbol = event.target.value;
  console.log(symbol)
}

var homeContainerEl = document.querySelector('.home-container')
var tabContainerEl = document.querySelector('.tab-container')
var profileContainerEl = document.querySelector('.profile-container')

var findButton = document.querySelector('.find-button');
findButton.addEventListener('click', handleFindClick)

function handleFindClick(event) {
  console.log('you clicked submit!')

  homeContainerEl.classList.remove('view')
  homeContainerEl.classList.add('hidden')
  tabContainerEl.classList.remove('hidden')
  tabContainerEl.classList.add('view')
  profileContainerEl.classList.remove('hidden')
  profileContainerEl.classList.add('view')
}

var xhrOverview = new XMLHttpRequest();

xhrOverview.open('GET', `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=HKX3MUJHRZLOUZ85`);
xhrOverview.send();

xhrOverview.responseType = 'json';

xhrOverview.addEventListener('load', handleLoadOverview);

function handleLoadOverview(event) {

  var profileDataEl = document.querySelector('.profile-data')

  var symbolEl = document.createElement('li');
  symbolEl.className = 'symbol';
  symbolEl.innerHTML = 'Symbol: ' + xhrOverview.response.Symbol
  profileDataEl.appendChild(symbolEl)

  var stockNameEl = document.createElement('li');
  stockNameEl.className = 'stock-name';
  stockNameEl.innerHTML = 'Name: ' + xhrOverview.response.Name
  profileDataEl.appendChild(stockNameEl)

  var exchangeNameEl = document.createElement('li')
  exchangeNameEl.className = 'exchange-name'
  exchangeNameEl.innerHTML = 'Exchange: ' + xhrOverview.response.Exchange
  profileDataEl.appendChild(exchangeNameEl)

  var sectorNameEl = document.createElement('li');
  sectorNameEl.className = 'sector-name'
  sectorNameEl.innerHTML = 'Sector: ' + xhrOverview.response.Sector
  profileDataEl.appendChild(sectorNameEl)

  var address = xhrOverview.response.Address;
  console.log(address)

  var returnOnAssetsTTM = xhrOverview.response.ReturnOnAssetsTTM;

  console.log('Return-on-Assets-TTM: ', returnOnAssetsTTM);

  var returnOnEquityTTM = xhrOverview.response.ReturnOnEquityTTM;

  console.log('Return-on-Equity-TTM: ', returnOnEquityTTM);

  var operatingMarginTTM = xhrOverview.response.OperatingMarginTTM;

  console.log('Operating Margin: ', operatingMarginTTM);

  var profitMargin = xhrOverview.response.ProfitMargin;
  console.log('Profit Margin: ', profitMargin);

  var peRatio = xhrOverview.response.PERatio;

  console.log('PE Ratio: ', peRatio)

  var pegRatio = xhrOverview.response.PEGRatio

  console.log('PEG Ratio: ', pegRatio)

  var pbRatio = xhrOverview.response.PriceToBookRatio;

  console.log('P/B Ratio: ', pbRatio)

  var psRatio = xhrOverview.response.PriceToSalesRatioTTM;

  console.log('P/S Ratio: ', psRatio)
}

var xhrBalanceSheet = new XMLHttpRequest();

xhrBalanceSheet.open('GET', 'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrBalanceSheet.send();

xhrBalanceSheet.responseType = 'json';

xhrBalanceSheet.addEventListener('load', handleLoadBalanceSheet);

function handleLoadBalanceSheet(event) {
  console.log('xhrBalanceSheet status: ', xhrBalanceSheet.status)
  console.log('xhrBalanceSheet response: ', xhrBalanceSheet.response)

  var totalCurrentAssests = xhrBalanceSheet.response.annualReports[0].totalCurrentAssets;
  var totalCurrentLiabilities = xhrBalanceSheet.response.annualReports[0].totalCurrentLiabilities;
  var currentRatio = totalCurrentAssests / totalCurrentLiabilities;

  console.log('Current Ratio: ', currentRatio);

  var inventory = xhrBalanceSheet.response.annualReports[0].inventory;
  var quickRatio = (totalCurrentAssests - inventory) / totalCurrentLiabilities;

  console.log('Quick ratio: ', quickRatio);

  var cashAndCashEquivalents = xhrBalanceSheet.response.annualReports[0].cashAndCashEquivalentsAtCarryingValue
  var cashRatio = cashAndCashEquivalents / totalCurrentLiabilities

  console.log('Cash Ratio: ', cashRatio)

  var totalAssets = xhrBalanceSheet.response.annualReports[0].totalAssets;

  var totalLiabilities = xhrBalanceSheet.response.annualReports[0].totalLiabilities;
  var totalShareholderEquity = xhrBalanceSheet.response.annualReports[0].totalShareholderEquity;
  var debtToEquityRatio = totalLiabilities / totalShareholderEquity;

  console.log('Debt-to-Equity-Ratio: ', debtToEquityRatio);

  var DebtToAssests = totalLiabilities / totalAssets;

  console.log('Total-Debt-to-Total-Assets: ', DebtToAssests);
}

var xhrIncomeStatement = new XMLHttpRequest();

xhrIncomeStatement.open('GET', 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrIncomeStatement.send();

xhrIncomeStatement.responseType = 'json';

xhrIncomeStatement.addEventListener('load', handleLoadIncomeStatement);

function handleLoadIncomeStatement(event) {

  var ebit = xhrIncomeStatement.response.annualReports[0].ebit;
  var interestExpense = xhrIncomeStatement.response.annualReports[0].interestExpense
  var interestCoverageRatio = ebit / interestExpense

  console.log('Interest Coverage Ratio: ', interestCoverageRatio)

}

var xhrQuote = new XMLHttpRequest();

xhrQuote.open('GET', 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrQuote.send();

xhrQuote.responseType = 'json';

xhrQuote.addEventListener('load', handleLoadQuote);

function handleLoadQuote(event) {


  var quote = xhrQuote.response['Global Quote']['05. price']
  console.log('Quote: ', quote)

}

var xhrSearch = new XMLHttpRequest();

xhrSearch.open('GET', 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=HKX3MUJHRZLOUZ85');
xhrSearch.send();

xhrSearch.responseType = 'json';

xhrSearch.addEventListener('load', handleLoadSearch);

function handleLoadSearch(event) {
  console.log(xhrSearch.response)
}

var xhrDailyPrices = new XMLHttpRequest();

xhrDailyPrices.open('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo');
xhrDailyPrices.send();

xhrDailyPrices.responseType = 'json';

xhrDailyPrices.addEventListener('load', handleLoadDailyPrices);

function handleLoadDailyPrices(event) {

  var dailyPrices = xhrDailyPrices.response
  console.log(dailyPrices)
}

////////////////////////////////////////////////////////////////////////////////

// Handle switching views with tabs

var tabEl = document.querySelector('.tab-container')
var tabElements = document.querySelectorAll('.tabs')
