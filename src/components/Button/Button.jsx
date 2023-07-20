import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ text, onLoadMore }) => {
  return (
    <button className={css.button} type="button" onClick={onLoadMore}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
