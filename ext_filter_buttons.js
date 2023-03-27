/* global tableau Chart */

tableau.extensions.initializeAsync({ configure: configure }).then(() => {
    renderButtons();
  });
  
  async function configure() {
    try {
      const url = `${window.location.origin}/config.html`;
      await tableau.extensions.ui.displayDialogAsync(url, "", {
        width: 500,
        height: 600
      });
      renderButtons();
    } catch (error) {
      switch (error.errorCode) {
        case tableau.ErrorCodes.DialogClosedByUser:
          console.log("Dialog was closed by user.");
          break;
        default:
          console.error(error.message);
      }
    }
  }


function renderButtons() {
    const values = tableau.extensions.settings.get('values');
    document.getElementById("hhh").textContent(values);
  }