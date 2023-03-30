"use strict";

(function () {
  $(document).ready(function () {
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
      buildDialog();
    });
  });

  function buildDialog() {
    let dashboard = tableau.extensions.dashboardContent.dashboard;
    dashboard.getParametersAsync().then(function (ReturnedParameters) {
      ReturnedParameters.forEach(function (arrayItem) {
        const button = createItemList(arrayItem.name);
        button.click(function (b) {
          tableau.extensions.settings.set("paramName", arrayItem.name);
          tableau.extensions.settings.set(
            "paramValues",
            arrayItem.allowableValues.allowableValues
              .map((x) => x.value)
              .join("$")
          );
          closeDialog();
        });
        $("#parametersList").append(button);
      });
    });
  }

  function createItemList(itemListTitle) {
    return $(
      `<button type="button" class="btn btn-outline-success item m-2" id="buttonValue${itemListTitle}  ">${itemListTitle}</button>`
    );
  }

  function closeDialog() {
    tableau.extensions.settings
      .saveAsync()
      .then((result) => {
        tableau.extensions.ui.closeDialog("10");
      })
      .catch((error) => {
        // ...
        // ... code for error handling
      });
  }
})();
