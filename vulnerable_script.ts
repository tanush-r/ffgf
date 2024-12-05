// Example of broken, insecure, and poor-quality TypeScript code

// Hardcoded credentials (Security Issue)
const username = "admin";
const password = "password123"; // Sensitive information exposed

// Unrestricted HTTP request (Security Issue)
import axios from 'axios';
axios.get('http://insecure-url.com') // No error handling or secure HTTPS
  .then((response) => {
    console.log(response.data);
  });

// SQL Injection vulnerability
function getUserData(userId: string): string {
  const query = `SELECT * FROM users WHERE id = '${userId}'`; // Unsafe SQL query construction
  console.log("Executing query: " + query);
  return query;
}
getUserData("1' OR '1'='1"); // Exploiting SQL Injection

// No proper typing (Code Quality Issue)
function processData(data: any): any { // Avoids specific typing
  console.log(data.toUpperCase()); // Unsafe call assuming 'data' is a string
  return data;
}
processData(42); // Causes runtime error

// Open redirect vulnerability
import * as express from 'express';
const app = express();
app.get('/redirect', (req, res) => {
  const url = req.query.url; // URL taken directly from user input
  res.redirect(url as string); // Redirects to potentially malicious site
});

// Ignored promise rejection (Code Quality Issue)
async function fetchData() {
  return axios.get('http://insecure-url.com');
}
fetchData(); // Promise ignored, no error handling

// Arbitrary code execution (Security Issue)
const userInput = "console.log('Hacked!')";
eval(userInput); // Executes untrusted user input directly

// Excessive function nesting (Code Quality Issue)
function deeplyNestedFunction() {
  function level1() {
    function level2() {
      function level3() {
        function level4() {
          function level5() {
            console.log("Too deep!");
          }
          level5();
        }
        level4();
      }
      level3();
    }
    level2();
  }
  level1();
}
deeplyNestedFunction();
