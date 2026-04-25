/**
 * @NScriptType Suitelet
 * @NApiVersion 2.1
 */

const main = (serverWidget) => {
  const createForm = () => {
    const form = serverWidget.createForm({
      title: "Approvals Dashboard",
    });

    form.clientScriptModulePath = "./PCI_CS_renderMDApprovalDashboard.js";

    const inlineHTMLField = form.addField({
      id: "custpage_approval_dashboard_html_container",
      label: "Approval_Dashboard_HTML_Container",
      type: serverWidget.FieldType.INLINEHTML,
    });

    form.addButton({
      id: "custpage_approve_button",
      label: "Approve",
      functionName: "onApproveButtonClick",
    });

    form.addButton({
      id: "custpage_bill_ipc_button",
      label: "IPC/Bill",
      functionName: "onBillIPCButtonClick",
    });

    form.addButton({
      id: "custpage_po_pc_button",
      label: "PO/Contract",
      functionName: "onPOContractButtonClick",
    });

    return { form, inlineHTMLField };
  };

  const onRequest = (context) => {
    if (context.request.method != "GET") {
      context.response.write("Only GET requests are allowed");
      return;
    }

    const { form, inlineHTMLField } = createForm();

    context.response.writePage(form);
  };

  return { onRequest };
};

define(["N/ui/serverWidget"], main);
