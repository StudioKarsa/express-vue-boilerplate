<template>
  <div v-if="tasks.length > 0" class="w-8/12 p-2 space-y-2">
		<div :key="task.id" v-for="task in tasks" class="flex flex-col space-y-2">
			<Task :task="task" @task-delete="setTasks"/>
		</div>
	</div>
    
  <div v-else class="w-full flex flex-row p-4 text-lg items-center justify-center">
    Start Addding Task!
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  name: 'TasksList',
	components: {
		Task
	},
  methods: {
    async getAllTasks() {
      const res = await fetch('api/posts/')
      const data = await res.json()

      return data.items
    },
    async setTasks() {
      this.tasks = await this.getAllTasks()
      console.log(this.tasks)
    },
  },
  data() {
    return {
      tasks: [],
    }
  },
  created() {
    this.setTasks()
  },
}
</script>
