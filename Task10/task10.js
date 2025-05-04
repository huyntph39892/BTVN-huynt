function number(a, b , c){
    a = a+b;
    b = (a + c)/a;
    c = a- b;
    return [a, b, c];
}
console.log(number(1, 2, 3));
