<template>
  <div class="flex flex-col p-2 rounded-sm shadow space-y-2">
    <div class="flex flex-row space-x-2">
      <h2 class="flex-1 items-center font-semibold text-lg">
        {{ task.title }}
      </h2>
      <button
        @click="taskDelete(task.id)"
        class="px-2 py-1 bg-red-500 hover:bg-red-600 active:bg-red-700 font-bold text-white rounded-sm"
      >
        X
      </button>
    </div>
    <div class="flex flex-col">
      <p class="">{{ task.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskListItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async taskDelete(id) {
      const res = await fetch(`api/posts/${id}`, {
        method: 'DELETE',
      })

      this.$emit('task-delete')
    },
  },
}
</script>
