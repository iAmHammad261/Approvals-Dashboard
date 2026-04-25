# Approvals Dashboard

A centralized NetSuite dashboard for bulk-approving financial transactions, built with SuiteScript 2.1 and Tabulator.js.

## Files

| File | Type | Purpose |
|------|------|---------|
| `PCI_CS_renderApprovalDashboard.js` | Client Script | Renders the Tabulator.js UI and handles user interactions |
| `PCI_SL_DashboardApproval.js` | Suitelet | Serves the main dashboard HTML page |
| `PCI_SL_getDashboardApprovalData.js` | Suitelet | Fetches pending transactions and financial metrics through saved search. |
| `PCI_SL_approveTransactions.js` | Suitelet | Processes bulk approvals and triggers workflow transitions |

## How It Works

1. User opens the dashboard (served by `PCI_SL_DashboardApproval.js`)
2. Tabulator.js table loads with data fetched from `PCI_SL_getDashboardApprovalData.js`
3. User selects transactions and clicks Approve
4. `PCI_SL_approveTransactions.js` processes the selection and triggers NetSuite workflow state changes asynchronously

## Tech Stack

- **SuiteScript 2.1** — server-side NetSuite scripting
- **Tabulator.js** — interactive data table UI
- **N/search** — transaction data retrieval
- **N/workflow** — approval state transitions
