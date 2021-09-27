<template>
  <div class="flex flex-col w-8/12 mx-auto p-8 border shadow-lg">
    <Header />
    <div class="flex flex-row shadow-sm">
      <FormTaskAdd @task-add="taskAdd"/>
      <TaskList ref="TaskList" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import FormTaskAdd from './components/FormTaskAdd.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    Header,
    FormTaskAdd,
    TaskList
  },
  methods: {
    async taskAdd() {
      this.$refs.TaskList.setTasks()
    }
  }
}
</script>
