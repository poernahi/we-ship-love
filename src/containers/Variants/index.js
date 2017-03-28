// Externals
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Containers & components
import CallToAction from '../../components/CallToAction';
import ContentView from '../../components/ContentView';
import FlexView from '../../components/FlexView';
import Product from '../../components/Product';
import Slider from '../../components/Slider';

// Actions
import {
  setOrderVariant,
  setRemoteCheckout,
} from '../App/actions';

// Utils
import { variantShape } from '../../utils/shapes';

class Variants extends React.Component {

  static propTypes = {
    pushNextScene: PropTypes.func.isRequired,
    setOrderVariant: PropTypes.func.isRequired,
    setRemoteCheckout: PropTypes.func.isRequired,
    variants: PropTypes.arrayOf(variantShape),
  };

  static defaultProps = {
    variants: [],
  };

  state = {
    index: 0,
  };

  onIndexChange = (index) => {
    this.setState({ index });
  }

  onNextStep = () => {
    const variant = this.props.variants[this.state.index];

    // Set the order's variant, create a checkout on the API and go to the next screen
    this.props.setOrderVariant(variant);
    this.props.setRemoteCheckout(variant)
      .then(this.props.pushNextScene)
      .catch(e => console.warn(e)); // eslint-disable-line no-console
  }

  renderContent() {
    return (
      <Slider onIndexChange={this.onIndexChange}>
        {this.props.variants.map(item => (
          <Product
            key={item.id}
          />
        ))}
      </Slider>
    );
  }

  render() {
    const variant = this.props.variants[this.state.index];
    const variantTitle = `${variant.title} = ${variant.price}€`;

    return (
      <FlexView>
        <ContentView>
          {this.renderContent()}
        </ContentView>
        <CallToAction
          onPress={this.onNextStep}
          text="Choisissez un supplément"
          textComplement={variantTitle}
        />
      </FlexView>
    );
  }

}

export default connect(
  state => ({
    variants: state.products.data.find(p => p.product_id === state.order.product).variants,
  }),
  dispatch => bindActionCreators({
    setOrderVariant,
    setRemoteCheckout,
  }, dispatch),
)(Variants);
