<template>
	<div id='main-wrap'>
		<div class='main-content'>
			<div >
				<router-view/>
			</div>
		</div>
		
	</div>	
</template>

<script>
</script>

<style lang='scss' scoped>
/* #main-wrap{
	position: fixed;
	left:$navMenu;
	top:$layoutHeader;
	right:0px;
	bottom:0;
	border:30px solid #f7f7f7;
	border-bottom:none;
	
} */
.main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-left: $navMenu + 30;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	
}
	
</style>
