<template>
	<div>
		<nav class="navbar navbar-dark bg-dark shadow">
			<div class="container">
				<a href="/" class="navbar-brand">MEVN Stack</a>
			</div>
		</nav>

		<br/>

		<!-- ADD NEW PRODUCT FORM -->
		<div class="container">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<div class="border rounded mt-4 p-4">
						<h2 class="mt-2 mb-5 text-center">Save new product</h2>
						<form @submit.prevent="sendProduct">
							<div class="form-group">
								<label for="product_name">Product Name</label>
								<input type="text" id="product_name" class="form-control" v-model="product.name">
							</div>
							<div class="form-group">
								<label for="product_price">Product Price ($)</label>
								<input type="number" id="product_price" class="form-control" v-model="product.price">
							</div>
							<template v-if="edit === false">
								<button class="btn btn-secondary btn-block mt-4">Save</button>
							</template>
							<template v-else>
								<button class="btn btn-secondary btn-block mt-4">Update</button>
							</template>
						</form>
					</div>
				</div>
				<div class="col-md-3"></div>
			</div>
		</div>

		<br/>

		<!-- ALERTS ZONE -->
		<div class="container">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<div id="added" class="alert alert-success text-center d-none" role="alert">
						Succesfully Added!
					</div>
					<div id="udated" class="alert alert-success text-center d-none" role="alert">
						Succesfully Udated!
					</div>
					<div id="deleted" class="alert alert-success text-center d-none" role="alert">
						Succesfully Deleted!
					</div>
				</div>
				<div class="col-md-3"></div>
			</div>
		</div>

		<!-- PRODUCTS TABLE -->
		<div class="container">
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-8">
					<div class="m-3">
						<table class="table text-center">
							<thead class="thead-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Id</th>
									<th scope="col">Name</th>
									<th scope="col">Price</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(product, index) of products" v-bind:key="product._id">
									<td class="align-middle">{{index+1}}</td>
									<td class="align-middle">{{product._id}}</td>
									<td class="align-middle">{{product.name}}</td>
									<td class="align-middle">${{product.price}}</td>
									<td>
										<button @click="editProduct(product._id)" class="btn btn-secondary pb-2 px-3"><i class="material-icons align-middle">edit</i></button>
										<button @click="deleteProduct(product._id)" class="btn btn-danger pb-2 px-3"><i class="material-icons align-middle">delete</i></button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-md-2"></div>
			</div>
		</div>

	</div>
</template>

<script>

	class Product {

		constructor(name, price) {
			
			this.name = name;
			this.price = price;

		}

	}

	export default {

		data() {
			return {
				product: new Product(),
				products: [],
				edit: false,
				productToEdit: ''
			}
		},
		created() {
			this.getProducts();
		},
		methods: {
			getProducts() {

				fetch('/api/products').then(response => response.json())
					.then(data => {
						this.products = data
					})
					.catch(err => console.log(err));

			},
			sendProduct() {

				if (this.edit === false) {

					fetch('/api/products', {
						method: 'POST',
						body: JSON.stringify(this.product),
						headers: {
							'Accept': 'application/json',
							'Content-type': 'application/json'
						}
					})
						.then(response => response.json())
						.then(data => this.getProducts())
						.catch(err => console.log(err));
					
					//this.product.name = '';
					//this.product.price = '';

					this.product = new Product();

					$("#added").removeClass("d-none");

					setTimeout(function() {
						$("#added").addClass("d-none");
					}, 3000);

				} else {

					fetch('/api/products/' + this.productToEdit, {
						method: 'PUT',
						body: JSON.stringify(this.product),
						headers: {
							'Accept': 'application/json',
							'Content-type': 'application/json'
						}

					})
						.then(response => response.json())
						.then(data => {

							this.product = new Product();
							this.edit = false;
							this.getProducts();

							$("#udated").removeClass("d-none");

							setTimeout(function() {
								$("#udated").addClass("d-none");
							}, 3000);

						})
						.catch(err => console.log(err));

				}

			},
			editProduct(id) {

				fetch('/api/products/' + id, {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-type': 'application/json'
					}
				})
					.then(response => response.json())
					.then(data => {
						this.product = new Product(data.name, data.price);
						this.edit = true;
						this.productToEdit = data._id;
					})
					.catch(err => console.log(err));

			},
			deleteProduct(id) {
				
				fetch('/api/products/' + id, {
					method: 'DELETE',
					headers: {
						'Accept': 'application/json',
						'Content-type': 'application/json'
					}
				})
					.then(response => response.json())
					.then(data => {

						this.getProducts()
						
						$("#deleted").removeClass("d-none");

						setTimeout(function() {
							$("#deleted").addClass("d-none");
						}, 3000);

						})
					.catch(err => console.log(err));

			}

		}
	}
</script>
