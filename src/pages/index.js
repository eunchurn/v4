import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, Intro, About, Featured, Projects, Contact } from '@components';
import styled from 'styled-components';
import { mixins, Main } from '@styles';

const MainContainer = styled(Main)`
  ${mixins.sidePadding};
  counter-reset: section;
`;

const IndexPage = ({ data }) => (
  <Layout>
    <MainContainer id="content">
      <Intro data={data.intro.edges} />
      <About data={data.about.edges} cvdata={data.cv.edges} />
      <Featured data={data.featured.edges} />
      <Projects data={data.projects.edges} />
      <Contact data={data.contact.edges} />
    </MainContainer>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    intro: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/intro/" } }) {
      edges {
        node {
          frontmatter {
            title
            name
            subtitle
            buttonText
            vimeoLink
            youtubeLink
          }
          html
        }
      }
    }
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            skills
          }
          html
        }
      }
    }
    cv: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/cv/" } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
    featured: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/featured/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            hashtag
            range
            place
            press
            external
            show
          }
          html
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 437, maxHeight: 246, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            tech
            external
            show
          }
          html
        }
      }
    }
    contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;
