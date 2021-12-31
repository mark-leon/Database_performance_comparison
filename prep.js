// let x = "leon";
// console.log(x);
// let v = "Karim";
// let y = x+v;
// console.log(y);

// function add(x,y,z){
//     return x+y+z;
// }
// x = add(2,3,4);
// console.log(x)

//document.write(x);
//document.getElementById("elementID").innerHTML = "Hello World!";
// for(let i =0;i<10;i++){
//     document.write(i)
// }
// html = "";
// custOrder = 5;
// for (var i of custOrder) {
// html += "<li>" + i + "</li>";
// }

// let objj = {
//     "name":"Jane",
//     "occupation":"Engineer"
// }
// console.log(objj)

// let nam= "leon";

// if(nam == "Kalom"){
//     console.log(nam)
// }
// else{
//     console.log("Wow hoh")
// }

// let jsonObject = {
//     "name":"kamal",
//     "occupation":"dont know",
//     "family":"5 childeren"
// }
// console.log(jsonObject)

// function cop(k,l){
//     //console.log(k+"ello"+l)
//     return k+"ello"+l;
// }
// console.log(cop(2,3))
// alert (5 != 0);

// let x = 5;
// for(let k = 0;k< 10;k++){
//     if(k%2 == 0){
//         continue
//     }
//     else{
//         console.log(k)
//     }
// }


// function isPrime(num){
//     let count = 0
//     for(let i = 0;i<=num;i++){
//         if(num%i ==0){
//             count = count + 1;
//         }
//     }
//     console.log(count);
//     if (count == 2){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// let x= isPrime(18)
// console.log(x)


// let sign = prompt("What's your sign?");
// alert(sign)

// if (sign.toLowerCase() == "scorpio") {
//   alert("Wow! I'm a Scorpio too!");
// }

// // there are many ways to use the prompt feature
// sign = window.prompt(); // open the blank prompt window
// sign = prompt();       //  open the blank prompt window
// sign = window.prompt('Are you feeling lucky'); // open the window with Text "Are you feeling lucky"
// sign = window.prompt('Are you feeling lucky', 'sure'); // open the window with Text "Are you feeling lucky" and default value "sure"

// let a = ["Bmw","Mercedes","Audi"];
// console.log(a);
// console.log(a[0]);
// console.log(a.length);
// console.log(a[a.length-1])
// console.log(a.slice(0,2))
// console.log(Math.random()*100);

// for( let i = 0;i<a.length;i++){
//     document.write(a[i]);
// }

// let s = "audi";
// console.log(s[1]);

// const numbers = [3,4];
// let sum = numbers.reduce(myFunction);

// function myFunction(total, value) {
//   return  total+value;
// }

// console.log(sum);
// const numbers = [45, 4, 9, 16, 25];
// let txt = "";
// numbers.forEach(myFunction);

// function myFunction(value, index, array) {
//   txt += value + "<br>";
// }

// let a = [1,2,3,4];
// let b = a.map(myf);

// function myf(value){
//    return value*5;
// }

// console.log(b)
// let b = a.filter(myf);
// function myf(value){
//     return value > 2;
// }
// console.log(b);


// let x = [4,4];
// let y = x.map(myfun)

// function myfun(value){
//     return value+2
// }
// console.log(y)

// let Objson = {
//     "name":"mf",
//     "heigh":"1.3"
// } 
// const b = JSON.stringify(Objson)
// console.log(b)

// var txt = "";
// var numbers = [45, 4, 9, 16, 25];
// numbers.forEach(myFunction);

// function myFunction(value) {
//   txt = txt + value + "<br>";
// }
// console.log(txt);
// function myFirst() {
//     console.log("Hello");
// }
  
// function mySecond() {
//     console.log("Whats up baby?");
// }
  
// myFirst();
// mySecond();

// let age = 17;
// if ((age >10)&&(age<24)){
//     console.log("you are welcomn")
// }
// else{
//     console.log("You are not welcome")
// }

// let x = prompt("Whats your number?");
// let sum = 0;
// for(let i = 0;i<=x;i++){
//     if((i % 3 ==0) || (i % 5 ==0)){
//         sum = sum + i;
//     }
// }
// alert(sum);

// let x = prompt("whats your number?");
// for(let i = 1;i<=x;i++){
//     for(let j = 1;j<=10;j++){
//         document.write(j*i)
//     }
// }

// let x = [1,54,23,64,439,3,6,95];
// //console.log(x);
// let max = x[0];
// let min = x[0];
// let sum = x[0];
// //console.log(max)
// for(let i=1;i<x.length;i++){
//     if(x[i]> max){
//         max = x[i]
//     }
// }
// console.log(max);
// for(let i=1;i<x.length;i++){
//     if(x[i]<min){
//         min = x[i]
//     }
// }
// console.log(min);
// for(let i=0;i<x.length;i++){
//     sum = sum+x[i];
// }
// let avg = sum/x.length;
// console.log(avg);


// function randomDate(start, end) {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }

// let x = randomDate(new Date(2012, 0, 1), new Date())
// console.log(x)
x = Math.floor(Math.random() * 200);
console.log(x);