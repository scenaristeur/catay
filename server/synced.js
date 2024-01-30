// https://syncedstore.org/docs/basics/example




import * as readline from "readline";



import { observeDeep } from "@syncedstore/core";
import { store } from "./store.js";



// Display the contents of the store
// const jsonView = document.createElement("pre");
// jsonView.innerText = JSON.stringify(store, undefined, 2);
// root.appendChild(jsonView);

function doit(answer){
console.log(answer, JSON.stringify(store, undefined, 2))

if (answer == "add"){

    store.myArray.push({ date: new Date()});
   // store.myArray.push(Math.floor(Math.random() * 100));
}


}

// Add a button to add some values to store.myArray
// const addElementBtn = document.createElement("button");
// addElementBtn.innerText = "Add values to array";
// addElementBtn.onclick = () => {
//   // Add an object to the array
//   store.myArray.push({ property: "value" });

//   // Add a random number between 0 and 100 to the array
//   store.myArray.push(Math.floor(Math.random() * 100));
// };
// root.appendChild(addElementBtn);

// Add a button to set a property on store.myObject

// Which property to change?
// const inputPropertyName = document.createElement("input");
// inputPropertyName.value = "myProp";
// root.appendChild(inputPropertyName);

// // What value to set to the property?
// const inputPropertyValue = document.createElement("input");
// inputPropertyValue.value = "myValue";
// root.appendChild(inputPropertyValue);

// // Add the actual button to change a property
// const setPropertBtn = document.createElement("button");
// setPropertBtn.innerText = "Change a property on the object";
// setPropertBtn.onclick = () => {
//   // Change a property on myObject
//   store.myObject[inputPropertyName.value] = inputPropertyValue.value;
// };
// root.appendChild(setPropertBtn);

// Automatically update jsonView when the store changes
//
// (note that in most applications, you won't use observeDeep
// but rely on SyncedStore's reactive updating mechanism instead)
observeDeep(store, () => {
  //jsonView.innerText = 
  console.log(JSON.stringify(store, undefined, 2))
});

// Set the store on the window object
// If you like, you can now play around with the store
// and change values using the Browser inspector
//window.store = store;



var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
   });
   
   var waitForUserInput = function() {
     rl.question("Command: ", function(answer) {
       if (answer == "exit"){
           rl.close();
       } else {
    doit(answer);
           waitForUserInput();
       }
     });
   }
   

   
   waitForUserInput();
   //someRandomFunction();
   