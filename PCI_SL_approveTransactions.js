/**
 * @NScriptType Suitelet
 * @NApiVersion 2.1
 */

const main = (workflow, record) => {
  const parseRequestBody = (requestBody) => {
    try {
      return { success: true, data: JSON.parse(requestBody) };
    } catch (e) {
      return {
        success: false,
        message: "Failed to parse request body as JSON.",
        error: e.toString(),
      };
    }
  };

  const transitionWorkflowIntoApprovedState = (transactionData) => {
    const { internalId, workflowName, workflowAction, recordType } = transactionData;

    log.debug({
        title: "Preparing to Transition Workflow",
        details: `Preparing to transition transaction (ID: ${internalId}) into approved state. Workflow: ${workflowName}, Action: ${workflowAction}, Record Type: ${recordType}`
    })


    log.debug({
        title: "Attempting Workflow Transition",
        details: transactionData
    })

    try {
      workflow.trigger({
        recordId: internalId,
        recordType: recordType,
        workflowId: workflowName,
        actionId: workflowAction,
      });

      return { success: true };
    } catch (e) {
        log.error({
            title: "Workflow Transition Failed",
            details: `Failed to transition transaction (ID: ${internalId}) into approved state. Error: ${e.toString()}`,
        });
      return {
        success: false,
        message: `Failed to transition transaction (ID: ${internalId}) into approved state.`,
        error: e,
      };
    }
  };


  const prepareResponse = (transitionFailures) => {
    if (transitionFailures.length === 0) {
      return {
        success: true,
        message: "All transactions were successfully transitioned into approved state.",
      };
    }

    return {
      success: false,
      message: "Some transactions failed to transition into approved state.",
      failures: transitionFailures,
    };

  }

  const onRequest = (context) => {
    const parsingResponse = parseRequestBody(context.request.body);

    if (!parsingResponse.success){
      context.response.write(JSON.stringify(parsingResponse));
      return;
    }

    let { data } = parsingResponse;

    let transitionFailures = [];
    data.forEach((transactionRow)=>{
        const transitionResponse = transitionWorkflowIntoApprovedState(transactionRow)

        if(!transitionResponse.success)
            transitionFailures.push({
                internalId: transactionRow.internalId,
                tranId: transactionRow.tranId,
                message: transitionResponse.message,
                error: transitionResponse.error,
            })
    })

    const response = prepareResponse(transitionFailures);
    context.response.write(JSON.stringify(response));
  };

  return {
    onRequest,
  }
};

define(["N/workflow", "N/record"], main);
