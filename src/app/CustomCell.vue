<script lang="ts" setup>
import type { TreeStore } from '@/entities/treeStore';
import type { TreeItem } from '@/entities/treeStore/types';
import type { ICellRendererParams } from 'ag-grid-community';

const props = defineProps<{
  params: ICellRendererParams<TreeStore<TreeItem>, TreeItem & {store: TreeStore<TreeItem>}>
  }>();

const handelAddRow = () => {
  props.params.data?.addItem({
    id: props.params.value.id | '',
    label: props.params.value.label,
    parent: props.params.value.parent
  })
}

const handelDeleteRow = () => {

}

</script>

<template>
  <div>
    {{ params.data }} 
    <button @click="handelAddRow">Add</button>
    <button>Dell</button>
  </div>
</template>