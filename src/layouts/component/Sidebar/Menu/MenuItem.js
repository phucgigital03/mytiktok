import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon }) {
    return (
        <NavLink
            to={to}
            className={(nav) => {
                cx('menu-item', {
                    active: nav.isActive,
                });
            }}
        >
            <span className={cx('icon-normal')}>{icon.normal}</span>
            <span className={cx('icon-active')}>{icon.active}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
