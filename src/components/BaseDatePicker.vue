<template>
  <div class="input-groupicon calendar-input">
    <q-input
      outlined
      dense
      class="datetimepicker"
      v-model="displayValue"
      :label="label"
      readonly
      :rules="rules"
    >
      <template #append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="internalValue" :range="range">
              <div class="row items-center justify-end q-pa-sm">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { date as quasarDate } from "quasar";

interface Props {
  modelValue: string | { from: string; to: string } | null;
  label?: string;
  range?: boolean;
  rules?: any[];
  displayFormat?: string; // default = "MMM DD, YYYY"
}

const props = withDefaults(defineProps<Props>(), {
  displayFormat: "MMM DD, YYYY",
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// Computed formatted display value
const displayValue = computed(() => {
  if (!internalValue.value) return "";

  if (
    typeof internalValue.value === "object" &&
    internalValue.value.from &&
    internalValue.value.to
  ) {
    return (
      quasarDate.formatDate(internalValue.value.from, props.displayFormat) +
      " - " +
      quasarDate.formatDate(internalValue.value.to, props.displayFormat)
    );
  }

  return quasarDate.formatDate(
    internalValue.value as string,
    props.displayFormat,
  );
});
</script>
