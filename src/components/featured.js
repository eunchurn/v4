import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { IconGithub, IconExternal } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const FeaturedContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;
const ContentContainer = styled.div`
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;
  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
  `};
  ${media.phablet`padding: 30px 25px 20px;`};
`;
const FeaturedLabel = styled.h4`
  font-size: ${fontSizes.smallish};
  font-weight: normal;
  color: ${colors.underscorePink};
  font-family: ${fonts.SFMono};
  margin-top: 10px;
  padding-top: 0;
`;
const ProjectName = styled.h5`
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 0px;
  color: ${colors.underscoreGrey};
  ${media.tablet`font-size: 24px;`};
  a {
    &:hover,
    &:active {
      color: ${colors.underscoreBlack} !important;
    }
    &:focus {
      display: none !important;
    }
    ${media.tablet`display: block;`};
  }
`;

const PlaceRange = styled.h6`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 20px;
  text-aling: left;
  color: ${colors.underscoreGrey};
  ${media.tablet`font-size: 13px;`};
  a {
    &:hover,
    &:active {
      color: ${colors.underscoreBlack} !important;
    }
    &:focus {
      display: none !important;
    }
    ${media.tablet`display: block;`};
  }
`;

const ProjectDescription = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 10;
  padding: 25px;
  background-color: ${colors.underscoreWhiteLightOp};
  color: ${colors.underscoreBlack};
  // font-family: ${fonts.NanumSquare};
  font-size: ${fontSizes.small};
  border-radius: ${theme.borderRadius};
  ${media.thone`
    color: ${colors.underscoreBlack};
    background-color: ${colors.underscoreWhite};
    padding: 20px 0;
  `};
  p {
    margin: 15px;
  }
  a {
    ${mixins.inlineLink};
    color: ${colors.blue};
  }
`;
const HashtagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 25px 0 10px;
  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xsmall};
    color: ${colors.lightSlate};
    margin-right: ${theme.margin};
    margin-bottom: 7px;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    ${media.thone`
      color: ${colors.lightestSlate};
      margin-right: 10px;
    `};
  }
`;
const Links = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  a {
    padding: 10px;
    svg {
      width: 22px;
      height: 22px;
    }
    &:hover,
    &:active {
      color: ${colors.highlight} !important;
    }
    &:focus {
      display: none !important;
    }
  }
  ${media.thone`
    color: ${colors.underscoreWhite};
  `};
`;
const FeaturedImg = styled(Img)`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
  border-radius: ${theme.borderRadius};
  position: relative;
  mix-blend-mode: multiply;
  // filter: grayscale(100%) contrast(1) brightness(90%);
  ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
    // filter: grayscale(100%) contrast(1) brightness(80%);
  `};
`;
const ImgContainer = styled.a`
  ${mixins.boxShadow};
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  background-color: ${colors.underscoreBlackOp};
  border-radius: ${theme.radius + 1}px;
  transition: ${theme.transition};
  ${media.tablet`height: 100%;`};
  ${media.thone`
    grid-column: 1 / -1;
    // opacity: 0.25;
    z-index: -1;
    background-color: ${colors.underscoreBlackOp};
  `};
  &:hover,
  &:focus {
    background: transparent;
    &:before,
    ${FeaturedImg} {
      background: transparent;
      filter: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: ${theme.transition};
    background-color: ${colors.navy};
    mix-blend-mode: screen;
  }
`;
const Project = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-bottom: 100px;
  ${media.thone`margin-bottom: 70px;`};
  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-of-type(odd) {
    ${FeaturedLabel} {
      text-align: right;
    }
    ${ProjectName} {
      text-align: right;
    }
    ${PlaceRange} {
      text-align: right;
    }
    ${ContentContainer} {
      grid-column: 7 / -1;
      text-align: left;
      ${media.thone`
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      `};
      ${media.phablet`padding: 30px 25px 20px;`};
    }
    ${HashtagList} {
      justify-content: flex-end;
      text-align: right;
      margin-left: 30px;
      li {
        margin-left: ${theme.margin};
        margin-right: 5px;
      }
    }
    ${Links} {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
      ${media.thone`
      color: ${colors.underscoreWhite};
    `};
    }
    ${ImgContainer} {
      grid-column: 1 / 8;
      ${media.tablet`height: 100%;`};
      ${media.thone`
        grid-column: 1 / -1;
        // opacity: 0.25;
        z-index: -1;
      `};
    }
  }
`;

const Featured = ({ data }) => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const featuredProjects = data.filter(({ node }) => node.frontmatter.show === 'true');

  return (
    <FeaturedContainer id="projects">
      <Heading ref={revealTitle}>
        <span role="img" aria-label="Film">
          🎬 works
        </span>
      </Heading>

      <div>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, hashtag, github, place, range, cover } = frontmatter;

            return (
              <Project key={i} ref={el => (revealProjects.current[i] = el)}>
                <ContentContainer>
                  <FeaturedLabel>Featured Project</FeaturedLabel>
                  <ProjectName>
                    {
                      <a
                        href={external ? external : null}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="External Link">
                        {title}
                      </a>
                    }
                  </ProjectName>
                  <PlaceRange>
                    {range} | {place}
                  </PlaceRange>
                  <ProjectDescription dangerouslySetInnerHTML={{ __html: html }} />
                  {hashtag && (
                    <HashtagList>
                      {hashtag.map((hashtag, i) => (
                        <li key={i}>{hashtag}</li>
                      ))}
                    </HashtagList>
                  )}
                  <Links>
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="Github Link">
                        <IconGithub />
                      </a>
                    )}
                    {external && (
                      <a
                        href={external}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="External Link">
                        <IconExternal />
                      </a>
                    )}
                  </Links>
                </ContentContainer>

                <ImgContainer
                  href={external ? external : github ? github : null}
                  target="_blank"
                  rel="nofollow noopener noreferrer">
                  <FeaturedImg fluid={cover.childImageSharp.fluid} />
                </ImgContainer>
              </Project>
            );
          })}
      </div>
    </FeaturedContainer>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
