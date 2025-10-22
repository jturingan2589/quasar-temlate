<template>
  <PageHeader
    title="Create Product"
    subtitle="Create new product"
    :actions="[
      {
        icon: 'ti ti-refresh',
        iconType: 'icon',
        tooltip: 'Refresh',
        event: 'refresh',
      },
      {
        icon: 'ti ti-chevron-up',
        iconType: 'icon',
        tooltip: 'Collapse',
        event: 'collapse',
      },
    ]"
    @collapse="toggleHeader"
  >
    <template #buttons>
      <router-link
        to="/inventory/master-list"
        class="btn btn-secondary q-ml-sm"
      >
        <i data-feather="arrow-left" class="ti ti-arrow-left q-mr-sm"></i>
        Back to Product
      </router-link>
    </template>
  </PageHeader>

  <q-form
    ref="formRef"
    @submit.prevent="submitForm"
    @validation-error="onSubmitError"
  >
    <div class="add-product">
      <Accordion
        title="Product Information"
        icon="bi bi-info-circle"
        :expanded="true"
      >
        <div class="row q-col-gutter-x-lg">
          <div class="col-sm-6 col-12">
            <div>
              <label class="form-label">
                Store
                <span class="text-danger q-ml-xs">*</span>
              </label>
              <BaseSelect
                :options="ThomasStore"
                v-model="form.store"
                :rules="[rules.required]"
              />
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div>
              <label class="form-label">
                Warehouse
                <span class="text-danger q-ml-xs"> *</span>
              </label>
              <BaseSelect
                :options="WarhouseStore"
                :rules="[rules.required]"
                v-model="form.warehouse"
              />
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-x-lg">
          <div class="col-sm-6 col-12">
            <div>
              <label class="form-label">
                Product Name
                <span class="text-danger q-ml-xs">*</span>
              </label>
              <BaseInput
                v-model="form.product_name"
                :rules="[rules.required]"
              />
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div>
              <label class="form-label">
                Product Code
                <span class="text-danger q-ml-xs">*</span>
              </label>
              <BaseInput
                v-model="form.product_code"
                :rules="[rules.required]"
              />
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-x-lg">
          <div class="col-sm-6 col-12">
            <div class="list position-relative">
              <label class="form-label">
                SKU
                <span class="text-danger q-ml-xs">*</span>
              </label>
              <BaseInput v-model="form.sku" :rules="[rules.required]" />
            </div>
          </div>
          <div class="col-lg-6 col-sm-6 col-12">
            <div class="list position-relative">
              <label class="form-label">
                Item Barcode
                <span class="text-danger q-ml-xs">*</span>
              </label>
              <BaseInput
                v-model="form.item_barcode"
                :rules="[rules.required]"
              />
            </div>
          </div>
        </div>
        <div class="addservice-info">
          <div class="row q-col-gutter-x-lg">
            <div class="col-sm-6 col-12">
              <div>
                <div class="add-newplus">
                  <label class="form-label">
                    Category<span class="text-danger q-ml-xs">*</span>
                  </label>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#add-product-category"
                  >
                    <i data-feather="plus-circle" class="plus-down-add"> </i>
                    <span>Add New</span>
                  </a>
                </div>
                <BaseSelect
                  :options="ChooseNew"
                  v-model="form.category"
                  multiple
                  cleareable
                  :rules="[rules.required]"
                />
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div>
                <label class="form-label">
                  Sub Category
                  <span class="text-danger q-ml-xs">*</span>
                </label>
                <BaseSelect
                  :options="SubCategory"
                  v-model="form.sub_category"
                  :rules="[rules.required]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="add-product-new">
          <div class="row q-col-gutter-x-lg">
            <div class="col-sm-6 col-12">
              <div>
                <div class="add-newplus">
                  <label class="form-label">
                    Brand
                    <span class="text-danger q-ml-xs">*</span>
                  </label>
                </div>
                <BaseSelect
                  :options="ChooseAdd"
                  v-model="form.brand"
                  :rules="[rules.required]"
                />
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div>
                <div class="add-newplus">
                  <label class="form-label">
                    Unit<span class="text-danger q-ml-xs">*</span>
                  </label>
                </div>
                <BaseSelect
                  :options="ChooseAddNew"
                  v-model="form.unit"
                  :rules="[rules.required]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-x-lg">
          <div class="col-lg-6 col-sm-6 col-12">
            <div>
              <label class="form-label">
                Quantity
                <span class="text-danger q-ml-xs">*</span>
              </label>
              <BaseInput
                v-model="form.quantity"
                type="number"
                :rules="[rules.required, rules.number, rules.positive]"
              />
            </div>
          </div>
          <div class="col-lg-6 col-sm-6 col-12">
            <div>
              <label class="form-label">
                Price
                <span class="text-danger q-ml-xs">*</span>
              </label>
              <BaseInput
                v-model="form.price"
                type="number"
                :rules="[rules.required, rules.number, rules.positive]"
              />
            </div>
          </div>
        </div>
        <!-- Editor -->
        <div class="col-lg-12">
          <div class="summer-description-box">
            <label class="form-label">Description</label>
            <div id="summernote">
              <div class="editor pages-editor">
                <div class="editor three-line">
                  <div class="editor-container">
                    <div ref="editorRef" class="quill-editor" />
                  </div>
                </div>
              </div>
            </div>
            <p class="fs-14 mt-1">Maximum 60 Words</p>
          </div>
        </div>
        <!-- /Editor -->
      </Accordion>

      <Accordion
        title="Warranty & Manufacturing Details"
        icon="ti ti-shield-check"
        :expanded="true"
      >
        <div>
          <div class="row q-col-gutter-x-lg">
            <div class="col-sm-6 col-12">
              <div>
                <label class="form-label">
                  Warranty
                  <span class="text-danger q-ml-xs">*</span>
                </label>
                <BaseSelect
                  :options="Warranty"
                  v-model="form.warranty"
                  :rules="[rules.required]"
                />
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="add-product">
                <label class="form-label">
                  Manufacturer
                  <span class="text-danger q-ml-xs">*</span>
                </label>
                <BaseInput
                  v-model="form.manufacturer"
                  :rules="[rules.required]"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-x-lg">
            <div class="col-sm-6 col-12">
              <div class="q-mb-md">
                <label class="form-label">
                  Manufactured Date
                  <span class="text-danger q-ml-xs">*</span>
                </label>
                <BaseDatePicker
                  v-model:modelValue="form.manufactured_date"
                  :rules="[rules.required]"
                />
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="q-mb-md">
                <label class="form-label">
                  Expiry On
                  <span class="text-danger q-ml-xs">*</span>
                </label>
                <BaseDatePicker
                  v-model:modelValue="form.expiry_date"
                  :rules="[rules.required]"
                />
              </div>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
    <div class="col-12">
      <div class="d-flex items-center justify-end q-mb-lg">
        <q-btn type="button" class="btn btn-secondary q-mr-sm" no-caps>
          Cancel
        </q-btn>
        <q-btn type="submit" class="btn btn-primary" no-caps>Add Product</q-btn>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PageHeader from "src/components/PageHeader.vue";
import BaseSelect from "src/components/BaseSelect.vue";
import BaseDatePicker from "src/components/BaseDatePicker.vue";
import BaseInput from "src/components/BaseInput.vue";
import useNotify from "src/composable/useNotify";
import { useValidationRules } from "src/composable/useValidationRules";
import { ApiService } from "src/services/api";
import Accordion from "src/components/Accordion.vue";
const { success, error } = useNotify();
const { rules } = useValidationRules();
// Refs
const editorRef = ref<HTMLElement | null>(null);
const content = ref("");
const formRef = ref();
const form = ref({
  store: null,
  warehouse: null,
  product_name: "",
  product_code: "",
  sku: "",
  category: [],
  sub_category: null,
  brand: null,
  unit: null,
  item_barcode: "",
  quantity: null,
  price: null,
  tax_type: null,
  tax: null,
  discount_type: null,
  discount_value: null,
  quantity_alert: null,
  warranty: null,
  manufacturer: "",
  manufactured_date: "",
  expiry_date: "",
  variant_attribute: null,
});

const ChooseAddNew = [
  { label: "Choose", value: "Choose" },
  { label: "Kg", value: "Kg" },
  { label: "Pc", value: "Pc" },
];

const ChooseAdd = [
  { label: "Select", value: "Select" },
  { label: "Lenevo", value: "Lenevo" },
  { label: "Beats", value: "Beats" },
  { label: "Nike", value: "Nike" },
  { label: "Apple", value: "Apple" },
  { label: "Amazon", value: "Amazon" },
  { label: "Woodmart", value: "Woodmart" },
];

const SubCategory = [
  { label: "Select", value: "Select" },
  { label: "Laptop", value: "Laptop" },
  { label: "Desktop", value: "Desktop" },
  { label: "Sneakers", value: "Sneakers" },
  { label: "Formals", value: "Formals" },
  { label: "Wearables", value: "Wearables" },
  { label: "Speakers", value: "Speakers" },
];

const ChooseNew = [
  { label: "Select", value: "Select" },
  { label: "Computers", value: "Computers" },
  { label: "Electronics", value: "Electronics" },
  { label: "Shoe", value: "Shoe" },
  { label: "Cosmetics", value: "Cosmetics" },
  { label: "Groceries", value: "Groceries" },
];

const WarhouseStore = [
  { label: "Select", value: "Select" },
  { label: "Lavish Warehouse", value: "Lavish Warehouse" },
  { label: "Quaint Warehouse", value: "Quaint Warehouse" },
  { label: "Traditional Warehouse", value: "Traditional Warehouse" },
  { label: "Cool Warehouse", value: "Cool Warehouse" },
  { label: "Overflow Warehouse", value: "Overflow Warehouse" },
];

const ThomasStore = [
  { label: "Select", value: "Select" },
  { label: "Electro Mart", value: "Electro Mart" },
  { label: "Quantum Gadgets", value: "Quantum Gadgets" },
  { label: "Gadget World", value: "Gadget World" },
  { label: "Volt Vault", value: "Volt Vault" },
  { label: "Elite Retail", value: "Elite Retail" },
  { label: "Prime Mart", value: "Prime Mart" },
  { label: "NeoTech Store", value: "NeoTech Store" },
];

const Warranty = [
  { label: "Choose", value: "Choose" },
  { label: "Percentage", value: "Percentage" },
  { label: "Cash", value: "Cash" },
];

const Discount = [
  { label: "Select", value: "Select" },
  { label: "Percentage", value: "Percentage" },
  { label: "Fixed", value: "Fixed" },
];

const onSubmitError = () => {
  const firstErrorElement = document.querySelector(".q-field--error");
  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const submitForm = async () => {
  try {
    const valid = await formRef.value.validate();
    if (!valid) {
      error("Please fill out all required fields.");
      onSubmitError();
      return;
    }
    await ApiService.post("/products", {
      ...form.value,
      description: content.value,
    });
    success("Product successfully added!");
  } catch (err) {
    error("Connection error.");
  }
};

const toggleHeader = () => {
  const header = document.getElementById("collapse-header");
  if (header) header.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

// Initialize Quill editor
const initQuill = () => {
  if (!editorRef.value) return;

  const quill = new Quill(editorRef.value, {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
    },
  });

  quill.on("text-change", () => {
    content.value = quill.root.innerHTML;
  });
};

onMounted(() => {
  initQuill();
});
</script>
