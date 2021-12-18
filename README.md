# Stock Price Trend Prediction and Relations Between Stocks
EECS E6893 Final Project
Group 17
**Objectives:**
  It is known that prices of different stocks are correlated; stock prices sometimes move together. Therefore, it is natural to wonder whether stock prices can be predicted using the prices of other stocks. In our project, we aimed to determine the relations between stocks and to predict stock price trends based on the price changes of related stocks. This information can help investors make decisions.

**Innovations:**
1. We use groups of stocks that behave similarly as features, instead of just using the historical data of the target stock only.
2. Since some stock trends are easier to predict, understanding the relation between stocks help us to locate more latent opportunities when we see changes in obvious ones. (Identifying all potential growing stocks by focusing on the most obvious one in the group)
3. To our knowledge, VAR models have never been applied the way that we applied them.
  a. We use ANNOY to find groups of related stocks and then fit a VAR model on each group.
  b. Previous VAR works only considered a small number of stocks → We include 2349 stocks.
  c. Previous VAR works did not continuously update their data and models → We update stock price data daily and always fit our VAR models on the most recent stock price data.

**Capabilities:**
1. Given a stock that a user is interested in, our app can tell users:
  Which 10 stocks are the most related, and how similar they are.
2. Predicted percentage change in price in the next 5 days
  a. If the user selects “impulse” (they observed a change in the target stock’s price), then we predict how the prices of the 10 related stocks will change.
  b. If the user selects “response” (they observed changes in prices of stocks related to the target stock), then we predict how the price of the target stock will change.
  c. A recommendation on whether to buy or sell.
These capabilities are important for investors who want information about what stocks they should invest in, given information about how stock prices are currently changing.

**Dataset: **
Our dataset consists of two parts:
1. The initial data set is from https://www.kaggle.com/paultimothymooney/stock-market-data, The 10 GB dataset contains all historical price information of over 2800 companies in the form of csv and json.

2. Yahoo Finance + Airflow
The stock prices are updated by the Airflow scheduler, which runs Yahoo Finance in Python to get the most recent close price of all companies. The data are saved and sent to the backend of our Django system.

Our software can also support data that come purely from Yahoo Finance.


**Language:**
Python, Django, Airflow, HTML, Javascript, Google Cloud Storage.

**Instruction:**
  1. Download the AnnoyVAR folder.
  2. cd to the folder in the terminal of your local machine.
  3. Run the command: "python manage.py runserver"
  4. Use our app at http://127.0.0.1:8000/

