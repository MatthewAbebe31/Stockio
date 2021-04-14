var xhrProfitability = new XMLHttpRequest();

xhrProfitability.open('GET', 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrProfitability.send();

xhrProfitability.responseType = 'json';

xhrProfitability.addEventListener('load', handleLoadProfitability);

function handleLoadProfitability(event) {
  // Variables for Profitability Measures

  // Return on Assests (ROA) TTM
  var returnOnAssetsTTM = xhrProfitability.response.ReturnOnAssetsTTM;

  console.log('Return-on-Assets-TTM: ', returnOnAssetsTTM);

  // Return on Equity (ROE) TTM
  var returnOnEquityTTM = xhrProfitability.response.ReturnOnEquityTTM;

  console.log('Return-on-Equity-TTM: ', returnOnEquityTTM);

  // Operating Margin TTM
  var operatingMarginTTM = xhrProfitability.response.OperatingMarginTTM;

  console.log('Operating Margin: ', operatingMarginTTM);

  // Profit Margin
  var profitMargin = xhrProfitability.response.ProfitMargin;
  console.log('Profit Margin: ', profitMargin);
}

var xhrLiquidity = new XMLHttpRequest();

// Request from BALANCE SHEETS
xhrLiquidity.open('GET', 'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrLiquidity.send();

xhrLiquidity.responseType = 'json';

xhrLiquidity.addEventListener('load', handleLoadLiquidity);

function handleLoadLiquidity(event) {
  console.log('xhrLiquidity status: ', xhrLiquidity.status)
  console.log('xhrLiquidity response: ', xhrLiquidity.response)
  // Variables for Liquidity Measures

  // Current Ratio
  var totalCurrentAssests = xhrLiquidity.response.annualReports[0].totalCurrentAssets;
  var totalCurrentLiabilities = xhrLiquidity.response.annualReports[0].totalCurrentLiabilities;
  var currentRatio = totalCurrentAssests / totalCurrentLiabilities;

  console.log('Current Ratio: ', currentRatio);

  // Quick Ratio
  var inventory = xhrLiquidity.response.annualReports[0].inventory;
  var quickRatio = (totalCurrentAssests - inventory) / totalCurrentLiabilities;

  console.log('Quick ratio: ', quickRatio);

  // Cash Ratio
  var cashAndCashEquivalents = xhrLiquidity.response.annualReports[0].cashAndCashEquivalentsAtCarryingValue
  var cashRatio = cashAndCashEquivalents / totalCurrentLiabilities

  console.log('Cash Ratio: ', cashRatio)

  //
}


var xhrSolvency = new XMLHttpRequest();

// Request from BALANCE SHEETS
xhrSolvency.open('GET', 'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrSolvency.send();

xhrSolvency.responseType = 'json';

xhrSolvency.addEventListener('load', handleLoadSolvency);

function handleLoadSolvency(event) {

  // Variables for Solvency Measures

  // Equity ratio
  var totalAssets = xhrSolvency.response.annualReports[0].totalAssets;

  // Debt-to-Equity-Ratio
  var totalLiabilities = xhrSolvency.response.annualReports[0].totalLiabilities;
  var totalShareholderEquity = xhrSolvency.response.annualReports[0].totalShareholderEquity;
  var debtToEquityRatio = totalLiabilities / totalShareholderEquity;

  console.log('Debt-to-Equity-Ratio: ', debtToEquityRatio);

  // Debt-to-Assets-Ratio
  var DebtToAssests = totalLiabilities / totalAssets;

  console.log('Total-Debt-to-Total-Assets: ', DebtToAssests);
}

var xhrSolvencyTwo = new XMLHttpRequest();

// Request from BALANCE SHEETS
xhrSolvencyTwo.open('GET', 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrSolvencyTwo.send();

xhrSolvencyTwo.responseType = 'json';

xhrSolvencyTwo.addEventListener('load', handleLoadSolvencyTwo);

function handleLoadSolvencyTwo(event) {

  // Variables for Solvency Measures

  // Interest Coverage Ratio
  var ebit = xhrSolvencyTwo.response.annualReports[0].ebit;
  var interestExpense = xhrSolvencyTwo.response.annualReports[0].interestExpense
  var interestCoverageRatio = ebit / interestExpense

  console.log('Interest Coverage Ratio: ', interestCoverageRatio)


}

var xhrValuation = new XMLHttpRequest();

xhrValuation.open('GET', 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrValuation.send();

xhrValuation.responseType = 'json';

xhrValuation.addEventListener('load', handleLoadValuation);

function handleLoadValuation(event) {
  // Variables for valuation

  // P/E Ratio
  var peRatio = xhrValuation.response.PERatio;

  console.log('PE Ratio: ', peRatio)

  // PEG Ratio
  var pegRatio = xhrValuation.response.PEGRatio

  console.log('PEG Ratio: ', pegRatio)

  // P/B Ratio
  var pbRatio = xhrValuation.response.PriceToBookRatio;

  console.log('P/B Ratio: ', pbRatio)

  // PS Ratio
  var psRatio = xhrValuation.response.PriceToSalesRatioTTM;

  console.log('P/S Ratio: ', psRatio)

}

var xhrProfile = new XMLHttpRequest();

xhrProfile.open('GET', 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrProfile.send();

xhrProfile.responseType = 'json';

xhrProfile.addEventListener('load', handleLoadProfile);

function handleLoadProfile(event) {

  // Variables for profile data

  var symbol = xhrProfile.response.Symbol
  console.log(symbol)

  var stockName = xhrProfile.response.Name;
  console.log(stockName)

  var exchange = xhrProfile.response.Exchange;
  console.log(exchange)

  var sector = xhrProfile.response.Sector;
  console.log(sector)

  var address = xhrProfile.response.Address;
  console.log(address)

}

var xhrQuote = new XMLHttpRequest();

xhrQuote.open('GET', 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=HKX3MUJHRZLOUZ85');
xhrQuote.send();

xhrQuote.responseType = 'json';

xhrQuote.addEventListener('load', handleLoadQuote);

function handleLoadQuote(event) {

  // Variables for quote data

  var quote = xhrQuote.response['Global Quote']['05. price']
  console.log('Quote: ', quote)

}

var xhrSearch = new XMLHttpRequest();

xhrSearch.open('GET', 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=HKX3MUJHRZLOUZ85');
xhrSearch.send();

xhrSearch.responseType = 'json';

xhrSearch.addEventListener('load', handleLoadSearch);

function handleLoadSearch(event) {

  // Variables for profile data

  // var search = xhrProfile.response['Global Quoate']['05. price']
  // console.log('Search: ', quote)

  var bestMatches = xhrSearch.response.bestMatches
  console.log(bestMatches)
}

var xhrDailyPrices = new XMLHttpRequest();

xhrDailyPrices.open('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo');
xhrDailyPrices.send();

xhrDailyPrices.responseType = 'json';

xhrDailyPrices.addEventListener('load', handleLoadDailyPrices);

function handleLoadDailyPrices(event) {

  // Variables for daily price data

  // var search = xhrProfile.response['Global Quoate']['05. price']
  // console.log('Search: ', quote)

  var dailyPrices = xhrDailyPrices.response
  console.log(dailyPrices)
}
