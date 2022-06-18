import PropTypes from 'prop-types';
import styles from './PopperWrap.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PopperWrap({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

PopperWrap.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default PopperWrap;
