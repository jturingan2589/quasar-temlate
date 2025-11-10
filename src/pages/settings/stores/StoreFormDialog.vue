<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card style="min-width: 500px">
      <q-card-section>
        <div class="text-h6">{{ editData ? "Edit Store" : "Add Store" }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="saveForm" class="q-gutter-md">
          <BaseInput outlined v-model="form.entity_code" label="Entity Code" />
          <BaseInput outlined v-model="form.store_code" label="Store Code" />
          <BaseInput outlined v-model="form.address" label="Address" />
          <BaseInput outlined v-model="form.owner" label="Owner" />
          <q-select
            dense
            v-show="editData"
            outlined
            v-model="form.status"
            label="Status"
            :options="['Active', 'Inactive']"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="grey" v-close-popup />
        <q-btn label="Save" color="primary" @click="saveForm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps, computed } from "vue";
import type { Store } from "./config/types";
import { ApiService } from "src/services/api";
import useNotify from "src/composable/useNotify";
const { success, error } = useNotify();

const props = defineProps<{
  modelValue: boolean;
  editData?: Store | null;
}>();

const loading = ref(false);
const emit = defineEmits(["update:modelValue", "saved"]);

// ✅ computed wrapper for v-model
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const form = ref<Store>({
  entity_code: "",
  store_code: "",
  address: "",
  owner: "",
  status: "Active",
});

watch(
  () => props.editData,
  (val) => {
    if (val) form.value = { ...val };
    else
      form.value = {
        entity_code: "",
        store_code: "",
        address: "",
        owner: "",
        status: "Active",
      };
  },
  { immediate: true },
);

const saveForm = async () => {
  loading.value = true;
  try {
    if (form.value.id) {
      // Update existing store
      await ApiService.put(`/stores/${form.value.id}`, form.value);
      success("Store updated successfully!");
    } else {
      // Create new store
      await ApiService.post("/stores", form.value);
      success("Store created successfully!");
    }

    emit("saved", { ...form.value });
    emit("update:modelValue", false);
  } catch (err: any) {
    console.error("Error saving store:", err);
    error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while saving store",
    );
  } finally {
    loading.value = false;
  }
};
</script>
