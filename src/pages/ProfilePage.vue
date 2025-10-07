<template>
  <PageHeader 
    title="Profile" 
    subtitle="User Profile"
  />
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
        <div class="mb-3">
          <div class="image-upload mb-0 row inline">
            <input type="file" />
            <div class="btn btn-primary fs-13">Change Image</div>
          </div>
          <p class="mt-2">
            Upload an image below 2 MB, Accepted File format JPG, PNG
          </p>
        </div>
      </div>
      <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-lg-6 col-sm-12">
          <div class="mb-3">
            <label class="form-label"
              >First Name<span class="text-danger ms-1">*</span></label
            >
            <input type="text" class="form-control" :value="authStore.user?.given_name" />
          </div>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="mb-3">
            <label class="form-label"
              >Last Name<span class="text-danger ms-1">*</span></label
            >
            <input type="text" class="form-control" :value="authStore.user?.family_name" />
          </div>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="mb-3">
            <label>Email<span class="text-danger ms-1">*</span></label>
            <input type="email" class="form-control" :value="authStore.user?.email" />
          </div>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="mb-3">
            <label class="form-label"
              >Phone Number<span class="text-danger ms-1">*</span></label>
            <input type="text" value="+17468314286" class="form-control" />
          </div>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="mb-3">
            <label class="form-label"
              >User Name<span class="text-danger ms-1">*</span></label>
            <input type="text" class="form-control" value="Jeffry Jordan" />
          </div>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="mb-3">
            <label class="form-label"
              >Password<span class="text-danger ms-1">*</span></label
            >
            <div class="pass-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="pass-input form-control"
                value="********"
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
          <a href="javascript:void(0);" class="btn btn-secondary q-mr-sm shadow-none"
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
import { ref, computed } from "vue";
  import { useAuthStore } from 'stores/auth';
import PageHeader from "src/components/PageHeader.vue";
  const showPassword = ref(false);
  const authStore = useAuthStore()
  console.log(authStore.user,"===")
  const toggleShow = () => {
    showPassword.value = !showPassword.value;
  };

</script>

