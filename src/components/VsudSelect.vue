<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <select
        :id="id"
        class="form-select"
        :class="getClasses(size, valid)"
        :name="name"
        :value="modelValue"
        :required="isRequired"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option disabled value="">-- {{ placeholder }} --</option>
        <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">
          {{ option.label }}
        </option>
      </select>
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VsudSelect",
  props: {
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconDir: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    options: {
      type: Array,
      required: true,
      // Example: [{ value: 'option1', label: 'Option 1' }]
    },
    isRequired: Boolean,
  },
  methods: {
    getClasses(size, valid) {
      let sizeValue = size ? `form-select-${size}` : "";
      let isValidValue = valid ? `${valid}` : "invalid";
      return `${sizeValue} ${isValidValue}`;
    },
    getIcon(icon) {
      return icon ? icon : null;
    },
    hasIcon(icon) {
      return icon ? "input-group" : null;
    },
  },
};
</script>

<style scoped>
/* Style disabled options inside the select */
select option:disabled {
  color: #999;
  background-color: #f3f3f3;
  font-style: italic;
}
</style>
