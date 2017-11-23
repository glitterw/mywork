<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view ></router-view>
      </keep-alive>
    </transition>
   
  </div>
</template>
<style lang="less">
  // @import url("assets/styles/common");
</style>