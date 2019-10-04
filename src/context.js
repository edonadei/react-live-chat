import React, { Component } from "react";

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    // Mode
    a: 0,
    b: 1,
    c: 2
  };

  componentDidMount() {
  }

  randomMethod = () => {
    this.setState(() => {
      return { a: 1 };
    });

  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          randomMethod: this.randomMethod,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
