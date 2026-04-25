/**
 * @NScriptType ClientScript
 * @NApiVersion 2.1
 */

const main = (https) => {
  const APPROVAL_DASHBOARD_DATA_SUITELET_ID =
    "customscript_pci_sl_get_md_approv_data";
  const APPROVAL_DASHBOARD_DATA_SUITELET_DEPLOYMENT_ID =
    "customdeploy_pci_sl_get_md_approv_data";

  let currentType = "VendBill";
  let currentColumns = null;

  const APPROVE_TRANSACTIONS_SUITELET_ID =
    "customscript_pci_sl_approve_transactions";
  const APPROVE_TRANSACTIONS_SUITELET_DEPLOYMENT_ID =
    "customdeploy_pci_sl_app_transactions_1";

  const currencyFormatter = (cell) => {
    const value = parseFloat(cell.getValue());
    if (isNaN(value)) return "";
    const formatted = value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return `<span style="color:${value < 0 ? "#721c24" : "inherit"};">${formatted}</span>`;
  };

  const COLUMNS_FOR_PO = [
    {
      title: "",
      field: "selection",
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerHozAlign: "center",
      headerSort: false,
    },
    {
      title: "Doc#",
      field: "documentNumber",
      hozAlign: "left",
      headerHozAlign: "center",
      width: 100,
      variableHeight: true,
      headerSort: true,
      formatter: (cell) => {
        const documentNumber = cell.getValue();
        const id = cell.getRow().getData().internalId;
        if (!documentNumber || !id) return "";
        return `<a href="/app/accounting/transactions/purchord.nl?id=${id}" target="_blank"
        style="color:#005587; text-decoration:underline; white-space:normal; word-break:break-word; display:block;">${documentNumber}</a>`;
      },
    },
    {
      title: "Tran#",
      field: "transactionNumber",
      hozAlign: "center",
      headerHozAlign: "center",
      headerSort: true,
    },
    {
      title: "Date",
      field: "tranDate",
      hozAlign: "center",
      headerHozAlign: "center",
      headerSort: true,
    },
    {
      title: "Vendor",
      field: "mainLineName",
      hozAlign: "left",
      headerHozAlign: "left",
      formatter: "textarea",
      width: 200,
      headerSort: true,
    },
    {
      title: "Project",
      field: "project",
      hozAlign: "left",
      headerHozAlign: "left",
      headerSort: true,
    },
    {
      title: "Form",
      field: "customForm",
      hozAlign: "left",
      headerHozAlign: "left",
      headerSort: true,
    },
    {
      title: "Memo",
      field: "memo",
      hozAlign: "left",
      headerHozAlign: "left",
      formatter: "textarea",
      width: 200,
    },
    {
      title: "Amount",
      field: "amount",
      hozAlign: "right",
      headerHozAlign: "right",
      formatter: currencyFormatter,
      minWidth: 150,
    },
    {
      title: "Mobilization Advance",
      columns: [
        {
          title: "%",
          field: "mobilizationAdvancePercent",
          hozAlign: "left",
          headerHozAlign: "center",
          minWidth: 100,
        },
        {
          title: "Amount",
          field: "mobilizationAdvanceAmount",
          hozAlign: "right",
          headerHozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 100,
        },
      ],
    },
    {
      title: "Retention Money",
      width: 400,
      columns: [
        {
          title: "%",
          field: "retentionMoneyPercentage",
          hozAlign: "left",
          headerHozAlign: "center",
        },
        {
          title: "Amount",
          field: "retentionMoneyAmount",
          hozAlign: "right",
          headerHozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
        {
          title: "Defect Liability Period",
          field: "defectLiabilityPeriod",
          hozAlign: "center",
          headerHozAlign: "center",
          minWidth: 200,
        },
      ],
    },
  ];

  const COLUMNS_FOR_BILL = [
    {
      title: "",
      field: "selection",
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerHozAlign: "center",
      headerSort: false,
    },
    {
      title: "Doc#",
      field: "tranId",
      hozAlign: "left",
      headerHozAlign: "center",
      width: 100,
      variableHeight: true,
      headerSort: true,
      formatter: (cell) => {
        const tranId = cell.getValue();
        const id = cell.getRow().getData().internalId;
        if (!tranId || !id) return "";
        return `<a href="/app/accounting/transactions/vendbill.nl?id=${id}" target="_blank" 
      style="color:#005587; text-decoration:underline; white-space:normal; word-break:break-word; display:block;">${tranId}</a>`;
      },
    },
    {
      title: "Tran#",
      field: "transactionNumber",
      hozAlign: "center",
      headerHozAlign: "center",
      headerSort: true,
    },
    {
      title: "Date",
      field: "tranDate",
      hozAlign: "center",
      headerHozAlign: "center",
      headerSort: true,
    },
    {
      title: "Vendor",
      field: "mainLineName",
      hozAlign: "left",
      headerHozAlign: "left",
      formatter: "textarea",
      width: 200,
      headerSort: true,
    },
    {
      title: "Project",
      field: "project",
      hozAlign: "left",
      headerHozAlign: "left",
      headerSort: true,
    },
    {
      title: "Form",
      field: "customForm",
      hozAlign: "left",
      headerHozAlign: "left",
      headerSort: true,
    },
    {
      title: "Memo",
      field: "memo",
      hozAlign: "left",
      headerHozAlign: "left",
      formatter: "textarea",
      width: 200,
    },
    {
      title: "Total Value of Contract",
      field: "totalValueOfContract",
      hozAlign: "right",
      headerHozAlign: "right",
      formatter: currencyFormatter,
      width: 120,
    },
    {
      title: "Work Done",
      columns: [
        {
          title: "Prev. Bills",
          field: "workDonePreviousBills",
          hozAlign: "right",
          headerHozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 150,
        },
        {
          title: "Curr. Bill",
          field: "workDoneCurrentBill",
          hozAlign: "right",
          headerHozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
        {
          title: "Gross",
          field: "totalGrossAmount",
          hozAlign: "right",
          headerHozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
      ],
    },

    {
      title: "Mobilization Advance",
      columns: [
        {
          title: "%",
          field: "mobilizationAdvancePercent",
          hozAlign: "left",
        },
        {
          title: "Amount",
          field: "mobilizationAdvanceAmount",
          hozAlign: "right",
          formatter: currencyFormatter,
        },
        {
          title: "Paid %",
          field: "mobilizationAdvancePaidPercentage",
          hozAlign: "left",
        },
        {
          title: "Paid Amount",
          field: "mobilizationAdvancePaidAmount",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
      ],
    },
    {
      title: "Mobilization Advance Deduction",
      columns: [
        {
          title: "Amt. Prev. Bill",
          field: "mobAdvDedAmountPrevBill",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
        {
          title: "Amt. Curr. Bill",
          field: "mobAdvDedAmountCurrentBill",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
        {
          title: "Gross Amount",
          field: "mobAdvDedGrossAmount",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
      ],
    },
    {
      title: "Retention Money",
      columns: [
        {
          title: "%",
          field: "retentionMoneyPercentage",
          hozAlign: "left",
          formatter: currencyFormatter,
        },
        {
          title: "Release (months)",
          field: "retentionReleaseAfterMonths",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
        {
          title: "Amt. Prev. Bill",
          field: "retentionAmountPrevBill",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
        {
          title: "Amt. Curr. Bill",
          field: "retentionAmountCurrentBill",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
        {
          title: "Gross Amount",
          field: "retentionGrossAmount",
          hozAlign: "right",
          formatter: currencyFormatter,
          minWidth: 200,
        },
      ],
    },

    {
      title: "Net Payable",
      field: "totalPayable",
      hozAlign: "right",
      headerHozAlign: "right",
      formatter: currencyFormatter,
      minWidth: 200,
    },
  ];

  const removePersistentPressedState = (buttonId) => {
    const btn = document.getElementById(buttonId);

    if (!btn) {
      console.warn(`Element with ID '${buttonId}' not found.`);
      return;
    }

    btn.style.removeProperty("background-color");
    btn.style.removeProperty("background-image");
    btn.style.removeProperty("background");
    btn.style.removeProperty("color");
    btn.style.removeProperty("border");
    btn.style.removeProperty("transform");
    btn.style.removeProperty("cursor");
  };

  const applyPersistentPressedState = (buttonId) => {
    const btn = document.getElementById(buttonId);

    if (!btn) {
      console.warn(`Element with ID '${buttonId}' not found.`);
      return;
    }

    // Inline styles override EVERYTHING — no specificity battle
    btn.style.setProperty("background-color", "#4a6fa5", "important");
    btn.style.setProperty("background-image", "none", "important");
    btn.style.setProperty("background", "#4a6fa5", "important");
    btn.style.setProperty("color", "#ffffff", "important");
    btn.style.setProperty("border", "2.5px solid #4a6fa5", "important");
    // btn.style.setProperty(
    //   "box-shadow",
    //   "inset 0 3px 6px rgba(0,0,0,0.25)",
    //   "important",
    // );
    // btn.style.setProperty("transform", "translateY(1px)", "important");
    btn.style.setProperty("cursor", "default", "important");
  };

  const renderApprovalResult = (response, onClose) => {
    const MODAL_ID = "mdapproval-result-modal";
    const existing = document.getElementById(MODAL_ID);
    if (existing) existing.remove();

    const isSuccess = response.success;
    const hasFailures = response.failures && response.failures.length > 0;

    const failureRows = hasFailures
      ? response.failures
          .map(
            (f) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #dee2e6; font-weight: 600; white-space: nowrap;">
              <a href="/app/accounting/transactions/vendbill.nl?id=${f.internalId}" target="_blank"
                style="color:#005587; text-decoration:underline;">${f.tranId}</a>
            </td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #dee2e6; color: #721c24; font-size: 13px;">
              ${f.error?.cause?.message || f.message}
            </td>
          </tr>`,
          )
          .join("")
      : "";

    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.innerHTML = `
    <style>
      #mdapproval-result-modal {
        position: fixed;
        inset: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Open Sans', Helvetica, sans-serif;
      }

      .mdapproval-modal-box {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        min-width: 380px;
        max-width: 680px;
        width: 90vw;
        overflow: hidden;
      }

      .mdapproval-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        background: ${isSuccess ? "#d4edda" : "#f8d7da"};
        border-bottom: 1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"};
      }

      .mdapproval-modal-header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .mdapproval-modal-icon {
        font-size: 22px;
        line-height: 1;
      }

      .mdapproval-modal-title {
        font-size: 18px;
        font-weight: 700;
        color: ${isSuccess ? "#155724" : "#721c24"};
        margin: 0;
      }

      .mdapproval-modal-close {
        background: none;
        border: none;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
        color: ${isSuccess ? "#155724" : "#721c24"};
        opacity: 0.7;
        padding: 0 4px;
      }

      .mdapproval-modal-close:hover { opacity: 1; }

      .mdapproval-modal-body {
        padding: 18px 20px;
      }

      .mdapproval-modal-message {
        font-size: 16px;
        color: #333;
        margin: 0 0 ${hasFailures ? "16px" : "0"} 0;
      }

      .mdapproval-failures-label {
        font-size: 14px;
        font-weight: 700;
        color: #939496;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        margin-bottom: 8px;
      }

      .mdapproval-failures-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 15px;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        overflow: hidden;
      }

      .mdapproval-failures-table thead th {
        background: #4a6fa5;
        color: #fff;
        font-weight: 700;
        padding: 8px 12px;
        text-align: center; 
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        position: sticky;
        top: 0;
      }

      .mdapproval-modal-footer {
        display: flex;
        justify-content: flex-end;
        padding: 12px 20px;
        border-top: 1px solid #dee2e6;
        background: #f8f9fa;
      }

      .mdapproval-modal-ok-btn {
        padding: 7px 24px;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 700;
        border: 1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"};
        background: ${isSuccess ? "#d4edda" : "#f8d7da"};
        color: ${isSuccess ? "#155724" : "#721c24"};
        cursor: pointer;
      }

      .mdapproval-modal-ok-btn:hover {
        background: ${isSuccess ? "#b8dfc4" : "#f1b0b7"};
      }

      
    </style>

    <div class="mdapproval-modal-box">
      <div class="mdapproval-modal-header">
        <div class="mdapproval-modal-header-left">
            <span class="mdapproval-modal-icon" style="
              display: inline-block;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${isSuccess ? "#155724" : "#721c24"};
              flex-shrink: 0;
            "></span>
          <p class="mdapproval-modal-title">${isSuccess ? "Approval Successful" : "Approval Failed"}</p>
        </div>
        <button class="mdapproval-modal-close" id="mdapproval-modal-close-btn">✕</button>
      </div>

      <div class="mdapproval-modal-body">
        <p class="mdapproval-modal-message">${response.message}</p>

        ${
          hasFailures
            ? `
          <div class="mdapproval-failures-label">Failed Transactions</div>
          <table class="mdapproval-failures-table">
            <thead>
              <tr>
                <th style="width: 120px;">Tran ID</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>${failureRows}</tbody>
          </table>
        `
            : ""
        }
      </div>

      <div class="mdapproval-modal-footer">
        <button class="mdapproval-modal-ok-btn" id="mdapproval-modal-ok-btn">OK</button>
      </div>
    </div>
  `;

    document.body.appendChild(modal);

    const close = () => {
      document.getElementById(MODAL_ID)?.remove();
      if (onClose) onClose();
    };
    document
      .getElementById("mdapproval-modal-close-btn")
      .addEventListener("click", close);
    document
      .getElementById("mdapproval-modal-ok-btn")
      .addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
  };

  const renderLoader = (show) => {
    const LOADER_ID = "mdapproval-loader-overlay";

    if (!show) {
      const existing = document.getElementById(LOADER_ID);
      if (existing) existing.remove();
      return;
    }

    if (document.getElementById(LOADER_ID)) return;

    const loader = document.createElement("div");
    loader.id = LOADER_ID;
    loader.innerHTML = `
    <style>
      #mdapproval-loader-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(255, 255, 255, 0.75);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 40vh;
        gap: 16px;
        font-family: 'Open Sans', Helvetica, sans-serif;
      }

      .mdapproval-spinner {
        width: 48px;
        height: 48px;
        border: 5px solid #dee2e6;
        border-top-color: #939496;
        border-radius: 50%;
        animation: mdapproval-spin 0.8s linear infinite;
      }

      .mdapproval-loader-text {
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        letter-spacing: 0.5px;
      }

      @keyframes mdapproval-spin {
        to { transform: rotate(360deg); }
      }
    </style>

    <div class="mdapproval-spinner"></div>
    <span class="mdapproval-loader-text">Loading...</span>
  `;

    document.body.appendChild(loader);
  };

  const callSuiteletAsync = async (scriptId, deploymentId, body) => {
    let DashboardApprovalData = await https.requestSuitelet.promise({
      method: https.Method.POST,
      scriptId: scriptId,
      deploymentId: deploymentId,
      body: JSON.stringify(body || {}),
    });

    return DashboardApprovalData.body;
  };

  const getMDDashboardApprovalData = async (type) => {
    const data = await callSuiteletAsync(
      APPROVAL_DASHBOARD_DATA_SUITELET_ID,
      APPROVAL_DASHBOARD_DATA_SUITELET_DEPLOYMENT_ID,
      { type: type },
    );

    // console.log("MDDashboardApprovalData", JSON.parse(data));
    return JSON.parse(data);
  };

  const renderTable = (tableData, columns) => {
    const container = document.getElementById(
      "custpage_approval_dashboard_html_container_val",
    );
    if (!container) {
      console.error(
        "CRITICAL ERROR: Could not find the inline HTML container.",
      );
      return;
    }

    if (window.mdApprovalTable && window.Tabulator) {
      window.mdApprovalTable.setColumns(columns);
      window.mdApprovalTable.setData(tableData);
      return;
    }

    container.innerHTML = `
      <link href="https://unpkg.com/tabulator-tables@5.5.2/dist/css/tabulator.min.css" rel="stylesheet">

      <style>
        .mdapproval-wrapper {
          width: 100%;
          max-width: calc(100vw - 80px);
          box-sizing: border-box;
        }

        #mdapproval-report {
          margin-top: 15px;
          font-family: 'Open Sans', Helvetica, sans-serif;
          font-size: 13px;
          max-width: calc(100vw - 80px);
          width: calc(100vw - 80px);
        }

        #mdapproval-report .tabulator-row {
          border-bottom: 1px solid #b0bec5;
        }

        #mdapproval-report .tabulator-col-title {
          font-weight: bold !important;
          color: #333333;
          font-size: 18px !important;
          text-align: center;
        }

        #mdapproval-report .tabulator-cell {
          white-space: normal !important;
          word-break: break-word;
          vertical-align: middle;
        }

        #mdapproval-report .tabulator-header .tabulator-col {
          background-color: #4a6fa5 !important;
        }

        #mdapproval-report .tabulator-header .tabulator-col-group {
          background-color: #4a6fa5 !important;
        }

        #mdapproval-report .tabulator-header .tabulator-col .tabulator-col-content {
          padding: 12px 10px !important;
        }

        #mdapproval-report .tabulator-header .tabulator-col .tabulator-col-title {
          font-weight: bold !important;
          color: #ffffff;
          width: 100% !important;
          text-align: center !important;
          white-space: normal !important;
           text-overflow: unset !important
           overflow: visible !important; 
          font-size: 13px !important;
        }

        #mdapproval-report .tabulator-placeholder span {
          font-weight: bold;
          color: #666666;
          font-size: 14px;
          padding: 20px;
        }

        #mdapproval-report .tabulator-row:nth-child(even) {
          background-color: #f5fbfd;
        }

        .approve-btn {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: bold;
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          cursor: pointer;
          white-space: nowrap;
        }

        #mdapproval-report .tabulator-cell input[type="checkbox"],
        #mdapproval-report .tabulator-header input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #4a6fa5; /* matches your header color */
        }

        #mdapproval-report .tabulator-row.tabulator-row-even,
        #mdapproval-report .tabulator-row.tabulator-row-odd {
          background-color: #ffffff !important;
        }

        .approve-btn:hover {
          background: #b8dfc4;
        }

        #mdapproval-report .tabulator-header .tabulator-frozen-rows-holder,
#mdapproval-report .tabulator-col.tabulator-col-group[tabulator-field=""],
#mdapproval-report .tabulator-header-gap {
  display: none !important;
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  border: none !important;
}

        #mdapproval-report .tabulator-tableholder { background-color: #ffffff !important; }
    #mdapproval-report { background-color: #ffffff !important; }


                #mdapproval-report .tabulator-page[data-page="prev"],
        #mdapproval-report .tabulator-page[data-page="next"],
        #mdapproval-report .tabulator-page[data-page="first"],
        #mdapproval-report .tabulator-page[data-page="last"] {
          display: none !important;
        }
      </style>

      <div class="mdapproval-wrapper">
        <div id="mdapproval-report"></div>
      </div>
    `;

    const loadScript = (url, callback) => {
      if (window.Tabulator) {
        callback();
        return;
      }
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = () => {
        if (callback) callback();
      };
      document.head.appendChild(script);
    };

    const mergedCell = (content) => `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 36px;
        padding: 6px 8px;
        box-sizing: border-box;
        text-align: center;
      ">${content}</div>
    `;

    const initTabulator = () => {
      window.mdApprovalTable = new Tabulator("#mdapproval-report", {
        data: tableData,
        layout: "fitDataFill",
        selectableRows: true,
        placeholder: "No pending approvals found",
        pagination: "local",
        paginationSize: 5000,
        resizableColumns: false,
        headerWordWrap: true,
        height: "70vh",
        columns: columns,
        columnDefaults: {
          headerSort: false,
        },
        footerElement: `<div style='text-align:center; padding:5px; font-size:12px; color:#666;'>Total Rows: <span>${tableData.length.toLocaleString()}</span></div>`,
      });

      window.mdApprovalTable.on("dataProcessed", function () {
        const footer = document.querySelector(
          "#mdapproval-report .tabulator-footer-contents",
        );
        if (footer) {
          const count = window.mdApprovalTable.getDataCount();
          footer.innerHTML = `<div style='text-align:center; padding:5px; font-size:12px; color:#666;'>Total Rows: <span>${count.toLocaleString()}</span></div>`;
        }
      });

      window.mdApprovalTable.on("rowSelectionChanged", function (data, rows) {
        window.toggleApproveButton(data.length === 0);
      });
    };

    loadScript(
      "https://unpkg.com/tabulator-tables@5.5.2/dist/js/tabulator.min.js",
      initTabulator,
    );
  };

  const toggleApproveButton = (disable) => {
    var btn = document.getElementById("custpage_approve_button");
    if (!btn) return;

    btn.style.pointerEvents = disable ? "none" : "";
    btn.style.opacity = disable ? "0.5" : "1";
  };

  window.toggleApproveButton = toggleApproveButton;

  const pageInit = async (context) => {
    currentType = "VendBill";
    currentColumns = COLUMNS_FOR_BILL;
    renderLoader(true);
    window.toggleApproveButton(true);
    const data = await getMDDashboardApprovalData("VendBill");
    renderTable(data, COLUMNS_FOR_BILL);
    applyPersistentPressedState("custpage_bill_ipc_button");
    renderLoader(false);
  };

  const onApproveButtonClick = async () => {
    renderLoader(true);
    // console.log("Approve button clicked");

    const selectedRows = window.mdApprovalTable.getSelectedData();
    console.log("Selected rows:", selectedRows);

    // if (selectedRows.length === 0) {
    //   // console.warn("Approve button clicked but no rows are selected.");
    //   return;
    // }

    const response = await callSuiteletAsync(
      APPROVE_TRANSACTIONS_SUITELET_ID,
      APPROVE_TRANSACTIONS_SUITELET_DEPLOYMENT_ID,
      selectedRows,
    );

    renderApprovalResult(JSON.parse(response), async () => {
      renderLoader(true);
      const freshData = await getMDDashboardApprovalData(currentType); 
      window.mdApprovalTable.setColumns(currentColumns); 
      window.mdApprovalTable.setData(freshData);
      renderLoader(false);
    });
  };

  const onBillIPCButtonClick = async () => {
    currentType = "VendBill";
    currentColumns = COLUMNS_FOR_BILL;
    applyPersistentPressedState("custpage_bill_ipc_button");
    removePersistentPressedState("custpage_po_pc_button");
    renderLoader(true);
    const MDApprovalDataForBill = await getMDDashboardApprovalData("VendBill");
    renderTable(MDApprovalDataForBill, COLUMNS_FOR_BILL);
    renderLoader(false);
  };

  const onPOContractButtonClick = async () => {
    currentType = "PurchOrd";
    currentColumns = COLUMNS_FOR_PO;
    applyPersistentPressedState("custpage_po_pc_button");
    removePersistentPressedState("custpage_bill_ipc_button");
    renderLoader(true);
    const MDApprovalDataForPO = await getMDDashboardApprovalData("PurchOrd");
    console.log("MDApprovalDataForPO", MDApprovalDataForPO);
    renderTable(MDApprovalDataForPO, COLUMNS_FOR_PO);
    renderLoader(false);
  };

  return {
    pageInit,
    onApproveButtonClick,
    onBillIPCButtonClick,
    onPOContractButtonClick,
  };
};

define(["N/https"], main);
