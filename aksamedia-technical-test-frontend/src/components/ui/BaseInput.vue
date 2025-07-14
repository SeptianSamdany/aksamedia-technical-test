<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  emits: ['update:modelValue'],
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    modelValue: [String, Number],
    placeholder: String,
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: String
  },
  computed: {
    inputClasses() {
      const base = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm'
      const normal = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
      const errorClass = 'border-red-300 focus:ring-red-500 focus:border-red-500'
      
      return `${base} ${this.error ? errorClass : normal}`
    }
  }
}
</script>
