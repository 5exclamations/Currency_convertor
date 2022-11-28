let input1 = document.querySelector('.firstInput');
let input2 = document.querySelector('.secondInput');
let left = 'UAH';
let right = 'USD';

document.querySelectorAll('.left').forEach(element => {
  element.addEventListener('click', ()=>{
    input1.value = 1;
    document.querySelectorAll('.left').forEach((element) => {element.style.backgroundColor = 'white'});
      element.style.backgroundColor = '#833AE0';
      left = element.innerHTML;
      calc(left,right, 1);
  })
})
document.querySelectorAll('.right').forEach(element => {
  element.addEventListener('click', ()=>{
    document.querySelectorAll('.right').forEach((element) => {element.style.backgroundColor = 'white'});
    element.style.backgroundColor = '#833AE0';
      right = element.innerHTML;
      calc(left, right, 0);
  })
})
function calc(left, right, num) {  fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right}`)
.then(res => res.json())
.then(data => {
  setTimeout(()=> {
    if (num == 0)
    input2.value = cutNumber((input1.value*data.rates[`${right}`]).toString())
    else {
      input1.value = cutNumber((input2.value*data.rates[`${right}`]).toString());
    }
  }, 1);
  document.querySelectorAll('.leftP').forEach((element) => {
    element.innerHTML = `1 ${left} = ${cutNumber(data.rates[right].toString())} ${right}`;
})
  document.querySelectorAll('.rightP').forEach((element) => {
    element.innerHTML = `1 ${right} = ${cutNumber((1/data.rates[right]).toString())} ${left}`
  })
})
.catch((err) => {
  console.log('error');
})
}
input2.addEventListener('input', (event)=>{
  calc(left, right, 1)
  cutNumberInput(input2);
})
input1.addEventListener('input', (item)=>{
  calc(left, right, 0)
  cutNumberInput(input1);
})

function cutNumberInput(num){
  if (num.value.indexOf(".") != '-1') {
    num.value=num.value.substring(0, num.value.indexOf(".") + 5);
  }
  return num;
}
function cutNumber (num){
  if (num.indexOf(".") != '-1') {
    num=num.substring(0, num.indexOf(".") + 5);
  }
  return num;
}
function deleteDot (num){
  num = num.toString().split('');
  for(i=0;i<num.length;i++){
    console.log(num[i])
      if(num[i] == ',') num[i] = '.';
  }
  num = num.join('');
  console.log(num);
  return Number(num);
}
