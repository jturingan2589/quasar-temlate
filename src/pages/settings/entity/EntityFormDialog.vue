<template>
  <q-dialog v-model="isOpen">
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">
          {{ editData ? "Edit Entity" : "Add Entity" }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="saveEntity" class="q-gutter-md">
          <BaseInput
            v-model="form.name"
            label="Name"
            outlined
            dense
            :rules="[rules.required]"
          />

          <BaseInput
            v-model="form.description"
            label="Description"
            outlined
            dense
          />

          <BaseInput
            v-model="form.entity_code"
            label="Entity Code"
            outlined
            dense
            :rules="[rules.required]"
          />

          <q-select
            v-model="form.status"
            label="Status"
            :options="statusOptions"
            outlined
            dense
            emit-value
            map-options
            :rules="[rules.required]"
          />

          <div class="row justify-end q-gutter-sm q-mt-md">
            <q-btn flat label="Cancel" color="grey" @click="close" />
            <q-btn
              label="Save"
              color="primary"
              type="submit"
              :loading="saving"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { ApiService } from "src/services/api";
import { useValidationRules } from "src/composable/useValidationRules";
import useNotify from "src/composable/useNotify";
const { success, error } = useNotify();

const props = defineProps<{
  modelValue: boolean;
  editData: any | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "saved"): void;
}>();

const { rules } = useValidationRules();
const isOpen = ref(props.modelValue);
const saving = ref(false);

const form = reactive({
  id: "",
  name: "",
  description: "",
  entity_code: "",
  status: "active",
});

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// -----------------------------
// Watchers
// -----------------------------
watch(
  () => props.modelValue,
  (val) => (isOpen.value = val),
);
watch(isOpen, (val) => emit("update:modelValue", val));

watch(
  () => props.editData,
  (val) => {
    if (val) {
      Object.assign(form, val);
    } else {
      Object.assign(form, {
        id: "",
        name: "",
        description: "",
        entity_code: "",
        status: "active",
      });
    }
  },
);

const saveEntity = async () => {
  saving.value = true;
  try {
    if (form.id) {
      // Update entity
      await ApiService.put(`/entities/${form.id}`, form);
      success("Entity updated successfully!");
    } else {
      // Create entity
      await ApiService.post("/entities", form);
      success("Entity updated successfully!");
    }
    emit("saved");
    close();
  } catch (err: any) {
    console.error("Error saving entity:", err);
    error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while saving entity",
    );
  } finally {
    saving.value = false;
  }
};

const close = () => {
  isOpen.value = false;
};
</script>
