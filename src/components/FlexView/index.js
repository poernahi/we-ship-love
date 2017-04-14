// Externals
import React, { PropTypes } from 'react';

// Styles
import StyledView from './styles';

// Utils
import { childrenShape } from '../../utils/shapes';

class FlexView extends React.Component {

  static propTypes = {
    background: PropTypes.string,
    centered: PropTypes.bool,
    children: childrenShape.isRequired,
    height: PropTypes.number,
  }

  static defaultProps = {
    background: 'transparent',
    centered: false,
    height: 0,
  };

  setNativeProps(nativeProps) {
    this.view.setNativeProps(nativeProps);
  }

  render() {
    return (
      <StyledView
        {...this.props}
        background={this.props.background}
        centered={this.props.centered}
        height={this.props.height}
        ref={(c) => { this.view = c; }}
      >
        {this.props.children}
      </StyledView>
    );
  }
}

export default FlexView;
