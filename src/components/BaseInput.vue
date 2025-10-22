<template>
  <q-input
    dense
    outlined
    v-model="internalValue"
    :type="type"
    :label="label"
    :placeholder="placeholder"
    :clearable="clearable"
    :rules="rules"
    :readonly="readonly"
    :disable="disable"
    :maxlength="maxlength"
    lazy-rules
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string | number | null;
  label?: string;
  type?:
    | "text"
    | "password"
    | "textarea"
    | "email"
    | "search"
    | "tel"
    | "file"
    | "number"
    | "url"
    | "time"
    | "date"
    | "datetime-local";
  placeholder?: string;
  clearable?: boolean;
  rules?: any[];
  readonly?: boolean;
  disable?: boolean;
  maxlength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  clearable: true,
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
