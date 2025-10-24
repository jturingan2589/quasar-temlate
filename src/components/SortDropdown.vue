<template>
  <div class="dropdown">
    <a
      href="javascript:void(0);"
      class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
      data-bs-toggle="dropdown"
    >
      Sort By:
      <span class="q-ml-xs text-primary">{{
        selectedOption?.label || "None"
      }}</span>
    </a>

    <ul class="dropdown-menu dropdown-menu-end p-3">
      <li
        v-for="option in sortOptions"
        :key="option.label"
        class="d-flex align-items-center"
      >
        <a
          href="javascript:void(0);"
          class="dropdown-item rounded-1 w-100 d-flex justify-between"
          :class="{ 'active-sort': option.label === modelValue }"
          @click.prevent="selectOption(option)"
        >
          <span>{{ option.label }}</span>
          <q-icon
            v-if="option.label === modelValue"
            name="check"
            color="primary"
            size="16px"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { QIcon } from "quasar";

const props = defineProps({
  sortOptions: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  emit("change", option);
};

const selectedOption = computed(() =>
  props.sortOptions.find((opt) => opt.label === props.modelValue),
);
</script>

<style scoped>
.active-sort {
  background-color: var(--q-primary, #1976d2);
  color: white;
}
.dropdown-item:hover {
  background-color: rgba(25, 118, 210, 0.1);
}
</style>
