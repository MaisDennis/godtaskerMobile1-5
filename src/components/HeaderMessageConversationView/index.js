import React from 'react'
import {
  AlignView,
  HeaderContainer, HeaderImage, HeaderImageBackgroundView,
  HeaderText,
} from './styles';
import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';

export default function HeaderView({data}) {
  console.log(data)
  const user_name = data.user_name;
  const avatar = data.avatar;

  return (
    <AlignView>
    <HeaderContainer>
      { avatar === undefined || avatar === null
        ? (
          <HeaderImageBackgroundView>
            <HeaderImage/>
          </HeaderImageBackgroundView>
        )
        : (
          <HeaderImageBackgroundView>
            <HeaderImage
              source={{ uri: avatar.url}}
            />
          </HeaderImageBackgroundView>
        )
      }
      <HeaderText>{user_name}</HeaderText>
    </HeaderContainer>
    </AlignView>
  )
}

