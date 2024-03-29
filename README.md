# Exchallenge
## Web Development Home Task
 
* Open the current Revolut app, on either iOS or Android, and navigate to the exchange screen.
* If the app is not available in your country you can observe how application works in [video](https://youtu.be/c0zPSiKYipc?t=29s)(exchange screen is on the 29th second of the video).
PS. It is not required to implement rates screen (1-05 from the video)
* Implement functionality of this screen in your own custom web widget using FX rates from either source:

  1. [Europeian Central Bank](http://www.ecb.int/stats/exchange/eurofxref/html/index.en.html#dev)
  2. [Open Exchange Rates](https://openexchangerates.org)
  3. Your preferred source of FX rates

### Explicit Requirements
Your app should:
* poll the endpoint every 10 seconds to get the latest rates for GBP, EUR and USD. The API provides close of day FX rates.
Although we expect you to refresh the rate every 10s, we do not expect the rate to change every 10s as most free rate sources won’t provide live rates.
* contain at least three pockets with USD, EUR, GBP currencies
* make it possible to make an exchange between pockets
* contain two inputs on the active exchange screen for both pockets. Each input should be validated to let to type only numbers with two digits after the dot
* give all the necessary information: exchange rate between active pockets and pocket balances.


### Implicit Requirements
* The widget must work and produce correct results.
* The code produced is expected to be of a high standard.
* You should implement as many features from the model exchange screen as possible.
* You implement widget with any design you want, but you should make it nice looking


#### Other expectations:
* Tech stack for application: React or Preact and Redux (or Alternatives) 
* The application should be bug-free. Test your app before write to us that it is ready :)
* Test your application with Jest
