import styled from 'styled-components';
import theme from './theme';
const { colors, fontSizes, fonts } = theme;

const Button = styled.button`
  color: ${colors.underscoreGrey};
  background-color: transparent;
  border: 1px solid ${colors.underscoreGrey};
  border-radius: ${theme.borderRadius};
  font-size: ${fontSizes.smallish};
  font-family: ${fonts.SFMono};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: ${theme.transition};
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: ${colors.highlight};
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

export default Button;
