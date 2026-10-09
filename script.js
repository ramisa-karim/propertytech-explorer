
function showExplanation() {
    const explanation = document.getElementById("explanation");

    if (!explanation) {
        alert("I couldn't find the explanation section.");
        return;
    }

    if (explanation.style.display === "none" ||
        explanation.style.display === "") {
        explanation.style.display = "block";
    } else {
        explanation.style.display = "none";
    }
}

function calculateTokens() {
    alert("The calculator button is connected to JavaScript!");

    const input = document.getElementById("investmentAmount");
    const result = document.getElementById("calculatorResult");

    if (!input || !result) {
        alert("I couldn't find the calculator input or result area.");
        return;
    }

    const amount = Number(input.value);
    const tokenPrice = 100;

    if (input.value.trim() === "" || !Number.isFinite(amount) || amount <= 0) {
        result.textContent = "Please enter an amount greater than £0.";
        return;
    }

    if (amount % tokenPrice !== 0) {
        result.textContent = "Please enter an amount in multiples of £100.";
        return;
    }

    const tokens = amount / tokenPrice;

    result.textContent =
        "£" + amount.toLocaleString("en-GB") +
        " represents " + tokens.toLocaleString("en-GB") +
        " hypothetical tokens at £100 each.";
}
