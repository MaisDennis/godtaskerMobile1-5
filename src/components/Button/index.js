import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
// -----------------------------------------------------------------------------
import { Container } from './styles';
// -----------------------------------------------------------------------------
export default function Button({ children, loading, ...rest }) {
  // -----------------------------------------------------------------------------
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <View>{children}</View>
      )}
    </Container>
  );
}
Button.propTypes = {
  // children: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};
Button.defaultProps = {
  loading: false,
};
