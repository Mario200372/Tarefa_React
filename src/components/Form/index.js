import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Form.css';

export default function Form({ handleChange, handleSubmit, novatarefa }) {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        value={novatarefa}
        onChange={handleChange}
        type="text"
      />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  novatarefa: PropTypes.string.isRequired,
};
