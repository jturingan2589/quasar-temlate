<template>
  <q-table
    :title="title"
    :rows="rows"
    :columns="columnsWithDefaults"
    row-key="id"
    v-model:pagination="pagination"
    :loading="loading"
    :rows-per-page-options="[5, 10, 20, 50]"
    :selection="withSelection ? 'multiple' : undefined"
    v-model:selected="selected"
    flat
    class="table"
  >
    <!-- Product column with image -->
    <template #body-cell-product="props">
      <q-td :props="props">
        <div class="row items-center no-wrap q-gutter-sm">
          <q-img
            :src="props.row.product.img"
            style="width: 40px; height: 40px"
            :alt="props.row.product.name"
          />
          <span>{{ props.row.product.name }}</span>
        </div>
      </q-td>
    </template>

    <!-- Dynamic action buttons -->
    <template #body-cell-actions="props">
      <q-td :props="props" class="text-center">
        <q-btn
          v-for="(action, index) in actions"
          :key="index"
          flat
          size="sm"
          :icon="action.icon"
          :color="action.color"
          @click="() => action.func(props.row)"
        >
          <q-tooltip>{{ action.label }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>

    <template #loading>
      <q-inner-loading showing>
        <q-spinner-dots color="primary" size="50px" />
      </q-inner-loading>
    </template>

    <!-- Allow other custom cells from parent -->
    <slot v-for="col in columns" :name="`body-cell-${col.name}`" />
  </q-table>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType } from "vue";
import { QTableProps } from "quasar";

interface TableColumn {
  name: string;
  label: string;
  field: string | ((row: TableRow) => any);
  align?: "left" | "right" | "center";
  sortable?: boolean;
}

interface TableRow {
  id?: string | number;
  product?: { name: string; img: string };
  [key: string]: any;
}

interface TableAction {
  name: string;
  icon: string;
  color?: string;
  label?: string;
  func: (row: TableRow) => void;
}

const props = defineProps({
  title: { type: String, default: "" },
  rows: { type: Array as PropType<TableRow[]>, default: () => [] },
  columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
  actions: { type: Array as PropType<TableAction[]>, default: () => [] },
  loading: { type: Boolean, default: false },
  withActions: { type: Boolean, default: true },
  withSelection: { type: Boolean, default: false },
});

const emit = defineEmits<{
  (e: "update:pagination", value: QTableProps["pagination"]): void;
  (e: "update:selected", value: TableRow[]): void;
  (e: "action", value: { type: string; row: TableRow }): void;
}>();

// Pagination
const pagination = ref<QTableProps["pagination"]>({
  sortBy: props.columns[0]?.name || "",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

// Selected rows
const selected = ref<TableRow[]>([]);
watch(selected, (val) => emit("update:selected", val));

// Keep pagination synced with parent
watch(pagination, (val) => emit("update:pagination", val), { deep: true });

// Ensure columns have default left alignment + append actions col
const columnsWithDefaults = computed(() => {
  const baseCols = props.columns.map((col) => ({
    ...col,
    align: col.align || "left",
  }));

  if (!props.withActions || props.actions.length === 0) return baseCols;

  return [
    ...baseCols,
    {
      name: "actions",
      label: "Actions",
      field: "id",
      align: "center" as const,
    },
  ];
});
</script>
