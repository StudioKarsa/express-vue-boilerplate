<template>
  <div class="flex flex-col w-8/12 mx-auto p-8 border shadow-lg">
    <Header />
    <div class="flex flex-row shadow-sm">
      <AddTaskForm @task-add="taskAdd"/>
      <TasksList ref="TasksList" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import TasksList from './components/TasksList.vue'

export default {
  name: 'App',
  components: {
    Header,
    AddTaskForm,
    TasksList
  },
  methods: {
    async taskAdd() {
      this.$refs.TasksList.setTasks()
    }
  }
}
</script>
