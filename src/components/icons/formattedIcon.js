import React from 'react';
import PropTypes from 'prop-types';
import { IconGithub, IconInstagram, IconTwitter, IconVimeo } from '@components/icons';

const FormattedIcon = ({ name }) => {
  switch (name) {
    case 'Github':
      return <IconGithub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Twitter':
      return <IconTwitter />;
    case 'Vimeo':
      return <IconVimeo />;
    default:
      return <IconGithub />;
  }
};

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormattedIcon;
