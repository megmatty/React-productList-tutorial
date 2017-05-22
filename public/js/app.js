class ProductList extends React.Component {
	constructor(props) {
		super(props);
		//Initialize state inside the constructor
			//Initial state will be empty array
		this.state = {
			products: [],
		};

		//Because handleProductUpVote references this, must manually
			//set the binding here
		this.handleProductUpVote = this.handleProductUpVote.bind(this);

	}
	//When the component loads, set the state using this.setState
	componentDidMount() {
		this.setState({ products: Seed.products });
	}

	handleProductUpVote(productId) {
		const nextProducts = this.state.products.map((product) => {
				if (product.id === productId) {
					//If matches, use Object.assign to create 
						//a NEW object & copy properties
					//Then set to the incremented vote count
					return Object.assign({}, product, {
						votes: product.votes + 1,
					});
				} else {
					return product;
				}
			});
		this.setState({
			products: nextProducts,
		});
	}

	render() {
		//Sort the array by number of votes
		const products = this.state.products.sort((a,b) => (
			b.votes - a.votes
		));

		//Map array of products to product component
		const productComponents = products.map((product) => (
			<Product
				key={'product-' + product.id}
				id={product.id}
				title={product.title}
				description={product.description}
				url={product.url}
				votes={product.votes}
				submitterAvatarUrl={product.submitterAvatarUrl}
				productImageUrl={product.productImageUrl}
				onVote={this.handleProductUpVote}
			/>
		));
		return (
			<div className="ui stackable items">
				{productComponents}
			</div>
		);
	}
}

class Product extends React.Component {
	constructor(props) {
		super(props);
		//Custom method bindings go here with .bind(this)
		this.handleUpVote = this.handleUpVote.bind(this);
	}
	//Custom method to handle upvotes, bound to this above
	handleUpVote() {
		this.props.onVote(this.props.id);
	}
	render() {
		return (
			<div className="item">
				<div className="image">
					<img src={this.props.productImageUrl} />
				</div>
				<div className="middle aligned content">
					<div className="header">
						<a onClick={this.handleUpVote}>
							<i className="large caret up icon" />
						</a>
						{this.props.votes}
					</div>
					<div className="description">
						<a href={this.props.url}>
							{this.props.title}
						</a>
						<p>
							{this.props.description}
						</p>
					</div>
					<div className="extra">
						<span>Submitted by:</span>
						<img className="ui avatar image" src={this.props.submitterAvatarUrl}/>
					</div>
				</div>
			</div>
		);
	}
}



ReactDOM.render(
	<ProductList />,
	document.getElementById('content')
);