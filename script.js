
let input1 = document.querySelector('.firstInput');
let input2 = document.querySelector('.secondInput');
let left = 'UAH';
let right = 'USD';
let menuButton = querySelector('.menuButton');
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
function calc(left, right, num) {
fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right}`)
.then(res => res.json())
.then(data => {
  input1.value.replace(',', '.')
  // for (let i=0; i<input1.value.length; i++){
  //   if(input1.value[i] ==',') input1.value[i] = '.'
  // }
  setTimeout(()=> {
    if (num == 0){
    input2.value = cutNumber((despace(input1.value)*data.rates[`${right}`]).toString())
    input2.value = space(input2.value);
    }
    else {
      input1.value = cutNumber((despace(input2.value)*data.rates[`${right}`]).toString());
      input1.value = space(input1.value); 
    }
  }, 1);
  document.querySelectorAll('.leftP').forEach((element) => {
    element.innerHTML = `1 ${left} = ${cutNumber(data.rates[right].toString())} ${right}`;
})
  document.querySelectorAll('.rightP').forEach((element) => {
    element.innerHTML = `1 ${right} = ${cutNumber((1/data.rates[right]).toString())} ${left}`
  })
  input1.value = space(input1.value);
  input2.value = space(input2.value);
})
.catch((err) => {
  console.log('error');
})
}
input2.addEventListener('input', (event)=>{
  // for (let i=0; i<input2.value.length; i++){
  //   if(input2.value[i] ==',') {
  //     input2.value[i] = '.'
  //     console.log(input2.value)
  //   }
  // }
  calc(left, right, 1)
  cutNumberInput(input2);
})
input1.addEventListener('input', (item)=>{
  calc(left, right, 0)
  cutNumberInput(input1);
})
menuButton.addEventListener('click', (event) =>{
  document.querySelector('.showDiv').style.display = 'none'
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
      if(num[i] == ',') num[i] = '.';
  }
  num = num.join('');
  return Number(num);
}



function space (num){
  let dot = false;
  num = despace(num);
  for(let i = 0; i<num.length;i++){
      if(num[i] == ".") dot = true;
  }
  if(dot){
      let parts = num.toString().split(".");
      for(let i = 0;i<2;i++)
          parts[i] = parts[i].replace(/[^0-9,]/g,'');
      parts [0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
  }
  else{
      let parts = num.toString();
      parts = parts.replace(/[^0-9,]/g,'');
      parts = parts.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts;
  }
}
function despace(num){
  let dot = false;
  for(let i = 0; i<num.length;i++)
      if(num[i] == ".") dot = true;
  if(dot){
      num = num.split(".")
      num[0] = num[0].replace(/[^0-9,]/g,'');
      return num.join(".")
  }
  else{
  return num = num.replace(/[^0-9,]/g,'');
  }
}