let input1 = document.querySelector('.firstInput');
let input2 = document.querySelector('.secondInput');
let left = 'UAH';
let right = 'UAH';
// let backLeft = document.querySelectorAll('.left')

document.querySelectorAll('.left').forEach(element => {
  element.addEventListener('click', (event)=>{
    document.querySelectorAll('.left').forEach((element) => {element.style.backgroundColor = 'white'});
      element.style.backgroundColor = '#833AE0';
      left = element.innerHTML;
        // calc(left,right, 0);
      calc(left,right, 0);
  })
})
document.querySelectorAll('.right').forEach(element => {
  element.addEventListener('click', (event)=>{
    document.querySelectorAll('.right').forEach((element) => {element.style.backgroundColor = 'white'});
    element.style.backgroundColor = '#833AE0';
      right = element.innerHTML;
      calc(left, right, 0);
  })
})
function calc(left, right, num) { fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right}`)
.then(res => res.json())
.then(data => {
  setTimeout(()=> {
    if (num == 0)
    input2.value = input1.value*data.rates[`${right}` ];
    else input1.value = input2.value*data.rates[`${right}`];
  }, 1);
  document.querySelectorAll('.leftP').forEach((element) => {
    element.innerHTML = `1 ${left} = ${Math.trunc(data.rates[right])+((Math.trunc(data.rates[right]*1000))%1000)/1000} ${right}`;
})
  document.querySelectorAll('.rightP').forEach((element) => {
    element.innerHTML = `1 ${right} = ${1/data.rates[right]} ${left}`;
})
})
.catch((err) => {
  console.log('error');
})
}
input2.addEventListener('input', ()=>{
  calc(right, left, 1)
})
input1.addEventListener('input', ()=>{
  calc(left, right, 0)
})