const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("How do I access a cookie? ", function (answer) {
  if(answer === "document.cookie")
  {
    console.log("2f 66 6c 61 67 2e 68 74 6d 6c");
  }
  else
  {
    console.log("Try something else");
  }
});
