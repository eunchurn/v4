import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
import underscore from '../assets/studio-underscore_open.mp4';

const { colors, fontSizes, fonts } = theme;

const HeroContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  iframe {
    width: 100vw;
    height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
    min-height: 100vh;
    min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

// const Title = styled.h1`
//   color: ${colors.underscoreBlack};
//   margin: 0 0 20px 3px;
//   font-size: ${fontSizes.medium};
//   font-weight: normal;
//   ${media.desktop`font-size: ${fontSizes.small};`};
//   ${media.tablet`font-size: ${fontSizes.smallish};`};
// `;
const Name = styled.h2`
  font-size: 80px;
  color: ${colors.underscoreWhite};
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const Subtitle = styled.h3`
  font-size: 50px;
  line-height: 1.1;
  color: ${colors.underscoreBlack};
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
  ${media.phablet`font-size: 30px;`};
  ${media.phone`font-size: 30px;`};
`;
const Blurb = styled.div`
  margin-top: 25px;
  width: 50%;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;
const AboutLink = styled(AnchorLink)`
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

const Intro = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const { frontmatter, html } = data[0].node;

  // const one = () => <Title style={{ transitionDelay: '100ms' }}>{frontmatter.title}</Title>;
  const two = () => <Name style={{ transitionDelay: '200ms' }}>{frontmatter.name}</Name>;
  const three = () => (
    <Subtitle style={{ transitionDelay: '300ms' }}>{frontmatter.subtitle}</Subtitle>
  );
  const four = () => (
    <Blurb style={{ transitionDelay: '400ms' }} dangerouslySetInnerHTML={{ __html: html }} />
  );
  const five = () => (
    <div style={{ transitionDelay: '500ms' }}>
      <AboutLink href={'#about'}>{frontmatter.buttonText}</AboutLink>
    </div>
  );

  const items = [two, three, four, five];
  return (
    <HeroContainer id="intro">
      <VideoWrapper>
        <video autoPlay loop muted playsInline>
          <source src={underscore} type="video/mp4" />
        </video>
      </VideoWrapper>
      <TransitionGroup>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={3000}>
              {item}
            </CSSTransition>
          ))}
      </TransitionGroup>
    </HeroContainer>
  );
};

Intro.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Intro;
