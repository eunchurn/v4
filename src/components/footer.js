import React from 'react';
import PropTypes from 'prop-types';
import {
  IconGithub,
  IconLinkedin,
  IconCodepen,
  IconInstagram,
  IconTwitter,
  // IconStar,
  // IconFork,
  IconVimeo,
} from '@components/icons';
import { socialMedia } from '@config';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const FooterContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  background-color: ${colors.darkNavy};
  color: ${colors.slate};
  text-align: center;
  height: auto;
  min-height: 70px;
`;
const SocialContainer = styled.div`
  color: ${colors.lightSlate};
  width: 100%;
  max-width: 270px;
  margin: 0 auto 10px;
  display: none;
  ${media.tablet`display: block;`};
`;
const SocialItemList = styled.ul`
  ${mixins.flexBetween};
`;
const SocialLink = styled.a`
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Copy = styled.div`
  margin: 10px 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.small};
  line-height: 1;
`;

const Heart = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 100px;
  position: relative;
  background: url(https://cssanimation.rocks/images/posts/steps/heart.png) no-repeat;
  background-position: 0 0;
  cursor: pointer;
  animation: fave-heart 1s steps(28);
  &:hover {
    background-position: -2800px 0;
    transition: background 1s steps(28);
  }
  @keyframes fave-heart {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -2800px 0;
    }
  }
`;
// const GithubLink = styled.a`
//   color: ${colors.slate};
// `;
// const GithubInfo = styled.div`
//   margin-top: 10px;

//   & > span {
//     display: inline-flex;
//     align-items: center;
//     margin: 0 7px;
//   }
//   svg {
//     display: inline-block;
//     height: 15px;
//     width: auto;
//     margin-right: 5px;
//   }
// `;

const Footer = () => (
  <FooterContainer>
    <SocialContainer>
      <SocialItemList>
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <SocialLink
                href={url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={name}>
                {name === 'Github' ? (
                  <IconGithub />
                ) : name === 'Linkedin' ? (
                  <IconLinkedin />
                ) : name === 'Codepen' ? (
                  <IconCodepen />
                ) : name === 'Instagram' ? (
                  <IconInstagram />
                ) : name === 'Twitter' ? (
                  <IconTwitter />
                ) : name === 'Vimeo' ? (
                  <IconVimeo />
                ) : (
                  <IconGithub />
                )}
              </SocialLink>
            </li>
          ))}
      </SocialItemList>
    </SocialContainer>
    <Copy>
      <div>&copy; 2019 underscore, all rights reserved.</div>
      <div>
        Made with <Heart /> in Seoul
      </div>
    </Copy>
  </FooterContainer>
);

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
