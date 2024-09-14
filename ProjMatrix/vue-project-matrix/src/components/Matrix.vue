<template>
    <div>
      <table>
        <!-- <thead>
          <tr>
            <th v-for="(item, index) in Matrix[0]" :key="index"> {{ index + 1 }}</th>
          </tr>
        </thead> -->
        <tbody>
          <tr v-for="(row, rowIndex) in Matrix" :key="rowIndex">
            <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    Matrix: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style>
  table {
    width: 70px;
    height: 70px;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ccc;
    /* padding: 8px; */
    text-align: center;
    user-select: none;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  