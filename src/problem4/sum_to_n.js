const readline = require('readline');

// Create an interface to read input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Iterative Approach
function sum_to_n_iterative(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Mathematical Formula
function sum_to_n_formula(n) {
    return (n * (n + 1)) / 2;
}

// Recursive Approach
function sum_to_n_recursive(n) {
    if (n === 1) return 1; // Base case
    return n + sum_to_n_recursive(n - 1);
}

// Ask the user for input
rl.question("Please enter a number (n): ", (answer) => {
    const n = parseInt(answer.trim()); // Parse the user input into an integer

    // Validate the input
    if (isNaN(n) || n <= 0) {
        console.log("Please enter a valid positive integer.");
        rl.close();
        return;
    }

    // Perform calculations and measure time
    console.time("Iterative Calculation");
    const sum_a = sum_to_n_iterative(n);
    console.timeEnd("Iterative Calculation");

    console.time("Formula Calculation");
    const sum_b = sum_to_n_formula(n);
    console.timeEnd("Formula Calculation");

    console.time("Recursive Calculation");
    const sum_c = sum_to_n_recursive(n);
    console.timeEnd("Recursive Calculation");

    // Display results
    console.log(`sum_to_n_a = ${sum_a}`);
    console.log(`sum_to_n_b = ${sum_b}`);
    console.log(`sum_to_n_c = ${sum_c}`);

    // Close the readline interface
    rl.close();
});
