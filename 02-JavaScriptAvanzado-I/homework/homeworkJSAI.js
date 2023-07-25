// I. Scope & Hoisting

// Ex.1----------------------------------------------------------------------------------Ex.1
x = 1;
var a = 5;
var b = 10;
var c = function (a, b, c) {
   var x = 10;
   console.log(x);  // x vale 10
   console.log(a);  // a vale 8 (c(a=8,b=9,c=10))
   var f = function (a, b, c) { // (a=8,b=9,c=10)
      b = a;    // b = 8
      console.log(b);   // 8
      b = c;    // b = 10
      var x = 5;    // (sólo válido en el contexto de la función)
   };
   f(a, b, c);  // a=8,b=9,c=10
   console.log(b);  // 9
};
c(8, 9, 10);
console.log(b); // b en el contexto global vale 10
console.log(x); // x en el contexto global vale 1



// Ex.2----------------------------------------------------------------------------------Ex.2
console.log(bar);   // No está definida / existe
//console.log(baz);   // No está definida / no existe
foo();  // Ejecución de foo() = Hola! (Al ser una función el hoisting la eleva)
function foo() {
   console.log('Hola!');
}
var bar = 1;    // Declaración tardía de bar
baz = 2;        // Declaración tardía de baz


// Ex.3----------------------------------------------------------------------------------Ex.3
var instructor = 'Tony';    //contexto global
if (true) {
   var instructor = 'Franco';   //contexto global
}
console.log(instructor);   //nuevo valor de 'instructor' es 'Franco'


// Ex.4----------------------------------------------------------------------------------Ex.4
var instructor = 'Tony';    // instructor vale 'Tony' (c.global)
console.log(instructor);    // Tony
(function () {
   if (true) {
      var instructor = 'Franco';
      console.log(instructor);  //Franco (c.de función)
   }
})();
console.log(instructor);    //Tony (c.global)


// Ex.5----------------------------------------------------------------------------------Ex.5
var instructor = 'Tony';
let pm = 'Franco';
if (true) {
   var instructor = 'The Flash';
   let pm = 'Reverse Flash';
   console.log(instructor);   // imprime 'The Flash' porque en el contexto del IF en el que se encuentra la variable instructor tiene ese valor
   console.log(pm);  // imprime 'Reverse Flash' porque en el contexto del IF en el que se encuentra la variable instructor tiene ese valor
}
console.log(instructor);   //Aunque esté invocada fuera del IF, la variable instructor, al haber sido declarada con VAR, adquiere el nuevo valor establecido en dicho IF 
console.log(pm);  //En este caso la variable pm ha sido declarada con LET por lo que dentro del IF tendra un valor (let pm = 'Reverse Flash') y fuera del IF tendrá otro (let pm = 'Franco')






// II. Coerción de datos---------------------------------------------------------------------

6 / "3"
// los trata como números y ejecuta la división
console.log(6 / "3");

"2" * "3"
// los trata como números y ejecuta la multiplicación
console.log("2" * "3")

4 + 5 + "px"
// Suma los valores numéricos y concatena el resultado con el string
console.log(4 + 5 + "px")

"$" + 4 + 5
// concatena todos los valores como si fueran strings
console.log("$" + 4 + 5)

"4" - 2
// los trata como números y ejecuta la resta
console.log("4" - 2)

"4px" - 2
// JS se confunde y no sabe como operar. Devuelve NaN
console.log("4px" - 2)

7 / 0
// retorna 'infinity' ¿¿??
console.log(7 / 0)

{}[0]
// retorna undefined ¿¿??
console.log({}[0])

parseInt("09")
// convierte el String a Number
console.log(parseInt("09"))

5 && 2
// retorna el último valor (2) ¿¿??
console.log(5 && 2);

2 && 5
// retorna el último valor (5) ¿¿??
console.log(2 && 5)

5 || 0
// retorna el primer valor (5) ¿¿??
console.log(5 || 0)

0 || 5
// retorna el segundo valor (5) ¿¿??
console.log(0 || 5)

//let x = [3]+[3]-[10] ¿¿??
// 
console.log([3]+[3]-[10])

3>2>1
// retorna false porque 3 > 2 > 1 = ((3 > 2) = true) > 1 => ((true = 1) > 1) => 1 > 1 = false ¿¿??
console.log(3>2>1)

//[] == ![]
// retorna true porque el comparador es de igualdad (==) y no de igualdad estricta (===) ¿¿??
console.log([] == ![])





// III. Hoisting-----------------------------------------------------------------------------------

// A.
function test() {
    console.log(a);
    console.log(foo());
 
    var a = 1;
    function foo() {
       return 2;
    }
 }
 test();
 // console.log(a) retorna undefined porque, debido al hoisting, la variable 'a' ha sido declarada pero no tiene valor asignado todavía
 // console.log(foo) retorna 2 porque es lo que hace esa función. Por tratarse de una función, el hoisting la ha elevado con toda su data interior.

// B.
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
       var snack = 'Friskies';
       return snack;
    }
    return snack;
}
getFood(false);
console.log(getFood(false));    //Retorna 'undefined' porque el 'if' no se cumple y pasa a la siguiente linea de código: return snack (debido al hoisting, snack ha sido elevado y declarado pero todavía no posee un valor asignado)
console.log(getFood(true));     //Se cumple la condición del 'if'





// IV. This-----------------------------------------------------------------------------------------

var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function () {
         return this.fullname;
      },
   },
};

console.log(obj.prop.getFullname());    // Retorna 'Aurelio De Rosa' porque dentro de la función 'getFullname()' THIS hace referencia a la variable 'fullname' que está dentro de dicha función

var test = obj.prop.getFullname;

console.log(test());    // la ejecución de test() retorna 'Juan Perez' porque en este caso THIS hace referencia a la variable fullname que está fuera de la función, en el contexto global




// V. Event Loop-----------------------------------------------------------------------------------------

function printing() {
   console.log(1);
   setTimeout(function () {
      console.log(2);
   }, 1000);
   setTimeout(function () {
      console.log(3);
   }, 0);
   console.log(4);
}

printing(); // Imprime primero variables de contexto más general: (1) y luego ejecuta (4). Las funciones 'setTimeout(callback)' que habían quedado en cola se ejecutan en el orden que corresponde: primero (3 | delay:0) y finalmente (2 | delay:1000) => 1, 4, 3, 2