#!/usr/bin/env node
/**
 * Using yargs package for easy parsing the command line arguments
 */
var argv = require("yargs")
  .usage("Usage: $0 [options]")
  .command("", "decodes/encodes a given strings with a given key")
  .example(
    "$0 -s 'a string' -k 3",
    "encodes the given string 'a string' with key 3 "
  )
  .example(
    "$0 -d -s 'a string' -k 3",
    "decodes the given string 'a string' with key 3"
  )
  .alias("d", "decodes")
  .nargs("d", 0)
  .describe("d", "Changes from encoding a string to decoding it")
  .alias("s", "string")
  .nargs("s", 1)
  .describe("s", "The string we want to encode/decode")
  .alias("k", "key")
  .nargs("k", 1)
  .describe("s", "The string we want to encode/decode")
  .demandOption(["k", "s"])
  .alias("h", "help")
  .epilog("copyright 2019").argv;

if (typeof argv.k !== "number" || argv.k < 0 || argv.k > 25) {
  console.log(
    "Unexpected string; check parameter '-k' and make sure it's type is a number between [0,25]"
  );

  // return;
}
/**
 * Function that returns the numerical value according to the ASCII table
 * 'A' = 65, 'a' = 97
 * @param {string} char the char for which we want to get the value
 */
function getNumericalValueOfLetter(char) {
  return /[a-z]/.test(char) // checking if char is lowercase
    ? char.charCodeAt() - 97
    : /A-Z/.test(char) // checking if char is uppercase
    ? char.charCodeAt() - 65
    : char.charCodeAt();
}

/**
 * Function that returns the letter out of the numerical value according to the ASCII table
 * 'A' = 65, 'a' = 97
 *  @param {number} numericalValue - the value from which we want to obtain the value
 * @param {string} char -> the initial char -> we pass this for checking for uppercase or lowercase letters
 */
function getLetterOutOfNumericalValue(numericalValue, char) {
  return /[a-z]/.test(char) // checking if char is lowercase
    ? numericalValue + 97
    : /A-Z/.test(char) // checking if char is uppercase
    ? numericalValue + 65
    : char.charCodeAt();
}

/**
 * Custom modulo function because JS mod function is broken. For more details see https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
 * @param {number} n dividend
 * @param {number} m divisor
 * @returns {number} n % m
 */
function mod(n, m) {
  return ((n % m) + m) % m;
}

/**
 * Function that shifts all letters from a given string with a given number(the key)
 * @param {string} text - the text we want to shift
 * @param {number} shift - the number of characters with which we shift
 */
const caesar = (text, shift) => {
  return String.fromCharCode(
    ...text.split("").map(char =>
      // applying the Caesar's code rule
      getLetterOutOfNumericalValue(
        mod(getNumericalValueOfLetter(char) + shift, 26),
        char
      )
    )
  );
};

console.log(
  `The ${argv.d ? "de" : ""}coded string is '${caesar(
    argv.s,
    argv.d ? -1 * argv.k : argv.k // if we want to decode the we shift with -1 * the key aka we shift in the other direction
  )}'`
);
