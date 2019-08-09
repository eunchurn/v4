import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { siteUrl, siteName } from '@config';
import styled from 'styled-components';
import { theme, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const UrlContainer = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  right: 40px;
  color: ${colors.underscoreGrey};
  ${media.desktop`right: 25px;`};
  ${media.tablet`display: none;`};
  div {
    width: 100%;
    margin: 0 auto;
  }
`;
const UrlLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${colors.lightSlate};
  }
`;
const UrlLink = styled.a`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xsmall};
  letter-spacing: 0.5px;
  writing-mode: vertical-rl;
  margin: 20px auto;
  padding: 10px;

  &:hover {
    color: ${colors.highlight};
    transform: translateY(-3px);
  }
  &:focus {
    transform: translateY(-3px);
  }
`;

const Url = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <UrlContainer>
      <TransitionGroup>
        {isMounted && (
          <CSSTransition timeout={3000} classNames="fade">
            <UrlLinkWrapper>
              <UrlLink href={siteUrl}>{siteName}</UrlLink>
            </UrlLinkWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    </UrlContainer>
  );
};

export default Url;
