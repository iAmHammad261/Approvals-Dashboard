/**
 * @NScriptType Suitelet
 * @NApiVersion 2.1
 */

const WORKFLOW_TO_APPROVED_ACTION_MAP = {
  249: "workflowaction3975",
  250: "workflowaction3975",
  251: "workflowaction3975",
  252: "workflowaction3975",
  253: "workflowaction3975",
  254: "workflowaction3975",
  255: "workflowaction3975",
  256: "workflowaction3975",
  124: "workflowaction3251"
};

const getMDApprovalDataForPO = (search, log, record) => {
  const poSearchFilters = [
    ["type", "anyof", "PurchOrd"],
    "AND",
    ["nextapprover", "anyof", "11340"],
    "AND",
    ["mainline", "is", "T"],
    "AND",
    ["workflow.workflow", "anyof", "249", "250", "251", "252", "253", "124"],
    "AND",
    ["workflow.currentstate", "anyof", "977", "974", "968", "959", "952", "771"],
  ];

  const poSearchColInternalId = search.createColumn({
    name: "internalid",
  });

  const poSearchColDocumentNumber = search.createColumn({
    name: "tranid",
  });

  const poSearchColTransactionNumber = search.createColumn({
    name: "transactionnumber",
  });

  const poSearchColTranDate = search.createColumn({
    name: "trandate",
    sort: search.Sort.DESC,
  });

  const poSearchColMainLineName = search.createColumn({
    name: "mainname",
  });

  const poSearchColProject = search.createColumn({ name: "custbody1" });

  const poSearchColCustomForm = search.createColumn({
    name: "customform",
  });

  const poSearchColMemo = search.createColumn({ name: "memo" });

  const poSearchColAmount = search.createColumn({ name: "amount" });

  const poSearchColMobilizationAdvancePercent = search.createColumn({
    name: "custbody_mobilization_advance_perctge",
  });

  const poSearchColMobilizationAdvanceAmount = search.createColumn({
    name: "custbody_mobilization_advance_amount",
  });

  const poSearchColRetentionMoneyPercentage = search.createColumn({
    name: "custbody_retention_money_percentage",
  });

  const poSearchColRetentionMoneyAmount = search.createColumn({
    name: "custbody_retention_money_amount",
  });

  const poSearchDefectLiabilityPeriod = search.createColumn({
    name: "custbody_dlp",
  });

  const poSearchColWorkflowName = search.createColumn({
    name: "workflow",
    join: "workflow",
  });

  const poSearch = search.create({
    type: "purchaseorder",
    filters: poSearchFilters,
    columns: [
      poSearchColInternalId,
      poSearchColDocumentNumber,
      poSearchColTransactionNumber,
      poSearchColTranDate,
      poSearchColMainLineName,
      poSearchColProject,
      poSearchColCustomForm,
      poSearchColMemo,
      poSearchColAmount,
      poSearchColMobilizationAdvancePercent,
      poSearchColMobilizationAdvanceAmount,
      poSearchColRetentionMoneyPercentage,
      poSearchColRetentionMoneyAmount,
      poSearchDefectLiabilityPeriod,
      poSearchColWorkflowName,
    ],
  });

  let results = [];

  const poSearchPagedData = poSearch.runPaged({
    pageSize: 1000,
  });

  for (let i = 0; i < poSearchPagedData.pageRanges.length; i++) {
    const poSearchPage = poSearchPagedData.fetch({ index: i });

    poSearchPage.data.forEach(function (result) {
      const internalId = result.getValue(poSearchColInternalId);
      const documentNumber = result.getValue(poSearchColDocumentNumber);
      const transactionNumber = result.getValue(poSearchColTransactionNumber);
      const tranDate = result.getValue(poSearchColTranDate);
      const mainLineName = result.getText(poSearchColMainLineName);
      const project = result.getText(poSearchColProject);
      const customForm = result.getText(poSearchColCustomForm);
      const memo = result.getValue(poSearchColMemo);
      const amount = result.getValue(poSearchColAmount);
      const mobilizationAdvancePercent = result.getValue(
        poSearchColMobilizationAdvancePercent,
      );
      const mobilizationAdvanceAmount = result.getValue(
        poSearchColMobilizationAdvanceAmount,
      );
      const retentionMoneyPercentage = result.getValue(
        poSearchColRetentionMoneyPercentage,
      );
      const retentionMoneyAmount = result.getValue(
        poSearchColRetentionMoneyAmount,
      );
      const defectLiabilityPeriod = result.getValue(
        poSearchDefectLiabilityPeriod,
      );

      const workflowName = result.getValue(poSearchColWorkflowName);

      results.push({
        recordType: record.Type.PURCHASE_ORDER,
        internalId,
        documentNumber,
        transactionNumber,
        tranDate,
        mainLineName,
        project,
        customForm: customForm == "Purchase Order" ? "PO" : "Contract",
        memo,
        amount,
        mobilizationAdvancePercent,
        mobilizationAdvanceAmount,
        retentionMoneyPercentage,
        retentionMoneyAmount,
        defectLiabilityPeriod,
        workflowName, 
        workflowAction: WORKFLOW_TO_APPROVED_ACTION_MAP[workflowName],
      });
    });
  }

  return results;
};

const getMDApprovalDataForBill = (search, log, record) => {
  const vendorBillSearchFilters = [
    ["type", "anyof", "VendBill"],
    "AND",
    ["nextapprover", "anyof", "11340"],
    "AND",
    ["mainline", "is", "T"],
    "AND",
    ["workflow.workflow", "anyof", "256", "255", "254"],
    "AND",
    ["workflow.currentstate", "anyof", "998", "991", "984"],
  ];

  const vendorBillSearchColInternalId = search.createColumn({
    name: "internalid",
  });
  const vendorBillSearchColProject = search.createColumn({ name: "custbody1" });
  const vendorBillSearchColCustomForm = search.createColumn({
    name: "customform",
  });
  const vendorBillSearchColTranDate = search.createColumn({
    name: "trandate",
    sort: search.Sort.DESC,
  });

  const vendorBillSearchColTransactionNumber = search.createColumn({
    name: "transactionnumber",
  });
  const vendorBillSearchColTranId = search.createColumn({ name: "tranid" });
  const vendorBillSearchColMainLineName = search.createColumn({
    name: "mainname",
  });
  const vendorBillSearchColMemo = search.createColumn({ name: "memo" });
  const vendorBillSearchTotalValueOfContract = search.createColumn({
    name: "custbody_total_value_of_contract",
  });
  const vendorBillSearchWorkDonePreviousBills = search.createColumn({
    name: "custbody_gross_amount_previous_bill",
  });
  const vendorBillSearchColWorkDoneCurrentBill = search.createColumn({
    name: "custbody_gross_amount_current_bill",
  });
  const vendorBillSearchColTotalGrossAmount = search.createColumn({
    name: "custbody_total_gross_amount",
  });
  const vendorBillSearchColTotalPayable = search.createColumn({
    name: "custbody_total_payable",
  });
  const vendorBillSearchColMobilizationAdvancePercent = search.createColumn({
    name: "custbody_mobilization_advance_perctge",
  });
  const vendorBillSearchColMobilizationAdvanceAmount = search.createColumn({
    name: "custbody_mobilization_advance_amount",
  });
  const vendorBillSearchColMobilizationAdvancePaidPercentage =
    search.createColumn({
      name: "custbody_mob_adv_paid_perctange",
    });
  const vendorBillSearchColMobilizationAdvancePaidAmount = search.createColumn({
    name: "custbody_mob_adv_paid_amount",
  });
  const vendorBillSearchColMobAdvDedAmountPrevBill = search.createColumn({
    name: "custbody_mad_amount_prev_bill",
  });
  const vendorBillSearchColMobAdvDedAmountCurrentBill = search.createColumn({
    name: "custbody_mad_amount_current_bill",
  });
  const vendorBillSearchColMobAdvDedGrossAmount = search.createColumn({
    name: "custbody_mad_gross_amount",
  });
  const vendorBillSearchColRetentionMoneyPercentage = search.createColumn({
    name: "custbody_retention_money_percentage",
  });
  const vendorBillSearchColRetentionReleaseAfterMonths = search.createColumn({
    name: "custbody_retention_release_after_month",
  });
  const vendorBillSearchColRetentionAmountPrevBill = search.createColumn({
    name: "custbody_retention_amount_prev_bill",
  });
  const vendorBillSearchColRetentionAmountCurrentBill = search.createColumn({
    name: "custbody_retention_amount_current_bill",
  });
  const vendorBillSearchColRetentionGrossAmount = search.createColumn({
    name: "custbody_retention_gross_amount",
  });

  const vendorBillSearchColAmount = search.createColumn({ name: "amount" });
  const vendorBillSearchColWorkflowInternalId = search.createColumn({
    name: "internalid",
    join: "workflow",
  });
  const vendorBillSearchColWorkflowName = search.createColumn({
    name: "workflow",
    join: "workflow",
  });

  const vendorBillSearch = search.create({
    type: "vendorbill",
    filters: vendorBillSearchFilters,
    columns: [
      vendorBillSearchColInternalId,
      vendorBillSearchColProject,
      vendorBillSearchColCustomForm,
      vendorBillSearchColTranDate,
      vendorBillSearchColTransactionNumber,
      vendorBillSearchColTranId,
      vendorBillSearchColMainLineName,
      vendorBillSearchColMemo,
      vendorBillSearchColAmount,
      vendorBillSearchColWorkflowInternalId,
      vendorBillSearchColWorkflowName,
      vendorBillSearchTotalValueOfContract,
      vendorBillSearchWorkDonePreviousBills,
      vendorBillSearchColWorkDoneCurrentBill,
      vendorBillSearchColTotalGrossAmount,
      vendorBillSearchColTotalPayable,
      vendorBillSearchColMobilizationAdvancePercent,
      vendorBillSearchColMobilizationAdvanceAmount,
      vendorBillSearchColMobilizationAdvancePaidPercentage,
      vendorBillSearchColMobilizationAdvancePaidAmount,
      vendorBillSearchColMobAdvDedAmountPrevBill,
      vendorBillSearchColMobAdvDedAmountCurrentBill,
      vendorBillSearchColMobAdvDedGrossAmount,
      vendorBillSearchColRetentionMoneyPercentage,
      vendorBillSearchColRetentionReleaseAfterMonths,
      vendorBillSearchColRetentionAmountPrevBill,
      vendorBillSearchColRetentionAmountCurrentBill,
      vendorBillSearchColRetentionGrossAmount,
    ],
  });

  const results = [];

  const vendorBillSearchPagedData = vendorBillSearch.runPaged({
    pageSize: 1000,
  });

  for (let i = 0; i < vendorBillSearchPagedData.pageRanges.length; i++) {
    const vendorBillSearchPage = vendorBillSearchPagedData.fetch({ index: i });

    vendorBillSearchPage.data.forEach(function (result) {
      const internalId = result.getValue(vendorBillSearchColInternalId);
      const project = result.getText(vendorBillSearchColProject);
      const tranDate = result.getValue(vendorBillSearchColTranDate);
      const transactionNumber = result.getValue(
        vendorBillSearchColTransactionNumber,
      );
      const tranId = result.getValue(vendorBillSearchColTranId);
      const mainLineName = result.getText(vendorBillSearchColMainLineName);
      const memo = result.getValue(vendorBillSearchColMemo);
      const amount = result.getValue(vendorBillSearchColAmount);
      const customForm =
        result.getText(vendorBillSearchColCustomForm) == "IPC" ? "IPC" : "Bill";
      const workflowInternalId = result.getValue(
        vendorBillSearchColWorkflowInternalId,
      );
      const workflowName = result.getValue(
        vendorBillSearchColWorkflowName,
      );
      const totalValueOfContract = result.getValue(
        vendorBillSearchTotalValueOfContract,
      );
      const workDonePreviousBills = result.getValue(
        vendorBillSearchWorkDonePreviousBills,
      );
      const workDoneCurrentBill = result.getValue(
        vendorBillSearchColWorkDoneCurrentBill,
      );
      const totalGrossAmount = result.getValue(
        vendorBillSearchColTotalGrossAmount,
      );
      const totalPayable = result.getValue(vendorBillSearchColTotalPayable);
      const mobilizationAdvancePercent = result.getValue(
        vendorBillSearchColMobilizationAdvancePercent,
      );
      const mobilizationAdvanceAmount = result.getValue(
        vendorBillSearchColMobilizationAdvanceAmount,
      );
      const mobilizationAdvancePaidPercentage = result.getValue(
        vendorBillSearchColMobilizationAdvancePaidPercentage,
      );
      const mobilizationAdvancePaidAmount = result.getValue(
        vendorBillSearchColMobilizationAdvancePaidAmount,
      );
      const mobAdvDedAmountPrevBill = result.getValue(
        vendorBillSearchColMobAdvDedAmountPrevBill,
      );
      const mobAdvDedAmountCurrentBill = result.getValue(
        vendorBillSearchColMobAdvDedAmountCurrentBill,
      );
      const mobAdvDedGrossAmount = result.getValue(
        vendorBillSearchColMobAdvDedGrossAmount,
      );
      const retentionMoneyPercentage = result.getValue(
        vendorBillSearchColRetentionMoneyPercentage,
      );
      const retentionReleaseAfterMonths = result.getValue(
        vendorBillSearchColRetentionReleaseAfterMonths,
      );
      const retentionAmountPrevBill = result.getValue(
        vendorBillSearchColRetentionAmountPrevBill,
      );
      const retentionAmountCurrentBill = result.getValue(
        vendorBillSearchColRetentionAmountCurrentBill,
      );
      const retentionGrossAmount = result.getValue(
        vendorBillSearchColRetentionGrossAmount,
      );

      results.push({
        recordType: record.Type.VENDOR_BILL,
        internalId,
        project,
        customForm,
        tranDate,
        transactionNumber,
        tranId,
        mainLineName,
        memo,
        amount,
        workflowInternalId,
        workflowName,
        totalValueOfContract,
        workDonePreviousBills,
        workDoneCurrentBill,
        totalGrossAmount,
        totalPayable,
        mobilizationAdvancePercent,
        mobilizationAdvanceAmount,
        mobilizationAdvancePaidPercentage,
        mobilizationAdvancePaidAmount,
        mobAdvDedAmountPrevBill,
        mobAdvDedAmountCurrentBill,
        mobAdvDedGrossAmount,
        retentionMoneyPercentage,
        retentionReleaseAfterMonths,
        retentionAmountPrevBill,
        retentionAmountCurrentBill,
        retentionGrossAmount,
        workflowAction: WORKFLOW_TO_APPROVED_ACTION_MAP[workflowName],
      });
    });
  }

  log.debug({
    title: "getMDApprovalData",
    details: "Total records found: " + results.length,
  });

  return results;
};

const main = (search, log, record) => {
  const onRequest = (context) => {
    if (context.request.method === "GET")
      context.response.write(
        JSON.stringify("This endpoint must be called with a POST request"),
      );

    const requestBody = JSON.parse(context.request.body);

    let { type } = requestBody;

    let approvalData;
    if (type == "VendBill")
      approvalData = getMDApprovalDataForBill(search, log, record);
    else if (type == "PurchOrd")
      approvalData = getMDApprovalDataForPO(search, log, record);

    context.response.write(JSON.stringify(approvalData));
  };

  return {
    onRequest,
  };
};

define(["N/search", "N/log", "N/record"], main);
