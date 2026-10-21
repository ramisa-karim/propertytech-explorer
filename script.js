
/* =========================================
   PROPERTYTECH EXPLORER
   INTERACTIVE JAVASCRIPT FEATURES
   ========================================= */


/* =========================================
   1. SHOW OR HIDE THE TOKENISATION EXPLANATION
   ========================================= */

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


/* =========================================
   2. TOKEN CALCULATOR
   ========================================= */

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


/* =========================================
   3. COMMERCIAL PROPERTY PORTFOLIO DASHBOARD

   All properties and figures below are fictional
   and are provided for educational purposes.
   ========================================= */

// Fictional commercial property portfolio
const portfolioAssets = [
    {
        name: "Meridian House",
        type: "Office",
        value: 4200000,
        annualRent: 315000
    },
    {
        name: "Northgate Retail Park",
        type: "Retail",
        value: 2800000,
        annualRent: 224000
    },
    {
        name: "Atlas Logistics Hub",
        type: "Industrial",
        value: 5500000,
        annualRent: 385000
    },
    {
        name: "Foundry Business Centre",
        type: "Office",
        value: 3250000,
        annualRent: 227500
    }
];


/* =========================================
   4. FORMATTING HELPERS
   ========================================= */

// Format numbers as pounds sterling
const gbpFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
});

// Format percentages to two decimal places
function formatPercentage(value) {
    return value.toFixed(2) + "%";
}


/* =========================================
   5. CALCULATE PORTFOLIO TOTALS
   ========================================= */

function calculatePortfolioTotals(assets) {
    const totalValue = assets.reduce(function (total, asset) {
        return total + asset.value;
    }, 0);

    const totalRent = assets.reduce(function (total, asset) {
        return total + asset.annualRent;
    }, 0);

    // Weighted portfolio gross yield:
    // Total annual rent divided by total property value
    const portfolioYield =
        totalValue > 0 ? (totalRent / totalValue) * 100 : 0;

    return {
        totalValue: totalValue,
        totalRent: totalRent,
        portfolioYield: portfolioYield
    };
}


/* =========================================
   6. DISPLAY THE PORTFOLIO SUMMARY
   ========================================= */

function renderPortfolioSummary(totals) {
    const totalValueElement =
        document.getElementById("portfolioTotalValue");

    const totalRentElement =
        document.getElementById("portfolioTotalRent");

    const averageYieldElement =
        document.getElementById("portfolioAverageYield");

    // Update each metric only if its HTML element exists
    if (totalValueElement) {
        totalValueElement.textContent =
            gbpFormatter.format(totals.totalValue);
    }

    if (totalRentElement) {
        totalRentElement.textContent =
            gbpFormatter.format(totals.totalRent);
    }

    if (averageYieldElement) {
        averageYieldElement.textContent =
            formatPercentage(totals.portfolioYield);
    }
}


/* =========================================
   7. DISPLAY THE PROPERTY COMPARISON TABLE
   ========================================= */

function renderPortfolioTable(assets) {
    const tableBody = document.getElementById("portfolioTableBody");

    // Stop safely if the dashboard table is not on this page
    if (!tableBody) {
        return;
    }

    // Show a message if no properties are available
    if (assets.length === 0) {
        tableBody.innerHTML =
            '<tr><td colspan="4">No property data is available.</td></tr>';

        return;
    }

    // Create one table row for each property
    tableBody.innerHTML = assets.map(function (asset) {
        const grossYield =
            asset.value > 0
                ? (asset.annualRent / asset.value) * 100
                : 0;

        return `
            <tr>
                <td>${asset.name}</td>
                <td>
                    <span class="asset-type">${asset.type}</span>
                </td>
                <td>${gbpFormatter.format(asset.value)}</td>
                <td>${gbpFormatter.format(asset.annualRent)}</td>
                <td>
                    <span class="yield-value">
                        ${formatPercentage(grossYield)}
                    </span>
                </td>
            </tr>
        `;
    }).join("");
}


/* =========================================
   8. INITIALISE THE PORTFOLIO DASHBOARD
   ========================================= */

function renderPortfolioDashboard() {
    // Check that the dashboard exists before updating it
    const dashboard = document.getElementById("portfolio-dashboard");

    if (!dashboard) {
        return;
    }

    // Calculate totals using the fictional property data
    const totals = calculatePortfolioTotals(portfolioAssets);

    // Display the summary figures
    renderPortfolioSummary(totals);

    // Display the property comparison table
    renderPortfolioTable(portfolioAssets);
}


/* =========================================
   9. START THE DASHBOARD WHEN THE PAGE LOADS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    renderPortfolioDashboard();
});

