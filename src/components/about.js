import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import Cv from '@components/cv';

const { colors, fontSizes, fonts } = theme;

const AboutContainer = styled(Section)`
  position: relative;
`;
const FlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;
const ContentContainer = styled.div`
  width: 90%;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  overflow: hidden;
  margin-top: 20px;
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smallish};
  color: ${colors.underscoreGrey};
  &:before {
    content: '#';
    position: absolute;
    left: 0;
    color: ${colors.underscorePink};
    font-size: ${fontSizes.small};
    line-height: 12px;
  }
`;

const About = ({ data, cvdata }) => {
  const { frontmatter, html } = data[0].node;
  const { title, skills } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <AboutContainer id="about" ref={revealContainer}>
      <Heading>{title}</Heading>
      <FlexContainer>
        <ContentContainer>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <SkillsContainer>
            {skills && skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
          </SkillsContainer>
        </ContentContainer>
      </FlexContainer>
      <Cv data={cvdata} />
    </AboutContainer>
  );
};

About.propTypes = {
  data: PropTypes.array.isRequired,
  cvdata: PropTypes.array.isRequired,
};

export default About;
