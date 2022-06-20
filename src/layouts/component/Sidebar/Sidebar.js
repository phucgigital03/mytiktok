import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu from './Menu';
import { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupICon,
    UserGroupActiveICon,
    LiveActiveICon,
    LiveICon,
} from '~/component/Icons';

const cx = classNames.bind(styles);

const iconMenu = {
    Home: {
        normal: <HomeIcon />,
        active: <HomeActiveIcon />,
    },
    User: {
        normal: <UserGroupICon />,
        active: <UserGroupActiveICon />,
    },
    Live: {
        normal: <LiveICon />,
        active: <LiveActiveICon />,
    },
};

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" icon={iconMenu.Home} to={config.routes.home}></MenuItem>
                <MenuItem title="Flowwing" icon={iconMenu.User} to={config.routes.following}></MenuItem>
                <MenuItem title="Live" icon={iconMenu.Live} to={config.routes.live}></MenuItem>
            </Menu>
        </aside>
    );
}

export default Sidebar;
