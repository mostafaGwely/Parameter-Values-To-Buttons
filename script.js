(function () {
tableau.extensions.initializeAsync({ configure: configure }).then(() => {
  work();
  let unregisterHandlerFunction = tableau.extensions.settings.addEventListener(tableau.TableauEventType.SettingsChanged, work);
 
  });
  function work(){
    
    if(tableau.extensions.settings.get("paramValues")){
      const paramValues = tableau.extensions.settings.get("paramValues").split('$');
      $("#paramValuesList").empty();
      paramValues.map(pV => createItemList(pV)).forEach(x => {  
        $("#paramValuesList").append(x);
        addOnClick(x);
      })
    }else{
      $("#paramValuesList").empty();
      $("#paramValuesList").text("Please Select a string-list Parameter: open configure to select it");
    }
    
  }
function addOnClick(x) {
  x.click(function(){
    const buttons = $('button[id^="paramValue"]');
    for (let index = 0; index < buttons.length; index++) {
      $(buttons[index]).removeClass('active');
      
    }
    tableau.extensions.dashboardContent.dashboard.findParameterAsync( tableau.extensions.settings.get("paramName") ).then(function(p) {
      p.changeValueAsync(x[0].innerText);
    });

    x.addClass('active')

  })
}
  function createItemList (itemListTitle) {
    return $(`<button type="button" class="btn btn-outline-danger item m-2" id="paramValue${itemListTitle}">${itemListTitle}</button>`); 
  }
  async function configure() {
    try {
      const url = "config.html";
      await tableau.extensions.ui.displayDialogAsync(url, "", {
        width: 500,
        height: 600
      });
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


})();