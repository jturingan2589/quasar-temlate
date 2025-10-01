<template>
  <q-table
    :title="title"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :rows-per-page-options="[5, 10, 20, 50]"
    flat
    bordered
    class="table"
  >
    <!-- Slot passthrough for custom cells -->
    <slot v-for="col in columns" :name="`body-cell-${col.name}`" />
  </q-table>
</template>

<script setup lang="ts">
    import { ref, watch, PropType } from 'vue'
    import { QTableProps } from 'quasar'

    /**
     * Quasar column type
     * - name: unique key
     * - label: header text
     * - field: string or accessor fn
     */
    interface TableColumn {
      name: string
      label: string
      field: string | ((row: any) => any)
      align?: 'left' | 'right' | 'center'
      sortable?: boolean
    }

    interface TableRow {
      id: string | number
      [key: string]: any
    }

    const props = defineProps({
      title: { type: String, default: '' },
      rows: { type: Array as PropType<TableRow[]>, default: () => [] },
      columns: { type: Array as PropType<TableColumn[]>, default: () => [] }
    })

    const emit = defineEmits<{
      (e: 'update:pagination', value: QTableProps['pagination']): void
      }>()

      // Default pagination
      const pagination = ref<QTableProps['pagination']>({
      sortBy: props.columns[0]?.name || '',
      descending: false,
      page: 1,
      rowsPerPage: 10
    })

    watch(
        pagination,
        (val) => {
            emit('update:pagination', val)
        },
        { deep: true }
    )
</script>
