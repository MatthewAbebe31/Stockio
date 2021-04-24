var headerButton = document.querySelector('.header-button');

headerButton.addEventListener('click', handleHeaderClick);

function handleHeaderClick() {
  location.reload();
}

var stockSearchForm = document.querySelector('#symbol-form');
stockSearchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var symbol = event.target.querySelector('#stock-search-input').value;
  getOverviewData(symbol);
  getBalanceSheetData(symbol);
  getIncomeStatementData(symbol);
  getCashFlowData(symbol);
  getQuoteData(symbol);
  getDailyPrices(symbol);
}

var homeContainerEl = document.querySelector('.home-container');
var tabContainerEl = document.querySelector('.tab-container');
var chooseViewsContainerEl = document.querySelector('.choose-views-container');
var profileContainerEl = document.querySelector('.profile-container');
var chartContainerEl = document.querySelector('.chart-container');

var findButton = document.querySelector('.find-button');
findButton.addEventListener('click', handleFindClick);

function handleFindClick(event) {

  homeContainerEl.classList.remove('view');
  homeContainerEl.classList.add('hidden');
  tabContainerEl.classList.remove('hidden');
  tabContainerEl.classList.add('view');
  chooseViewsContainerEl.classList.remove('hidden');
  chooseViewsContainerEl.classList.add('view');
  profileContainerEl.classList.remove('hidden');
  profileContainerEl.classList.add('view');
  chartContainerEl.classList.remove('hidden');
  chartContainerEl.classList.add('view');
}

function getOverviewData(symbol) {
  var xhrOverview = new XMLHttpRequest();
  xhrOverview.open('GET', `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrOverview.responseType = 'json';
  xhrOverview.addEventListener('load', function () {

    var profileDataEl = document.querySelector('.profile-data');

    var symbolEl = document.createElement('li');
    var symbolLabel = document.createElement('strong');
    var symbolData = document.createElement('span');
    profileDataEl.appendChild(symbolEl);
    symbolEl.appendChild(symbolLabel);
    symbolEl.appendChild(symbolData);
    symbolLabel.textContent = 'Symbol: ';
    symbolData.textContent = xhrOverview.response.Symbol;

    var stockNameEl = document.createElement('li');
    var stockNameLabel = document.createElement('strong');
    var stockNameData = document.createElement('span');
    profileDataEl.appendChild(stockNameEl);
    stockNameEl.appendChild(stockNameLabel);
    stockNameEl.appendChild(stockNameData);
    stockNameLabel.textContent = 'Name: ';
    stockNameData.textContent = xhrOverview.response.Name;

    var exchangeNameEl = document.createElement('li');
    var exchangeNameLabel = document.createElement('strong');
    var exchangeNameData = document.createElement('span');
    profileDataEl.appendChild(exchangeNameEl);
    exchangeNameEl.appendChild(exchangeNameLabel);
    exchangeNameEl.appendChild(exchangeNameData);
    exchangeNameLabel.textContent = 'Exchange: ';
    exchangeNameData.textContent = xhrOverview.response.Exchange;

    var sectorNameEl = document.createElement('li');
    var sectorNameLabel = document.createElement('strong');
    var sectorNameData = document.createElement('span');
    profileDataEl.appendChild(sectorNameEl);
    sectorNameEl.appendChild(sectorNameLabel);
    sectorNameEl.appendChild(sectorNameData);
    sectorNameLabel.textContent = 'Sector: ';
    sectorNameData.textContent = xhrOverview.response.Sector;

    var profitabilityDataEl = document.querySelector('.profitability-data');

    var profitMargin = xhrOverview.response.ProfitMargin;
    var prftMargin = parseFloat(profitMargin).toFixed(2);

    var profitMarginEl = document.createElement('li');
    var profitMarginLabel = document.createElement('strong');
    var profitMarginData = document.createElement('span');
    profitabilityDataEl.appendChild(profitMarginEl);
    profitMarginEl.appendChild(profitMarginLabel);
    profitMarginEl.appendChild(profitMarginData);
    profitMarginLabel.textContent = 'Profit Margin: ';
    profitMarginData.textContent = prftMargin;

    var returnOnAssetsTTM = xhrOverview.response.ReturnOnAssetsTTM;
    var roaTTM = parseFloat(returnOnAssetsTTM).toFixed(2);

    var returnOnAssetsEl = document.createElement('li');
    var returnOnAssetsLabel = document.createElement('strong');
    var returnOnAssetsData = document.createElement('span');
    profitabilityDataEl.appendChild(returnOnAssetsEl);
    returnOnAssetsEl.appendChild(returnOnAssetsLabel);
    returnOnAssetsEl.appendChild(returnOnAssetsData);
    returnOnAssetsLabel.textContent = 'Return On Assets (TTM): ';
    returnOnAssetsData.textContent = roaTTM;

    var returnOnEquityTTM = xhrOverview.response.ReturnOnEquityTTM;
    var roeTTM = parseFloat(returnOnEquityTTM).toFixed(2);

    var returnOnEquityEl = document.createElement('li');
    var returnOnEquityLabel = document.createElement('strong');
    var returnOnEquityData = document.createElement('span');
    profitabilityDataEl.appendChild(returnOnEquityEl);
    returnOnEquityEl.appendChild(returnOnEquityLabel);
    returnOnEquityEl.appendChild(returnOnEquityData);
    returnOnEquityLabel.textContent = 'Return on Equity (TTM): ';
    returnOnEquityData.textContent = roeTTM;

    var operatingMarginTTM = xhrOverview.response.OperatingMarginTTM;
    var omTTM = parseFloat(operatingMarginTTM).toFixed(2);

    var operatingMarginEl = document.createElement('li');
    var operatingMarginLabel = document.createElement('strong');
    var operatingMarginData = document.createElement('span');
    profitabilityDataEl.appendChild(operatingMarginEl);
    operatingMarginEl.appendChild(operatingMarginLabel);
    operatingMarginEl.appendChild(operatingMarginData);
    operatingMarginLabel.textContent = 'Operating Margin (TTM): ';
    operatingMarginData.textContent = omTTM;

    var valuationDataEl = document.querySelector('.valuation-data');

    var priceEarningsRatio = xhrOverview.response.PERatio;
    var peRatio = parseFloat(priceEarningsRatio).toFixed(2);

    var peRatioEl = document.createElement('li');
    var peRatioLabel = document.createElement('strong');
    var peRatioData = document.createElement('span');
    valuationDataEl.appendChild(peRatioEl);
    peRatioEl.appendChild(peRatioLabel);
    peRatioEl.appendChild(peRatioData);
    peRatioLabel.textContent = 'P/E Ratio: ';
    peRatioData.textContent = peRatio;

    var priceEarningsToGrowthRatio = xhrOverview.response.PEGRatio;
    var pegRatio = parseFloat(priceEarningsToGrowthRatio).toFixed(2);

    var pegRatioEl = document.createElement('li');
    var pegRatioLabel = document.createElement('strong');
    var pegRatioData = document.createElement('span');
    valuationDataEl.appendChild(pegRatioEl);
    pegRatioEl.appendChild(pegRatioLabel);
    pegRatioEl.appendChild(pegRatioData);
    pegRatioLabel.textContent = 'PEG Ratio: ';
    pegRatioData.textContent = pegRatio;

    var priceToBookRatio = xhrOverview.response.PriceToBookRatio;
    var pbRatio = parseFloat(priceToBookRatio).toFixed(2);

    var pbRatioEl = document.createElement('li');
    var pbRatioLabel = document.createElement('strong');
    var pbRatioData = document.createElement('span');
    valuationDataEl.appendChild(pbRatioEl);
    pbRatioEl.appendChild(pbRatioLabel);
    pbRatioEl.appendChild(pbRatioData);
    pbRatioLabel.textContent = 'P/B Ratio: ';
    pbRatioData.textContent = pbRatio;

    var priceToSalesRatio = xhrOverview.response.PriceToSalesRatioTTM;
    var psRatio = parseFloat(priceToSalesRatio).toFixed(2);

    var psRatioEl = document.createElement('li');
    var psRatioLabel = document.createElement('strong');
    var psRatioData = document.createElement('span');
    valuationDataEl.appendChild(psRatioEl);
    psRatioEl.appendChild(psRatioLabel);
    psRatioEl.appendChild(psRatioData);
    psRatioLabel.textContent = 'P/S Ratio: ';
    psRatioData.textContent = psRatio;
  });
  xhrOverview.send();
}

function getQuoteData(symbol) {
  var xhrQuote = new XMLHttpRequest();
  xhrQuote.open('GET', `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrQuote.responseType = 'json';
  xhrQuote.addEventListener('load', function () {

    var profileDataEl = document.querySelector('.profile-data');
    var quoteData = xhrQuote.response['Global Quote']['05. price'];
    var quote = parseFloat(quoteData).toFixed(2);

    var quoteEl = document.createElement('li');
    var quoteLabel = document.createElement('strong');
    var quoteDataEl = document.createElement('span');
    profileDataEl.appendChild(quoteEl);
    quoteEl.appendChild(quoteLabel);
    quoteEl.appendChild(quoteDataEl);
    quoteLabel.textContent = 'Quote: ';
    quoteDataEl.textContent = quote;
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

    var chart = document.getElementById('priceChart');

    var dailyPriceChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Close Price by Day' + ' ' + `${symbol}`,
          data: closePrices,
          backgroundColor: 'rgba(44, 130, 201, 1)',
          borderColor: 'rgba(44, 130, 201, 1)',
          borderWidth: 1
        }]
      }
    });
    dailyPriceChart.className = 'dailyPriceChart';
  });
  xhrDailyPrices.send();
}

function getBalanceSheetData(symbol) {
  var xhrBalanceSheet = new XMLHttpRequest();
  xhrBalanceSheet.open('GET', `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrBalanceSheet.responseType = 'json';
  xhrBalanceSheet.addEventListener('load', function () {

    var liquidityDataEl = document.querySelector('.liquidity-data');

    var totalCurrentAssests = xhrBalanceSheet.response.annualReports[0].totalCurrentAssets;
    var totalCurrentLiabilities = xhrBalanceSheet.response.annualReports[0].totalCurrentLiabilities;
    var currentRatioFormula = totalCurrentAssests / totalCurrentLiabilities;
    var currentRatio = currentRatioFormula.toFixed(2);

    var currentRatioEl = document.createElement('li');
    var currentRatioLabel = document.createElement('strong');
    var currentRatioData = document.createElement('span');
    liquidityDataEl.appendChild(currentRatioEl);
    currentRatioEl.appendChild(currentRatioLabel);
    currentRatioEl.appendChild(currentRatioData);
    currentRatioLabel.textContent = 'Current Ratio: ';
    currentRatioData.textContent = currentRatio;

    var inventory = xhrBalanceSheet.response.annualReports[0].inventory;
    var quickRatioFormula = (totalCurrentAssests - inventory) / totalCurrentLiabilities;
    var quickRatio = parseFloat(quickRatioFormula).toFixed(2);

    var quickRatioEl = document.createElement('li');
    var quickRatioLabel = document.createElement('strong');
    var quickRatioData = document.createElement('span');
    liquidityDataEl.appendChild(quickRatioEl);
    quickRatioEl.appendChild(quickRatioLabel);
    quickRatioEl.appendChild(quickRatioData);
    quickRatioLabel.textContent = 'Quick Ratio: ';
    quickRatioData.textContent = quickRatio;

    var cashAndCashEquivalents = xhrBalanceSheet.response.annualReports[0].cashAndCashEquivalentsAtCarryingValue;
    var cashRatioFormula = cashAndCashEquivalents / totalCurrentLiabilities;
    var cashRatio = cashRatioFormula.toFixed(2);

    var cashRatioEl = document.createElement('li');
    var cashRatioLabel = document.createElement('strong');
    var cashRatioData = document.createElement('span');
    liquidityDataEl.appendChild(cashRatioEl);
    cashRatioEl.appendChild(cashRatioLabel);
    cashRatioEl.appendChild(cashRatioData);
    cashRatioLabel.textContent = 'Cash Ratio: ';
    cashRatioData.textContent = cashRatio;

    var solvencyDataEl = document.querySelector('.solvency-data');

    var totalAssets = xhrBalanceSheet.response.annualReports[0].totalAssets;
    var totalLiabilities = xhrBalanceSheet.response.annualReports[0].totalLiabilities;
    var totalShareholderEquity = xhrBalanceSheet.response.annualReports[0].totalShareholderEquity;

    var DebtToAssests = totalLiabilities / totalAssets;
    var doaRatio = parseFloat(DebtToAssests).toFixed(2);

    var debtToAssetsEl = document.createElement('li');
    var debtToAssetsLabel = document.createElement('strong');
    var debtToAssetsData = document.createElement('span');
    solvencyDataEl.appendChild(debtToAssetsEl);
    debtToAssetsEl.appendChild(debtToAssetsLabel);
    debtToAssetsEl.appendChild(debtToAssetsData);
    debtToAssetsLabel.textContent = 'Debt to Assets: ';
    debtToAssetsData.textContent = doaRatio;

    var debtToEquityRatio = totalLiabilities / totalShareholderEquity;
    var doeRatio = debtToEquityRatio.toFixed(2);

    var debtToEquityRatioEl = document.createElement('li');
    var debtToEquityRatioLabel = document.createElement('strong');
    var debtToEquityRatioData = document.createElement('span');
    solvencyDataEl.appendChild(debtToEquityRatioEl);
    debtToEquityRatioEl.appendChild(debtToEquityRatioLabel);
    debtToEquityRatioEl.appendChild(debtToEquityRatioData);
    debtToEquityRatioLabel.textContent = 'Debt to Equity: ';
    debtToEquityRatioData.textContent = doeRatio;

    var operatingCashFlowRatio = operatingCashFlow / totalCurrentLiabilities;
    var operatingCfRatio = parseFloat(operatingCashFlowRatio).toFixed(2);

    var operatingCashFlowEl = document.createElement('li');
    var operatingCashFlowLabel = document.createElement('strong');
    var operatingCashFlowData = document.createElement('span');
    liquidityDataEl.appendChild(operatingCashFlowEl);
    operatingCashFlowEl.appendChild(operatingCashFlowLabel);
    operatingCashFlowEl.appendChild(operatingCashFlowData);
    operatingCashFlowLabel.textContent = 'Operating Cashflow Ratio: ';
    operatingCashFlowData.textContent = operatingCfRatio;

    var totalShareholderEquityRatio = totalShareholderEquity / totalAssets;
    var totalSERatio = parseFloat(totalShareholderEquityRatio).toFixed(2);

    var totalSERatioEl = document.createElement('li');
    var totalSERatioLabel = document.createElement('strong');
    var totalSERatioData = document.createElement('span');
    solvencyDataEl.appendChild(totalSERatioEl);
    totalSERatioEl.appendChild(totalSERatioLabel);
    totalSERatioEl.appendChild(totalSERatioData);
    totalSERatioLabel.textContent = 'Total Shareholder Equity Ratio: ';
    totalSERatioData.textContent = totalSERatio;
  });
  xhrBalanceSheet.send();
}

function getIncomeStatementData(symbol) {
  var xhrIncomeStatement = new XMLHttpRequest();
  xhrIncomeStatement.open('GET', `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrIncomeStatement.responseType = 'json';
  xhrIncomeStatement.addEventListener('load', function () {

    var solvencyDataEl = document.querySelector('.solvency-data');

    var ebitda = xhrIncomeStatement.response.annualReports[0].ebitda;
    var interestExpense = xhrIncomeStatement.response.annualReports[0].interestExpense;
    var interestCoverageRatioFormula = ebitda / interestExpense;
    var interestCoverageRatio = parseFloat(interestCoverageRatioFormula).toFixed(2);

    var interestCoverageRatioEl = document.createElement('li');
    var interestCoverageRatioLabel = document.createElement('strong');
    var interestCoverageRatioData = document.createElement('span');
    solvencyDataEl.appendChild(interestCoverageRatioEl);
    interestCoverageRatioEl.appendChild(interestCoverageRatioLabel);
    interestCoverageRatioEl.appendChild(interestCoverageRatioData);
    interestCoverageRatioLabel.textContent = 'Interest Coverage Ratio: ';
    interestCoverageRatioData.textContent = interestCoverageRatio;
  });
  xhrIncomeStatement.send();
}

var operatingCashFlow;

function getCashFlowData(symbol) {
  var xhrCashFlow = new XMLHttpRequest();
  xhrCashFlow.open('GET', `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=EBZ2O8GQQ9CA3ECX`);
  xhrCashFlow.responseType = 'json';
  xhrCashFlow.addEventListener('load', function () {

    operatingCashFlow = xhrCashFlow.response.annualReports[0].operatingCashflow;
    return operatingCashFlow;
  });
  xhrCashFlow.send();
}

var tabContainer = document.querySelector('.tab-container');
var selectStockDataView = document.querySelector('select');
var viewElements = document.querySelectorAll('.view');

function changeViews(viewName) {

  for (var k = 0; k < viewElements.length; k++) {
    if (viewElements[k].getAttribute('data-view') === viewName) {
      viewElements[k].className = 'view';
    } else if (viewName === 'home') {
      location.reload();
      return false;
    } else {
      viewElements[k].className = 'view hidden';
    }
  }
}

function handleTabClick(event) {

  var dataViewTab = event.target.getAttribute('data-view');
  changeViews(dataViewTab);
}

tabContainer.addEventListener('click', handleTabClick);

function handleSelectChange(event) {
  console.log(event.target.selectedOptions);

  var dataViewOption = event.target.selectedOptions[0].getAttribute('data-view');
  changeViews(dataViewOption);

}

selectStockDataView.addEventListener('change', handleSelectChange);

function loopOverOptions() {

  for (var i = 0; i < selectStockDataView.length; i++) {
    selectStockDataView[i].addEventListener('click', changeViews);
  }
}

loopOverOptions();
