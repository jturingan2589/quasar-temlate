import AccessButton from "src/components/AccessButton.vue";
import BaseTable from "src/components/BaseTable.vue";
import BaseSelect from "src/components/BaseSelect.vue";
import BaseInput from "src/components/BaseInput.vue";
import PageHeader from "src/components/PageHeader.vue";
import ActionButton from "src/components/ActionButton.vue";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.component("AccessButton", AccessButton);
  app.component("PageHeader", PageHeader);
  app.component("BaseTable", BaseTable);
  app.component("BaseSelect", BaseSelect);
  app.component("BaseInput", BaseInput);
  app.component("ActionButton", ActionButton);
});
