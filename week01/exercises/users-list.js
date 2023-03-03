'use strict' ;

const names = `Luigi De Russis, Luca Mannella, 
Fulvio Corno, Juan Pablo Saenz Moreno, 
Enrico Masala, Antonio Servetti, Eros Fani`;
// if you use `` instead of '', you can have multi-line strings, with newlines: then, you need to handle newlines with, e.g., replace() -- see below

// join multi-line string
const inlineNames = names.replace(/\n/g, ' ');

// create the names array
const nameArray = inlineNames.split(',');

// clean whitespace around commas
for(let i =0; i < nameArray.length; i++)
  nameArray[i] = nameArray[i].trim();

// ALTERNATIVE
/*
for(let [i, n]  of nameArray.entries())
  nameArray[i] = n.trim() ;
*/

// create acronyms
const acronyms = [];

for(const name of nameArray) {
  // each word in an array position
  const words = name.split(' ');
  let initials = '';
  // store the first letter of each word
  for(const word of words) {
    if (word) {
      initials += word[0];
    }
  }
  acronyms.push(initials);
}

// print each acronym + name
for(let i=0; i < nameArray.length; i++) {
    console.log(`${acronyms[i]} - ${nameArray[i]}`);
}