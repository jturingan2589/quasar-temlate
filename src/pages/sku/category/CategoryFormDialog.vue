<template>
  <q-dialog v-model="isOpen">
    <q-card style="min-width: 500px">
      <q-card-section>
        <div class="text-h6">
          {{ category.id ? "Edit Category" : "Add Category" }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <FormField>Category Name</FormField>
          <q-input
            v-model="category.category"
            outlined
            dense
            :rules="[rules.required]"
          />
          <FormField>Category Code</FormField>
          <q-input
            v-model="category.code"
            outlined
            dense
            :rules="[rules.required]"
          />

          <q-select
            v-model="category.status"
            :options="statusOptions"
            label="Status"
            v-show="category.id"
            outlined
            dense
            emit-value
            map-options
            :rules="[rules.required]"
          />

          <div class="row justify-end q-gutter-sm q-mt-sm">
            <q-btn flat label="Cancel" color="grey" @click="onCancel" />
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
import { reactive, ref, watch } from "vue";
import { ApiService } from "src/services/api";

const props = defineProps<{
  modelValue: boolean;
  data?: any;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "saved", val: any): void;
}>();

const isOpen = ref(props.modelValue);
watch(
  () => props.modelValue,
  (val) => (isOpen.value = val),
);
watch(isOpen, (val) => emit("update:modelValue", val));

const category = reactive({
  id: "",
  category: "",
  code: "",
  status: "Active",
});

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const saving = ref(false);

const rules = {
  required: (val: any) => !!val || "Required",
};

// Populate form if editing
watch(
  () => props.data,
  (val) => {
    if (val) Object.assign(category, val);
  },
  { immediate: true },
);

const onCancel = () => {
  isOpen.value = false;
};

const onSubmit = async () => {
  saving.value = true;
  try {
    if (category.id) {
      // update category
      await ApiService.put(`/categories/${category.id}`, category);
    } else {
      // create category
      await ApiService.post("/categories", category);
    }
    emit("saved", { ...category });
    isOpen.value = false;
  } catch (err: any) {
    console.error("Error saving category:", err);
  } finally {
    saving.value = false;
  }
};
</script>
