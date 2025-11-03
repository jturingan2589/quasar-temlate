<template>
  <q-dialog v-model="isOpen">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">
          {{ modelValue ? "Edit User" : "Add User" }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            v-model="form.username"
            label="Username"
            outlined
            dense
            required
          />
          <q-input
            v-model="form.firstName"
            label="First Name"
            outlined
            dense
            required
          />
          <q-input v-model="form.lastName" label="Last Name" outlined dense />
          <q-input
            v-model="form.email"
            label="Email"
            outlined
            dense
            type="email"
            required
          />
          <q-input
            v-model="form.mobile_number"
            label="Mobile Number"
            outlined
            dense
            required
          />
          <q-toggle v-model="form.enabled" label="Enabled" color="primary" />

          <div class="row justify-end q-gutter-sm q-mt-md">
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
import { ref, watch, reactive } from "vue";
import type { User } from "./config/types";

const props = defineProps<{
  modelValue: User | null;
  show: boolean;
}>();

const emits = defineEmits<{
  (e: "update:show", val: boolean): void;
  (e: "save", val: User): void;
}>();

const isOpen = ref(props.show);
const saving = ref(false);

watch(
  () => props.show,
  (val) => (isOpen.value = val),
);

watch(isOpen, (val) => emits("update:show", val));

const form = reactive<User>({
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile_number: "",
  enabled: true,
});

// When editing, populate the form
watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val);
    else {
      Object.assign(form, {
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile_number: "",
        enabled: true,
      });
    }
  },
  { immediate: true },
);

async function onSubmit() {
  saving.value = true;
  try {
    emits("save", { ...form });
    isOpen.value = false;
  } finally {
    saving.value = false;
  }
}

function onCancel() {
  isOpen.value = false;
}
</script>
