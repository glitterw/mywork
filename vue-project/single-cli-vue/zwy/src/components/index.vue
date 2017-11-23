<template>
  <div id="wrap">
     <div id="header">
        <zwy-header></zwy-header>
     </div>
     <div id="main"> 
        <router-view></router-view>  
     </div>
     <div id="footer">
        <zwy-footer></zwy-footer>
     </div>
     <!-- 左侧城市菜单 -->
    <div class="select-city">
       <city></city>
    </div>
    <!-- /左侧城市菜单 -->
  </div>
</template>

<script>
import ZwyHeader from './zwy-header';
import ZwyFooter from './zwy-footer';
  export default {
    name: 'index',
    components: {
      
        ZwyHeader,ZwyFooter
    },
    data () { 
     return {
       
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import url("../assets/styles/reset.css");
  @import url("../assets/styles/common.css");
  @import url("../assets/styles/index");
</style>
