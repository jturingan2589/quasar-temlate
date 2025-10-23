<template>
  <PageHeader title="Profile" subtitle="User Profile" />
  <div class="card">
    <div class="card-header">
      <h4>Profile</h4>
    </div>
    <div class="card-body profile-body">
      <h5 class="q-mb-sm">
        <i class="ti ti-user text-primary q-mr-xs"></i>Basic Information
      </h5>
      <div class="profile-pic-upload image-field">
        <div class="profile-pic q-pa-sm">
          <q-img
            fit="cover"
            src="/app/img/users/user-49.png"
            class="object-cover full-height q-rounded-borders"
            alt="user"
          />
          <button type="button" class="close rounded-borders">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="q-mb-md">
          <div class="image-upload mb-0 row inline">
            <input type="file" />
            <div class="btn btn-primary fs-13">Change Image</div>
          </div>
          <p class="mt-2">
            Upload an image below 2 MB, Accepted File format JPG, PNG
          </p>
        </div>
      </div>
      <div class="row q-col-gutter-x-lg">
        <div class="col-lg-6 col-12">
          <div class="q-mb-md">
            <label class="form-label">
              First Name
              <span class="text-danger q-ml-xs">*</span>
            </label>
            <BaseInput type="text" v-model="form.first_name" />
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="q-mb-md">
            <label class="form-label">
              Last Name
              <span class="text-danger q-ml-xs">*</span>
            </label>
            <BaseInput type="text" v-model="form.last_name" />
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="q-mb-md">
            <label class="form-label">
              Email
              <span class="text-danger q-ml-xs">*</span>
            </label>
            <BaseInput type="email" v-model="form.email" />
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="q-mb-md">
            <label class="form-label">
              Contact Number
              <span class="text-danger q-ml-xs">*</span>
            </label>
            <BaseInput type="text" v-model="form.contact_number" />
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="q-mb-md">
            <label class="form-label">
              Username
              <span class="text-danger q-ml-xs">*</span>
            </label>
            <BaseInput type="text" v-model="form.username" />
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="q-mb-md">
            <label class="form-label">
              Password
              <span class="text-danger q-ml-xs">*</span>
            </label>
            <div class="pass-group">
              <BaseInput
                :type="showPassword ? 'text' : 'password'"
                class="pass-input"
                model-value="********"
              />
              <span @click="toggleShow" class="toggle-password">
                <i
                  :class="{
                    'fas fa-eye': showPassword,
                    'fas fa-eye-slash': !showPassword,
                  }"
                ></i>
              </span>
            </div>
          </div>
        </div>
        <div class="col-12 d-flex justify-end">
          <a
            href="javascript:void(0);"
            class="btn btn-secondary q-mr-sm shadow-none"
            >Cancel</a
          >
          <a href="javascript:void(0);" class="btn btn-primary shadow-none"
            >Save Changes</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "stores/auth";
import PageHeader from "src/components/PageHeader.vue";
import BaseInput from "src/components/BaseInput.vue";
const showPassword = ref(false);
const authStore = useAuthStore();

const form = reactive({
  first_name: authStore.user?.given_name || "",
  last_name: authStore.user?.family_name || "",
  email: authStore.user?.email || "",
  contact_number: authStore.user?.phone_number || "",
  username: authStore.user?.preferred_username || "",
  password: "",
});

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
</script>
