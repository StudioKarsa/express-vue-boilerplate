<template>
  <div v-if="tasks.length > 0" class="w-8/12 p-2 space-y-2">
		<div :key="task.id" v-for="task in tasks" class="flex flex-col space-y-2">
			<TaskListItem :task="task" @task-delete="setTasks"/>
		</div>
	</div>
    
  <div v-else class="w-full flex flex-row p-4 text-lg items-center justify-center">
    Start Addding Task!
  </div>
</template>

<script>
import TaskListItem from './TaskListItem.vue'

export default {
  name: 'TaskList',
	components: {
		TaskListItem
	},
  data() {
    return {
      tasks: [],
    }
  },
  created() {
    this.setTasks()
  },
  methods: {
    async getAllTasks() {
      const res = await fetch('api/posts/')
      const data = await res.json()

      return data.items
    },
    async setTasks() {
      this.tasks = await this.getAllTasks()
    },
  },
}
</script>
