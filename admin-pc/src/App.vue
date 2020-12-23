<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
	.ivu-date-picker .ivu-select-dropdown{
		z-index: 100002;
	}
	.ivu-modal .ivu-select-dropdown{
		z-index: 100002;
	}
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
