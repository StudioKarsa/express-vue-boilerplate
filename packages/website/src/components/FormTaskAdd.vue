<template>
  <div class="w-4/12 flex flex-col p-2 space-y-1 shadow">
    <div 
      v-if="message.text"
      :class="message.class"
      class="p-2 font-semibold rounded-sm">
      {{ message.text }}
    </div>
    <form @submit.prevent="addTask">
      <div class="flex flex-col p-2 space-y-1">
        <label for="task-title" class="font-semibold text-lg"> Task: </label>
        <input
          v-model="newTask.title"
          type="text"
          class="p-1 border border-green-500 rounded-sm"
        />
        <p class="text-sm text-gray-500">{{ newTask.title.length }}/191</p>
      </div>
      <div class="flex flex-col p-2 space-y-1">
        <label for="task-title" class="font-semibold text-lg"> Content: </label>
        <textarea
          v-model="newTask.content"
          class="p-1 border border-green-500 rounded-sm"
        ></textarea>
        <p class="text-sm text-gray-500">{{ newTask.content.length }}/191</p>
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
  name: 'FormTaskAdd',
  data() {
    return {
      newTask: {
        title: '',
        content: '',
      },
      message: {
        text: '',
        class: [],
      },
    }
  },
  methods: {
    async addTask() {
      const newTask = {
        title: this.newTask.title || '',
        content: this.newTask.content || '',
      }

      const res = await fetch('api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
      const data = await res.json()

      if (res.status == HTTP_STATUS.CREATED) {
        this.message = {
          text: data.message,
          class: ['bg-green-300', 'text-green-700']
        }
        this.newTask = {
          title: '',
          content: ''
        }
        this.$emit('task-add')
      } else {
        this.message = {
          text: data.error,
          class: ['bg-red-300', 'text-red-700']
        }
      }
    },
  },
}
</script>
