// Externals
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Banner from '../../components/Banner';
import ContentView from '../../components/ContentView';
import FlexView from '../../components/FlexView';
import Product from '../../components/Product';
import Text from '../../components/Text';

// Actions
import { resetOrder } from '../App/actions';

// Utils
import { stepShape } from '../../utils/shapes';

class OrderConfirmation extends React.Component {

  static propTypes = {
    image: PropTypes.string.isRequired,
    popFirstScene: PropTypes.func.isRequired,
    resetOrder: PropTypes.func.isRequired,
    step: stepShape.isRequired,
  };

  onNextStep = () => {
    this.props.resetOrder();
    this.props.popFirstScene();
  }

  render() {
    return (
      <FlexView>
        <ContentView center>
          <Text size={24}>
            Merci pour votre commande !
          </Text>
          <Text spaced>
            Vous recevrez un email de confirmation dès que votre commande sera envoyée.
          </Text>
          <Product
            height={0}
            image={this.props.image}
          />
        </ContentView>
        <Banner
          {...this.props.step}
          onPress={this.onNextStep}
        />
      </FlexView>
    );
  }

}

export default connect(
  (state) => {
    const product = state.products.data.find(p => p.product_id === state.order.product);
    const image = product.images.find(i => i.variant_ids[0] === state.order.variant);

    return {
      image: image.src,
    };
  },
  dispatch => bindActionCreators({
    resetOrder,
  }, dispatch),
)(OrderConfirmation);