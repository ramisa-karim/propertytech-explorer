
/* =========================================
   PROPERTYTECH EXPLORER
   INTERACTIVE JAVASCRIPT FEATURES
   ========================================= */


/* 1. SHOW OR HIDE THE TOKENISATION EXPLANATION */

function showExplanation() {
    const explanation = document.getElementById("explanation");

    if (!explanation) {
        return;
    }

    if (explanation.hidden) {
        explanation.hidden = false;
    } else {
        explanation.hidden = true;
    }
}


/* 2. TOKEN CALCULATOR */

function calculateTokens() {
    const investmentInput = document.getElementById("investmentAmount");
    const result = document.getElementById("calculatorResult");

    if (!investmentInput || !result) {
        return;
    }

    const investmentAmount = Number(investmentInput.value);
    const tokenPrice = 100;
    const propertyValue = 1000000;

    // Check whether the input is empty or invalid
    if (
        investmentInput.value.trim() === "" ||
        !Number.isFinite(investmentAmount) ||
        investmentAmount <= 0
    ) {
        result.textContent =
            "Please enter a valid amount greater than £0.";

        return;
    }

    // Check the minimum investment amount
    if (investmentAmount < tokenPrice) {
        result.textContent =
            "The minimum amount for this example is £100.";

        return;
    }

    // Check that the amount is in multiples of £100
    if (investmentAmount % tokenPrice !== 0) {
        result.textContent =
            "Please enter an amount in multiples of £100, such as £500 or £1,000.";

        return;
    }

    // Calculate the number of hypothetical tokens
    const numberOfTokens = investmentAmount / tokenPrice;

    // Check that the amount does not exceed the example's property value
    if (investmentAmount > propertyValue) {
        result.textContent =
            "This amount exceeds the hypothetical property value of £1,000,000.";

        return;
    }

    // Calculate the percentage of the notional property value
    const percentageOfProperty =
        (investmentAmount / propertyValue) * 100;

    // Display the result
    result.textContent =
        "Your hypothetical amount of " +
        investmentAmount.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            maximumFractionDigits: 0
        }) +
        " represents " +
        numberOfTokens.toLocaleString("en-GB") +
        " tokens at £100 each, equivalent to " +
        percentageOfProperty.toFixed(2) +
        "% of the property's notional value. This is an educational example, not a statement of legal ownership.";

}
