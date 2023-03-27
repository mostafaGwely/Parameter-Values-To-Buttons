/* global tableau Vue */

let app = new Vue({
    el: "#app",
    data: {
      sourceParam: null,
      params: [],
      values: []
    },
    methods: {
      save: async function() {
        tableau.extensions.settings.set("sourceParam", this.sourceParam);
        await tableau.extensions.settings.saveAsync();
        tableau.extensions.ui.closeDialog("");
      },
      getParams: async function() {
        const params = await
          tableau.extensions.dashboardContent.dashboard.getParametersAsync();
        this.params = [...params.map(p => p.name)];
  
        const settings = tableau.extensions.settings.getAll();
        this.sourceParam = params.find(
          p => p.name === settings.sourceParam
        )
          ? settings.sourceParam
          : "";
      },
      getFields: async function(sourceParamName) {
        const params = await
          tableau.extensions.dashboardContent.dashboard.getParametersAsync();
        const param = params.find(p => p.name === sourceParamName);
        const values = await param.allowableValues.allowableValues;
        this.values = [...values.map(val => val.value)];
        tableau.extensions.settings.set("values", this.values.join('&'));

      }
    },
    watch: {
      sourceParam: function(sourceParamName) {
        this.getFields(sourceParamName);
      }
    },
    created: async function() {
      await tableau.extensions.initializeDialogAsync();
      this.getParams();
    }
  });
  