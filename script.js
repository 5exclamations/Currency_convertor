let input = document.querySelector('input');
let uah1 = document.querySelector('.uah-one');
let uah2 = document.querySelector('.uah-two');
let usd1 = document.querySelector('.usd-one');
let usd2 = document.querySelector('.usd-two');
let azn1 = document.querySelector('.azn-one');
let azn2 = document.querySelector('.azn-two');
let gbp1 = document.querySelector('.gbp-one');
let gbp2 = document.querySelector('.gbp-two');
// fetch()
var requestURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
}
        