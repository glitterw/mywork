<template> 
     <footer class="footer g-flex">
      
      	<div class="g-flex-item tab-item">
	      	<span>
		      	<router-link to='/news'>
		      		<i class="news active">业务新闻</i>
		      	</router-link>
	      	</span>
      	</div>
      	<div class="g-flex-item tab-item">
	      	<span>
		      	<router-link to='/market'>
		      		<i class="market">市场主体</i>
		      	</router-link>
	      	</span>
      	</div>
      	<div class="g-flex-item tab-item">
	      	<span>
		      	<router-link to='/fund'>
		      		<i class="fund ">资金流动</i>
		      	</router-link>
	      	</span>
      	</div>
      	<div class="g-flex-item tab-item">
	      	<span>
		      	<router-link to='/invest'>
		      		<i class="post-box ">我要投资</i>
		      	</router-link>
	      	</span>
      	</div> 
     </footer>  
</template>

<script>
export default {
  name: 'zwy-footer',
  data () {
    return { 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import url("../assets/styles/common.css"); 
  @import url("../assets/styles/footer"); 
</style>
