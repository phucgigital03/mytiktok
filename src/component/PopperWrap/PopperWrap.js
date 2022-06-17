import styles from './PopperWrap.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PopperWrap({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default PopperWrap;
