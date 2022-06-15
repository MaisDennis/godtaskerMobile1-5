import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import DropShadow from "react-native-drop-shadow";
// -----------------------------------------------------------------------------
import { Container, ButtonIcon, ButtonText, ButtonWrapper } from './styles';
// -----------------------------------------------------------------------------
export default function Button({
  backgroundColor,
  children,
  icon,
  iconSize,
  loading,
  text,
  textColor,
  type,
  small,
  ...rest
}) {
  const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#666',
        shadowOffset: {width: 0.5, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
  })
  // -----------------------------------------------------------------------------
  return (
    <Container
      type={type}
      small={small}
      text={text}
    >
      <DropShadow style={styles.shadowProp}>
        <ButtonWrapper
          backgroundColor={backgroundColor}
          type={type}
          small={small}
          text={text}
          textColor={textColor}
          {...rest}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
            <ButtonIcon name={icon} size={iconSize}/>
            <ButtonText
              type={type}
              text={text}
              textColor={textColor}
              border
            >{children}</ButtonText>
            </>
          )}
        </ButtonWrapper>
      </DropShadow>
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
