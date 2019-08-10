import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { navLinks, navHeight } from '@config';
import { Menu } from '@components';
import { IconLogo } from '@components/icons';
import styled from 'styled-components';
import { throttle } from '@utils';
import { theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const NavContainer = styled.header`
  ${mixins.flexBetween};
  position: fixed;
  top: 0;
  padding: 0px 50px;
  background-color: ${props =>
    props.scrollDirection === 'none' ? colors.underscoreWhiteOp : colors.underscoreWhite};
  transition: ${theme.transition};
  z-index: 11;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  width: 100%;
  height: ${props => (props.scrollDirection === 'none' ? theme.navHeight : theme.navScrollHeight)};
  box-shadow: ${props =>
    props.scrollDirection === 'up' ? `0 10px 30px -10px ${colors.shadowNavy}` : 'none'};
  transform: translateY(
    ${props => (props.scrollDirection === 'down' ? `-${theme.navScrollHeight}` : '0px')}
  );
  ${media.desktop`padding: 0 40px;`};
  ${media.tablet`padding: 0 25px;`};
`;
const Navbar = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100%;
  color: ${colors.underscoreBlack};
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 12;
`;
const Logo = styled.div`
  ${mixins.flexCenter};
  isolation: isolate;
  mix-blend-mode: multiply;
  path {
    mix-blend-mode: multiply;
  }
`;
const LogoLink = styled(AnchorLink)`
  display: block;
  color: ${colors.green};
  width: 160px;
  height: 40px;
  &:hover,
  &:active {
    svg {
      fill: ${colors.transGreen};
    }
  }
  svg {
    fill: none;
    transition: ${theme.transition};
    user-select: none;
  }
`;
const Hamburger = styled.div`
  ${mixins.flexCenter};
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  display: none;
  ${media.tablet`display: flex;`};
`;
const HamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: ${theme.hamburgerWidth}px;
  height: 24px;
`;
const HamburgerInner = styled.div`
  background-color: ${props =>
    props.menuOpen ? `${colors.underscoreWhite}` : `${colors.underscoreBlack}`};
  position: absolute;
  width: ${theme.hamburgerWidth}px;
  height: 2px;
  border-radius: ${theme.borderRadius};
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
  transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: ${props =>
    props.menuOpen ? `${colors.underscoreWhite}` : `${colors.underscoreBlack}`};
    position: absolute;
    left: auto;
    right: 0;
    width: ${theme.hamburgerWidth}px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${props => (props.menuOpen ? `100%` : `100%`)};
    color: ${props => (props.menuOpen ? `${colors.underscoreWhite}` : `${colors.underscoreBlack}`)};
    top: ${props => (props.menuOpen ? `0` : `-10px`)};
    opacity: ${props => (props.menuOpen ? 0 : 1)};
    transition: ${props => (props.menuOpen ? theme.hamBeforeActive : theme.hamBefore)};
  }
  &:after {
    width: ${props => (props.menuOpen ? `100%` : `100%`)};
    bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
    transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
    transition: ${props => (props.menuOpen ? theme.hamAfterActive : theme.hamAfter)};
  }
`;
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet`display: none;`};
`;
const NavList = styled.ol`
  div {
    ${mixins.flexBetween};
  }
`;

const NavListItem = styled.li`
  margin: 0 10px;
  position: relative;
  font-size: ${fontSizes.smallish};
  counter-increment: item 1;
  // background-image: linear-gradient(120deg, #ff00b0 0%, #8fd3f4 100%);
  // background-repeat: no-repeat;
  // background-size: 100% 0.2em;
  // background-position: 0 88%;
  transition: background-size 0.25s ease-in;
  &:hover {
    background-size: 100% 88%;
  }
  &:after {
    display: none !important;
  }
  // &:before {
  //   content: '0' counter(item) '.';
  //   text-align: right;
  //   color: ${colors.green};
  //   font-size: ${fontSizes.xsmall};
  // }
`;

const NavLink = styled(AnchorLink)`
  padding: 12px 10px;
  position: relative;
  text-decoration: none;
  display: inline-block;
  &:after {
    display: block;
    content: '';
    border-bottom: solid 1px
      ${props => (props.scrollDirection === 'none' ? colors.highlight : colors.underscoreBlack)};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 100% 50%;
  }
  &:hover {
    color: ${colors.underscoreGrey};
    &:after {
      transform: scaleX(1);
      transform-origin: 0 50%;
    }
  }
  &:focus {
    color: ${colors.underscoreBlack};
  }
`;

const DELTA = 5;

class Nav extends Component {
  state = {
    isMounted: false,
    menuOpen: false,
    scrollDirection: 'none',
    lastScrollTop: 0,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isMounted: true }), 100);

    window.addEventListener('scroll', () => throttle(this.handleScroll()));
    window.addEventListener('resize', () => throttle(this.handleResize()));
    window.addEventListener('keydown', e => this.handleKeydown(e));
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });

    window.removeEventListener('scroll', () => this.handleScroll());
    window.removeEventListener('resize', () => this.handleResize());
    window.removeEventListener('keydown', e => this.handleKeydown(e));
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

  handleScroll = () => {
    const { isMounted, menuOpen, scrollDirection, lastScrollTop } = this.state;
    const fromTop = window.scrollY;

    // Make sure they scroll more than DELTA
    if (!isMounted || Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
      return;
    }

    if (fromTop < DELTA) {
      this.setState({ scrollDirection: 'none' });
    } else if (fromTop > lastScrollTop && fromTop > navHeight) {
      if (scrollDirection !== 'down') {
        this.setState({ scrollDirection: 'down' });
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      if (scrollDirection !== 'up') {
        this.setState({ scrollDirection: 'up' });
      }
    }

    this.setState({ lastScrollTop: fromTop });
  };

  handleResize = () => {
    if (window.innerWidth > 768 && this.state.menuOpen) {
      this.toggleMenu();
    }
  };

  handleKeydown = e => {
    if (!this.state.menuOpen) {
      return;
    }

    if (e.which === 27 || e.key === 'Escape') {
      this.toggleMenu();
    }
  };

  render() {
    const { isMounted, menuOpen, scrollDirection } = this.state;

    return (
      <NavContainer scrollDirection={scrollDirection}>
        <Helmet>
          <body className={menuOpen ? 'blur' : ''} />
        </Helmet>
        <Navbar>
          <TransitionGroup>
            {isMounted && (
              <CSSTransition classNames="fade" timeout={3000}>
                <Logo>
                  <LogoLink href="/" aria-label="home">
                    <IconLogo />
                  </LogoLink>
                </Logo>
              </CSSTransition>
            )}
          </TransitionGroup>

          <TransitionGroup>
            {isMounted && (
              <CSSTransition classNames="fade" timeout={3000}>
                <Hamburger onClick={this.toggleMenu}>
                  <HamburgerBox>
                    <HamburgerInner menuOpen={menuOpen} />
                  </HamburgerBox>
                </Hamburger>
              </CSSTransition>
            )}
          </TransitionGroup>

          <NavLinks>
            <NavList>
              <TransitionGroup>
                {isMounted &&
                  navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <CSSTransition key={i} classNames="fadedown" timeout={3000}>
                      <NavListItem key={i} style={{ transitionDelay: `${i * 100}ms` }}>
                        <NavLink href={url}>{name}</NavLink>
                      </NavListItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </NavList>
          </NavLinks>
        </Navbar>

        <Menu menuOpen={menuOpen} toggleMenu={this.toggleMenu} />
      </NavContainer>
    );
  }
}

export default Nav;
