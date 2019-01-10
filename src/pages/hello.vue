<template>
	<div>
		<h1>Hello world!</h1>
	</div>
</template>
<script>
export default {
	name: 'hello',
	data(){
		return {
			url: '',
		}
	},
	mounted(){
		// 接口的调用 
		// this.$axios.$get(url)
		// get 请求
		this.$axios.$get('/users', {params:{key: 1}}).then(resp => {
			// console.log(resp)
		})

		// post请求
		this.$axios.$post('/user',{
			firstName: 'wu',
			lastName: 'yanping'
		}).then(resp=>{
			// 
		}).catch(e => {
			// 
		})

		// put请求
		this.$axios.$put('/user/1', {
			firstName:'wu',
			lastName: 'yanping'
		}).then(resp=>{

		}).catch(e=>{

		})

		// delete 请求
		this.$axios.$delete('/user/1').then(resp=>{

		}).catch(e=>{

		})
		// <==>
		this.$axios({
			method: 'delete',
			url: '/users',
			data: {
				rows: [1,2]
			}
		})



	},
	methods: {
		fetchData(){
			this.$axios.$get(url)
		}
	}
}
</script>
<style>

</style>