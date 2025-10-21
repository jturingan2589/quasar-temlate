<template>
  <q-dialog v-model="dialogModel" persistent>
    <div class="modal fade width-modal" id="view-notes">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content q-pa-md">
          <div class="page-wrapper-new q-p-none">
            <div class="content">
              <!-- Modal Header -->
              <div
                class="modal-header q-border-none custom-modal-header q-mb-lg"
              >
                <div class="row q-gutter-sm items-center justify-between">
                  <div class="page-title">
                    <h4>{{ title }}</h4>
                  </div>
                  <div class="download-file">
                    <a
                      :href="downloadUrl"
                      class="btn btn-submit"
                      target="_blank"
                    >
                      Download Template
                    </a>
                  </div>
                </div>
              </div>

              <!-- Modal Body -->
              <div class="modal-content">
                <form @submit.prevent="onSubmit">
                  <div class="row">
                    <div class="col-12">
                      <div class="input-blocks image-upload-down">
                        <!-- File upload div -->
                        <div class="image-uploads" @click="pickFile">
                          <img
                            v-if="!file"
                            src="/app/img/download-img.png"
                            alt="img"
                          />

                          <div v-if="file" class="selected-file">
                            <img
                              src="/app/img/icons/xls.svg"
                              width="70"
                              alt="file icon"
                            />
                            <button
                              type="button"
                              class="close-btn"
                              @click.stop="removeFile"
                            >
                              ×
                            </button>
                          </div>

                          <h4>
                            <span v-if="!file">
                              Click here to choose a <span>file to upload</span>
                            </span>
                            <span v-else>
                              {{ file.name }}
                            </span>
                          </h4>

                          <!-- Hidden native input -->
                          <input
                            ref="nativeFileInput"
                            type="file"
                            accept=".css,.xlsx"
                            style="display: none"
                            @change="onNativeFileChange"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Modal Footer -->
                  <div class="modal-footer-btn row q-gutter-x-sm justify-end">
                    <q-btn color="secondary" @click="closeDialog" no-caps>
                      Cancel
                    </q-btn>
                    <q-btn color="primary" type="submit" no-caps>
                      Upload
                    </q-btn>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ApiService } from "src/services/api";
import { useQuasar } from "quasar";

const $q = useQuasar();
const props = defineProps({
  show: Boolean,
  title: { type: String, default: "Import" },
  uploadUrl: { type: String, required: true },
  downloadUrl: { type: String, required: true },
});

const emit = defineEmits(["update:show", "submit"]);
const file = ref<File | null>(null);
const nativeFileInput = ref<HTMLInputElement | null>(null);
const loading = ref(false);

const dialogModel = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});

const closeDialog = () => emit("update:show", false);

// Open file picker
const pickFile = () => {
  nativeFileInput.value?.click();
};

// Handle file selection
const onNativeFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};

// Remove selected file
const removeFile = () => {
  file.value = null;
  if (nativeFileInput.value) nativeFileInput.value.value = "";
};

// Upload file
const onSubmit = async () => {
  if (!file.value) {
    $q.notify({
      type: "negative",
      message: "Please select a file to upload.",
      position: "top",
    });
    return;
  }

  loading.value = true;
  try {
    await ApiService.upload(props.uploadUrl, file.value);
    emit("submit");
    closeDialog();
    $q.notify({ type: "positive", message: "File uploaded!", position: "top" });
  } catch (err) {
    console.error(err);
    $q.notify({ type: "negative", message: "Upload failed!", position: "top" });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.width-modal {
  width: 600px;
  max-width: 95vw;
}

.image-upload-down {
  height: 150px !important;
}

.image-uploads {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  background: #f9f9f9;
  position: relative;
}

.selected-file {
  position: relative;
}

.close-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 14px;
  cursor: pointer;
}

/* Ensure the close button click doesn't trigger pickFile */
.close-btn:hover {
  background: darkred;
}

.image-uploads img {
  margin-bottom: 10px;
}

.image-uploads h4 {
  margin: 0;
}
</style>
