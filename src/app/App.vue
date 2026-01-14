<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import { computed } from 'vue';
import type { TreeItem } from '@/entities/treeStore/types';
import { TreeStore } from '@/entities/treeStore';

const items: TreeItem[] = [
  { id: 1, parent: null, label: 'Айтем 1' },
{ id: '91064cee'
, parent: 1, label: 'Айтем 2' },
{ id: 3, parent: 1, label: 'Айтем 3' },
{ id: 4, parent: '91064cee'
, label: 'Айтем 4' },
{ id: 5, parent: '91064cee'
, label: 'Айтем 5' },
{ id: 6, parent: '91064cee'
, label: 'Айтем 6' },
{ id: 7, parent: 4, label: 'Айтем 7' },
{ id: 8, parent: 4, label: 'Айтем 8' }
];
const store = new TreeStore(items);

function buildPath(item: TreeItem, store: TreeStore<TreeItem>): string[] {
  return store
    .getAllParents(item.id)
    .reverse()
    .map(i => i.label);
}

const rowData = computed(() =>
  store.getAll().map(item => ({
    ...item,
    path: buildPath(item, store),
    category: store.getChildren(item.id).length ? 'Группа' : 'Элемент'
  }))
);

const columnDefs = [
  {
    colId: '№',
    headerName: '№ п/п',
    valueGetter: params => params.node.rowIndex + 1,
    width: 80,
    cellClass: 'cell-index'
  },
  { colId: 'label', field: 'label', headerName: 'Название', flex: 1 },
];
const autoGroupColumnDef = {
  headerName: 'Категория',
  flex: 1,
  cellRendererParams: {
    suppressCount: true
  },
  valueGetter: (obj) => obj.data.category,
};
const rowClassRules = {
  'row-group': params => params.data?.category === 'Группа'
};
</script>

<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 600px"
    :rowData="rowData"
    :rowClassRules="rowClassRules"
    :columnDefs="columnDefs"
    :autoGroupColumnDef="autoGroupColumnDef"
    treeData
    :getDataPath="data => data.path"
    :groupDefaultExpanded="-1"
  />
</template>

<style lang="css">
  .row-group {
    font-weight: 500;
  }
  .cell-index {
    font-weight: 500;
  }
</style>
