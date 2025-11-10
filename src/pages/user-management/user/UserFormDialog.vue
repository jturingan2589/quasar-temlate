<template>
  <q-dialog v-model="isOpen">
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">
          {{ modelValue ? "Edit User" : "Add User" }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <div class="row q-col-gutter-x-sm">
            <div class="col-12">
              <q-input
                v-model="form.username"
                label="Username"
                outlined
                dense
                :rules="[rules.required, rules.minLength(3)]"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.firstName"
                label="First Name"
                outlined
                dense
                :rules="[rules.required]"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.lastName"
                label="Last Name"
                outlined
                dense
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="form.email"
                label="Email"
                outlined
                dense
                type="email"
                :rules="[rules.required, rules.email]"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="form.mobile_number"
                label="Mobile Number"
                outlined
                dense
                :rules="[rules.required, rules.mobile]"
              />
            </div>

            <div class="col-12">
              <q-toggle
                v-model="form.enabled"
                label="Enabled"
                color="primary"
              />
            </div>

            <div class="col-12" v-if="!modelValue">
              <q-input
                v-model="form.tempPassword"
                label="Temporary Password"
                outlined
                dense
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.minLength(6)]"
              >
                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </div>

            <div class="col-12">
              <q-select
                v-model="form.realmRole"
                :options="realmRoleOptions"
                label="Realm Role"
                outlined
                dense
                emit-value
                map-options
                option-label="name"
                option-value="name"
                :loading="loadingRoles"
                clearable
                :rules="[rules.required]"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section>No roles available</q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

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
import { ref, watch, reactive, onMounted } from "vue";
import { kcApiService } from "src/services/keycloak";
import useNotify from "src/composable/useNotify";
import { useValidationRules } from "src/composable/useValidationRules";
import type { User } from "./config/types";
import type { RealmRole } from "../role/config/types";

const props = defineProps<{
  modelValue: User | null;
  show: boolean;
}>();

const emits = defineEmits<{
  (e: "update:show", val: boolean): void;
  (e: "save", val: User): void;
  (e: "refresh"): void;
}>();

const { success, error } = useNotify();
const { rules } = useValidationRules();

const isOpen = ref(props.show);
const saving = ref(false);
const loadingRoles = ref(false);
const showPassword = ref(false);
const realmRoleOptions = ref<RealmRole[]>([]);

watch(
  () => props.show,
  (val) => (isOpen.value = val),
);
watch(isOpen, (val) => emits("update:show", val));

// Make mobile_number and realmRole always string
const form = reactive<
  User & { tempPassword?: string; realmRole: string; mobile_number: string }
>({
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile_number: "",
  enabled: true,
  realmRole: "",
  tempPassword: "",
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      Object.assign(form, val);
      form.tempPassword = "";
      form.mobile_number = val.attributes?.mobile_number?.[0] ?? "";
    } else {
      Object.assign(form, {
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile_number: "",
        enabled: true,
        realmRole: "",
        tempPassword: "",
      });
    }
  },
  { immediate: true },
);

// Load Realm Roles
async function loadRealmRoles() {
  try {
    loadingRoles.value = true;
    const roles = await kcApiService.get<RealmRole[]>("/roles");
    realmRoleOptions.value = roles || [];

    // After roles loaded, set form.realmRole if editing
    if (props.modelValue?.realmRole) {
      const exists = realmRoleOptions.value.find(
        (r) => r.name === props.modelValue?.realmRole,
      );
      form.realmRole = exists ? exists.name : "";
    }
  } catch (err: any) {
    error("Failed to load realm roles");
  } finally {
    loadingRoles.value = false;
  }
}

// Create or update user
async function onSubmit() {
  saving.value = true;
  try {
    let userId = form.id;

    if (!userId) {
      // Create user
      const newUser = {
        username: form.username,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        enabled: form.enabled,
        attributes: { mobile_number: [form.mobile_number] },
      };

      const res: any = await kcApiService.post("/users", newUser);
      userId = res?.id;

      // Set temporary password
      if (form.tempPassword) {
        await kcApiService.put(`/users/${userId}/reset-password`, {
          type: "password",
          temporary: true,
          value: form.tempPassword,
        });
      }

      // Assign realm role
      if (form.realmRole) {
        const selectedRole = realmRoleOptions.value.find(
          (r) => r.name === form.realmRole,
        );
        if (selectedRole) {
          await kcApiService.post(`/users/${userId}/role-mappings/realm`, [
            { id: selectedRole.id, name: selectedRole.name },
          ]);
        }
      }
    } else {
      // Update existing user
      await kcApiService.put(`/users/${userId}`, {
        username: form.username,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        enabled: form.enabled,
        attributes: { mobile_number: [form.mobile_number] },
      });

      // Update realm role
      if (form.realmRole) {
        const selectedRole = realmRoleOptions.value.find(
          (r) => r.name === form.realmRole,
        );
        if (selectedRole) {
          await kcApiService.post(`/users/${userId}/role-mappings/realm`, [
            { id: selectedRole.id, name: selectedRole.name },
          ]);
        }
      }
    }

    success(`User "${form.username}" saved successfully`);
    emits("save", { ...form });
    isOpen.value = false;
  } catch (err: any) {
    console.error(err);
    const msg =
      err.response?.data?.errorMessage ||
      err.response?.data?.error ||
      err.message ||
      "Unknown error while saving user";
    error(msg);
  } finally {
    saving.value = false;
  }
}

function onCancel() {
  isOpen.value = false;
}

onMounted(() => {
  loadRealmRoles();
});
</script>
