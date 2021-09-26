<template>
  <div class="w-4/12 flex flex-col p-2 space-y-1">
    <form @submit.prevent="addTask">
      <div class="flex flex-col p-2 space-y-1">
        <label for="task-title" class="font-semibold text-lg">Task:</label>
        <input
          type="text"
          class="p-1 border border-green-500 rounded-sm"
          v-model="newTask.title"
        />
        <p class="text-sm text-gray-500">{{ newTask.title.length }}/191</p>
      </div>
      <div class="flex flex-col p-2 space-y-1">
        <label for="task-title" class="font-semibold text-lg"
          >Description:</label
        >
        <textarea
          class="p-1 border border-green-500 rounded-sm"
          v-model="newTask.description"
        ></textarea>
        <p class="text-sm text-gray-500">
          {{ newTask.description.length }}/191
        </p>
      </div>
      <div class="flex flex-col p-2 space-y-1">
        <button type="submit" class="p-2 bg-green-500 font-semibold text-white">
          Add Task
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { HTTP_STATUS } from 'common'

export default {
  name: 'AddTaskForm',
  methods: {    
    async addTask(e) {
      // e.preventDefault()

			const newTask = {
				title: this.newTask.title || "",
				content: this.newTask.description || "",
			}

			console.log(newTask)

			const res = await fetch('api/posts/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTask),
			})

      if (res.json().status == HTTP_STATUS.CREATED) {
        console.log(added)
      }
			
      this.$emit('task-add')
    },
  },
  data() {
    return {
      newTask: {
        title: "",
        description: ""
      },
    }
  },
}
</script>
