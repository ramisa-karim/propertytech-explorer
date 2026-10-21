
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

    explanation.hidden = !explanation.hidden;
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

    if (
        investmentInput.value.trim() === "" ||
        !Number.isFinite(investmentAmount) ||
        investmentAmount <= 0
    ) {
        result.textContent =
            "Please enter a valid amount greater than £0.";
        return;
    }

    if (investmentAmount < tokenPrice) {
        result.textContent =
            "The minimum amount for this example is £100.";
        return;
    }

    if (investmentAmount % tokenPrice !== 0) {
        result.textContent =
            "Please enter an amount in multiples of £100, such as £500 or £1,000.";
        return;
    }

    if (investmentAmount > propertyValue) {
        result.textContent =
            "This amount exceeds the hypothetical property value of £1,000,000.";
        return;
    }

    const numberOfTokens = investmentAmount / tokenPrice;

    const percentageOfProperty =
        (investmentAmount / propertyValue) * 100;

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
   3. FICTIONAL COMMERCIAL PROPERTY PORTFOLIO
   ========================================= */

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

const gbpFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
});

function formatPercentage(value) {
    return value.toFixed(2) + "%";
}

function getGrossYield(asset) {
    if (asset.value <= 0) {
        return 0;
    }

    return (asset.annualRent / asset.value) * 100;
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

    // Weighted gross yield for the selected properties
    const portfolioYield =
        totalValue > 0 ? (totalRent / totalValue) * 100 : 0;

    return {
        totalValue: totalValue,
        totalRent: totalRent,
        portfolioYield: portfolioYield
    };
}


/* =========================================
   6. DISPLAY PORTFOLIO SUMMARY
   ========================================= */

function renderPortfolioSummary(totals) {
    const totalValueElement =
        document.getElementById("portfolioTotalValue");

    const totalRentElement =
        document.getElementById("portfolioTotalRent");

    const averageYieldElement =
        document.getElementById("portfolioAverageYield");

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
   7. DISPLAY PROPERTY COMPARISON TABLE
   ========================================= */

function renderPortfolioTable(assets) {
    const tableBody = document.getElementById("portfolioTableBody");

    if (!tableBody) {
        return;
    }

    if (assets.length === 0) {
        tableBody.innerHTML =
            '<tr><td colspan="5">No properties match your selected filter.</td></tr>';
        return;
    }

    tableBody.innerHTML = assets.map(function (asset) {
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
                        ${formatPercentage(getGrossYield(asset))}
                    </span>
                </td>
            </tr>
        `;
    }).join("");
}


/* =========================================
   8. PHASE 3.1: FILTER AND SORT PROPERTIES
   ========================================= */

function getFilteredAndSortedAssets() {
    const typeFilter = document.getElementById("portfolioTypeFilter");
    const sortSelect = document.getElementById("portfolioSortBy");

    const selectedType = typeFilter ? typeFilter.value : "all";
    const selectedSort = sortSelect ? sortSelect.value : "default";

    // Copy the original data so its order is not permanently changed
    let displayedAssets = portfolioAssets.slice();

    // Filter by the selected property type
    if (selectedType !== "all") {
        displayedAssets = displayedAssets.filter(function (asset) {
            return asset.type === selectedType;
        });
    }

    // Sort the filtered properties
    switch (selectedSort) {
        case "value-desc":
            displayedAssets.sort(function (a, b) {
                return b.value - a.value;
            });
            break;

        case "value-asc":
            displayedAssets.sort(function (a, b) {
                return a.value - b.value;
            });
            break;

        case "yield-desc":
            displayedAssets.sort(function (a, b) {
                return getGrossYield(b) - getGrossYield(a);
            });
            break;

        case "yield-asc":
            displayedAssets.sort(function (a, b) {
                return getGrossYield(a) - getGrossYield(b);
            });
            break;

        case "default":
        default:
            // Restore original order when no sorting is selected
            // Filtering still applies if a type has been selected
            break;
    }

    return displayedAssets;
}


/* =========================================
   9. UPDATE THE DASHBOARD
   ========================================= */

function updatePortfolioDashboard() {
    const dashboard = document.getElementById("portfolio-dashboard");

    if (!dashboard) {
        return;
    }

    const displayedAssets = getFilteredAndSortedAssets();

    // Update the summary to match the currently displayed properties
    const totals = calculatePortfolioTotals(displayedAssets);

    renderPortfolioSummary(totals);
    renderPortfolioTable(displayedAssets);
    updatePortfolioAssetCount(displayedAssets.length);
}


/* =========================================
   10. UPDATE THE ASSET COUNT
   ========================================= */

function updatePortfolioAssetCount(count) {
    const assetCountElement =
        document.getElementById("portfolioAssetCount");

    if (!assetCountElement) {
        return;
    }

    assetCountElement.textContent =
        String(count).padStart(2, "0") +
        (count === 1 ? " SAMPLE ASSET" : " SAMPLE ASSETS");
}


/* =========================================
   11. RESET FILTERS AND SORTING
   ========================================= */

function resetPortfolioFilters() {
    const typeFilter = document.getElementById("portfolioTypeFilter");
    const sortSelect = document.getElementById("portfolioSortBy");

    if (typeFilter) {
        typeFilter.value = "all";
    }

    if (sortSelect) {
        sortSelect.value = "default";
    }

    updatePortfolioDashboard();
}


/* =========================================
   12. INITIALISE THE WEBSITE
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    // Display the portfolio when the page loads
    updatePortfolioDashboard();

    const typeFilter = document.getElementById("portfolioTypeFilter");
    const sortSelect = document.getElementById("portfolioSortBy");
    const resetButton = document.getElementById("resetPortfolioFilters");

    // Respond when a property type is selected
    if (typeFilter) {
        typeFilter.addEventListener("change", updatePortfolioDashboard);
    }

    // Respond when the sorting option changes
    if (sortSelect) {
        sortSelect.addEventListener("change", updatePortfolioDashboard);
    }

    // Restore the default portfolio view
    if (resetButton) {
        resetButton.addEventListener("click", resetPortfolioFilters);
    }
});
