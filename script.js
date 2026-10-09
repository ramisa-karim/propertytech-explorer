
function showExplanation() {
    const explanation = document.getElementById("explanation");

    if (!explanation) return;

    if (
        explanation.style.display === "none" ||
        explanation.style.display === ""
    ) {
        explanation.style.display = "block";
    } else {
        explanation.style.display = "none";
    }
}

function calculateTokens() {
    const input = document.getElementById("investmentAmount");
    const result = document.getElementById("calculatorResult");

    if (!input || !result) return;

    const rawAmount = input.value.trim();
    const amount = Number(rawAmount);
    const tokenPrice = 100;

    if (
        rawAmount === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        result.textContent = "Please enter an amount greater than £0.";
        return;
    }

    if (amount % tokenPrice !== 0) {
        result.textContent =
            "Enter an amount that is a multiple of £100 for this example.";
        return;
    }

    const tokens = amount / tokenPrice;

    result.textContent =
        "£" + amount.toLocaleString("en-GB") +
        " represents " +
        tokens.toLocaleString("en-GB") +
        " hypothetical tokens at £100 each.";
}
