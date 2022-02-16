// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
		from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Switch,
	Route, Link } from "react-router-dom";

// Import other React Component
import CreateMovie from
	"./Components/create-movie.component";
import EditMovie from
	"./Components/edit-movie.component";
import MovieList from
	"./Components/movie-list.component";

// App Component
const App = () => {
return (
	<Router>
	<div className="App">
		<header className="App-header">
		<Navbar bg="dark" variant="dark">
			<Container>
			<Navbar.Brand>
				<Link to={"/create-Movie"}
				className="nav-link">
				React CRUD
				</Link>
			</Navbar.Brand>

			<Nav className="justify-content-end">
				<Nav>
				<Link to={"/create-Movie"}
					className="nav-link">
					Create Movie
				</Link>
				</Nav>

				<Nav>
				<Link to={"/Movie-list"}
					className="nav-link">
					Movie List
				</Link>
				</Nav>
			</Nav>
			</Container>
		</Navbar>
		</header>

		<Container>
		<Row>
			<Col md={12}>
			<div className="wrapper">
				<Switch>
				<Route exact path="/"
					component={CreateMovie} />
				<Route path="/create-Movie"
					component={CreateMovie} />
				<Route path="/edit-Movie/:id"
					component={EditMovie} />
				<Route path="/Movie-list"
					component={MovieList} />
				</Switch>
			</div>
			</Col>
		</Row>
		</Container>
	</div>
	</Router>
);
};

export default App;
