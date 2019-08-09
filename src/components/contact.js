import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig, email } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const ContactContainer = styled(Section)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 100px;
  a {
    ${mixins.inlineLink};
  }
`;
const GreenHeading = styled(Heading)`
  display: block;
  color: ${colors.underscoreGrey};
  font-size: ${fontSizes.medium};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin-bottom: 20px;
  justify-content: center;
  ${media.desktop`font-size: ${fontSizes.small};`};
  &:before {
    bottom: 0;
    font-size: ${fontSizes.small};
    ${media.desktop`font-size: ${fontSizes.smallish};`};
  }
  &:after {
    display: none;
  }
`;
const Title = styled.h4`
  margin: 0 0 20px;
  font-size: 60px;
  color: ${colors.underscoreBlack};
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
`;
const EmailLink = styled.a`
  color: ${colors.underscoreBlack};
  background-color: transparent;
  border: 1px solid ${colors.underscoreBlack};
  border-radius: ${theme.borderRadius};
  padding: 1.25rem 1.75rem;
  font-size: ${fontSizes.small};
  font-family: ${fonts.SFMono};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: ${theme.transition};
  &:hover,
  &:active {
    background-color: ${colors.highlight};
    color: ${colors.underscoreBlack};
    border: 1px solid ${colors.highlight};
  }
  &:focus,
  &:after {
    display: none !important;
  }
  margin-top: 50px;
`;

const Contact = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <ContactContainer id="contact" ref={revealContainer}>
      <GreenHeading>What&apos;s Up?</GreenHeading>

      <Title>{title}</Title>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <EmailLink href={`mailto:${email}`} target="_blank" rel="nofollow noopener noreferrer">
        Say Hello
      </EmailLink>
    </ContactContainer>
  );
};

Contact.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Contact;
