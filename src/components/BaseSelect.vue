<template>
  <q-select
    outlined
    dense
    v-model="internalValue"
    :options="filteredOptions"
    :label="label"
    :options-dense="optionsDense"
    :multiple="multiple"
    :clearable="clearable"
    :use-chips="multiple"
    use-input
    input-debounce="200"
    emit-value
    map-options
    @filter="filterFn"
    @new-value="onNewValue"
    @update:model-value="onValueSelected"
    ref="selectRef"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  modelValue: string | number | (string | number)[] | null;
  options: Option[];
  label?: string;
  optionsDense?: boolean;
  clearable?: boolean;
  multiple?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const selectRef = ref<any>(null);
const search = ref("");
const allOptions = ref<Option[]>([...props.options]);
const filteredOptions = ref<Option[]>([...props.options]);

// Two-way binding
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// Live filter
function filterFn(val: string, update: (cb: () => void) => void) {
  update(() => {
    const needle = val.toLowerCase();
    filteredOptions.value = allOptions.value.filter((opt) =>
      opt.label.toLowerCase().includes(needle),
    );
  });
  search.value = val;
}

// Clear input when user types new value
function onNewValue(val: string) {
  search.value = "";
  selectRef.value?.updateInputValue("");
}

// Handle selection
function onValueSelected(val: any) {
  search.value = "";
  selectRef.value?.updateInputValue("");

  // Hide dropdown if single select
  if (!props.multiple) {
    selectRef.value?.hidePopup();
  }
}

// Ensure input cleared on external v-model change
watch(internalValue, () => {
  search.value = "";
  selectRef.value?.updateInputValue("");
});
</script>
