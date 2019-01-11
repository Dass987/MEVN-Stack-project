<template>
	<div>
		<nav class="navbar navbar-dark bg-dark shadow">
			<a href="/" class="navbar-brand">MEVN Stack</a>
		</nav>
		<br/>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="border rounded mt-4 p-4">
						<h2 class="mt-2 mb-5 text-center">Save new product</h2>
						<form @submit="">
							<div class="form-group">
								<label for="produc_name">Product Name</label>
								<input type="text" id="produc_name" class="form-control">
							</div>
							<div class="form-group">
								<label for="produc_price">Product Price ($)</label>
								<input type="number" id="produc_price" class="form-control">
							</div>
							<button class="btn btn-primary btn-block mt-4">Guardar</button>
						</form>
					</div>
				</div>
			</div>
			<hr>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			task: {
				title: '',
				description: ''
			}
		}
	}
}
</script>
