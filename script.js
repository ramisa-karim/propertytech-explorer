```javascript
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
            // Keep the original order when no sorting is selected
            // Filtering still applies if a type has been selected
            break;
    }

    return displayedAssets;
}


/* =========================================
   9. UPDATE THE ASSET COUNT
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
   10. PHASE 3.2: ASSET ALLOCATION
   ========================================= */

function renderAssetAllocation() {
    const chartElement =
        document.getElementById("assetAllocationChart");

    const legendElement =
        document.getElementById("assetAllocationLegend");

    if (!chartElement || !legendElement) {
        return;
    }

    // Always analyse the full portfolio, not the filtered table
    const totalValue = portfolioAssets.reduce(function (total, asset) {
        return total + asset.value;
    }, 0);

    const assetTypes = ["Office", "Retail", "Industrial"];

    const allocation = assetTypes.map(function (type) {
        const typeValue = portfolioAssets
            .filter(function (asset) {
                return asset.type === type;
            })
            .reduce(function (total, asset) {
                return total + asset.value;
            }, 0);

        return {
            type: type,
            value: typeValue,
            percentage: totalValue > 0
                ? (typeValue / totalValue) * 100
                : 0
        };
    });

    const allocationIcons = {
        Office: "▦",
        Retail: "◈",
        Industrial: "⬡"
    };

    chartElement.innerHTML = allocation.map(function (item) {
        return `
            <div class="allocation-row">
                <div class="allocation-row-heading">
                    <span>${item.type}</span>
                    <strong>${formatPercentage(item.percentage)}</strong>
                </div>

                <div
                    class="allocation-track"
                    role="img"
                    aria-label="${item.type} represents ${formatPercentage(item.percentage)} of total portfolio value"
                >
                    <div
                        class="allocation-bar allocation-${item.type.toLowerCase()}"
                        style="width: ${item.percentage}%"
                    ></div>
                </div>

                <p class="allocation-value">
                    ${gbpFormatter.format(item.value)}
                </p>
            </div>
        `;
    }).join("");

    legendElement.innerHTML = allocation.map(function (item) {
        return `
            <div class="allocation-legend-item">
                <span class="allocation-legend-icon allocation-${item.type.toLowerCase()}">
                    ${allocationIcons[item.type]}
                </span>
                <span>${item.type}</span>
                <strong>${formatPercentage(item.percentage)}</strong>
            </div>
        `;
    }).join("");
}


/* =========================================
   11. PHASE 3.2: HIGHEST-YIELDING ASSET
   ========================================= */

function renderHighestYieldAsset() {
    const resultElement =
        document.getElementById("highestYieldAsset");

    if (!resultElement) {
        return;
    }

    if (portfolioAssets.length === 0) {
        resultElement.textContent =
            "No properties are available to analyse.";
        return;
    }

    const highestYieldAsset = portfolioAssets.reduce(function (highest, asset) {
        return getGrossYield(asset) > getGrossYield(highest)
            ? asset
            : highest;
    }, portfolioAssets[0]);

    resultElement.innerHTML = `
        <div class="highest-yield-badge">
            <span aria-hidden="true">↗</span>
            HIGHEST GROSS YIELD
        </div>

        <h5>${highestYieldAsset.name}</h5>

        <div class="highest-yield-percentage">
            ${formatPercentage(getGrossYield(highestYieldAsset))}
        </div>

        <p class="highest-yield-type">
            ${highestYieldAsset.type} property
        </p>

        <div class="highest-yield-details">
            <div>
                <span>Property value</span>
                <strong>${gbpFormatter.format(highestYieldAsset.value)}</strong>
            </div>

            <div>
                <span>Annual rent</span>
                <strong>${gbpFormatter.format(highestYieldAsset.annualRent)}</strong>
            </div>
        </div>
    `;
}


/* =========================================
   12. PHASE 3.2: AUTOMATIC PORTFOLIO OBSERVATIONS
   ========================================= */

function renderPortfolioObservations() {
    const observationsElement =
        document.getElementById("portfolioObservations");

    if (!observationsElement) {
        return;
    }

    if (portfolioAssets.length === 0) {
        observationsElement.textContent =
            "Add portfolio assets to generate observations.";
        return;
    }

    const totals = calculatePortfolioTotals(portfolioAssets);

    // Find the property with the highest market value
    const largestAsset = portfolioAssets.reduce(function (largest, asset) {
        return asset.value > largest.value ? asset : largest;
    }, portfolioAssets[0]);

    // Find the property generating the most annual rent
    const highestRentAsset = portfolioAssets.reduce(function (highest, asset) {
        return asset.annualRent > highest.annualRent ? asset : highest;
    }, portfolioAssets[0]);

    // Find the asset type with the greatest combined value
    const typeTotals = {};

    portfolioAssets.forEach(function (asset) {
        if (!typeTotals[asset.type]) {
            typeTotals[asset.type] = {
                value: 0,
                rent: 0,
                count: 0
            };
        }

        typeTotals[asset.type].value += asset.value;
        typeTotals[asset.type].rent += asset.annualRent;
        typeTotals[asset.type].count += 1;
    });

    const dominantType = Object.keys(typeTotals).reduce(function (largest, type) {
        return typeTotals[type].value > typeTotals[largest].value
            ? type
            : largest;
    }, Object.keys(typeTotals)[0]);

    const dominantTypeShare =
        totals.totalValue > 0
            ? (typeTotals[dominantType].value / totals.totalValue) * 100
            : 0;

    const largestAssetShare =
        totals.totalValue > 0
            ? (largestAsset.value / totals.totalValue) * 100
            : 0;

    const observations = [
        {
            number: "01",
            title: "Largest asset type",
            description:
                dominantType + " properties account for " +
                formatPercentage(dominantTypeShare) +
                " of the portfolio's total value."
        },
        {
            number: "02",
            title: "Largest individual property",
            description:
                largestAsset.name + " has the highest individual value at " +
                gbpFormatter.format(largestAsset.value) +
                ", representing " + formatPercentage(largestAssetShare) +
                " of the overall portfolio."
        },
        {
            number: "03",
            title: "Highest annual rental income",
            description:
                highestRentAsset.name + " generates the highest annual rent at " +
                gbpFormatter.format(highestRentAsset.annualRent) +
                " in this illustrative portfolio."
        },
        {
            number: "04",
            title: "Overall portfolio yield",
            description:
                "The portfolio's weighted gross rental yield is " +
                formatPercentage(totals.portfolioYield) +
                ", calculated using total annual rent divided by total property value."
        }
    ];

    observationsElement.innerHTML = observations.map(function (observation) {
        return `
            <div class="portfolio-observation">
                <span class="observation-number">${observation.number}</span>
                <div class="observation-content">
                    <h5>${observation.title}</h5>
                    <p>${observation.description}</p>
                </div>
            </div>
        `;
    }).join("");
}


/* =========================================
   13. UPDATE THE DASHBOARD
   ========================================= */

function updatePortfolioDashboard() {
    const dashboard = document.getElementById("portfolio-dashboard");

    if (!dashboard) {
        return;
    }

    const displayedAssets = getFilteredAndSortedAssets();

    // Summary cards and table follow the active filter and sorting
    const totals = calculatePortfolioTotals(displayedAssets);

    renderPortfolioSummary(totals);
    renderPortfolioTable(displayedAssets);
    updatePortfolioAssetCount(displayedAssets.length);

    // Phase 3.2 insights always analyse the entire portfolio
    renderAssetAllocation();
    renderHighestYieldAsset();
    renderPortfolioObservations();
}


/* =========================================
   14. RESET FILTERS AND SORTING
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
   15. INITIALISE THE WEBSITE
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    // Render the portfolio and its insights when the page loads
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
```
