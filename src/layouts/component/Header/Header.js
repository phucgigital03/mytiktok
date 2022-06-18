import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faPlus,
    faQuestion,
    faUser,
    faSignIn,
    faCoins,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import Image from '~/component/Image';
import Button from '~/component/Button';
import Menu from '~/component/PopperWrap/Menu';
import { UploadIcon, MessageIcon, InboxIcon } from '~/component/Icons';
import SearchHeader from '../SearchHeader';
import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'English',
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'ja',
                    title: 'Japan',
                },
            ],
        },
    },
    {
        title: 'Feedback and help',
        icon: <FontAwesomeIcon icon={faQuestion} />,
        to: '/feedback',
    },
    {
        title: 'Keyboard shortcuts',
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        model: true,
    },
];

const AVATARITEMS = [
    {
        title: 'View Profile',
        icon: <FontAwesomeIcon icon={faUser} />,
        to: '/@hoaa',
    },
    {
        title: 'Settings',
        icon: <FontAwesomeIcon icon={faGear} />,
        to: '/setting',
    },
    {
        title: 'Get coins',
        icon: <FontAwesomeIcon icon={faCoins} />,
        to: '/coins',
    },
    ...MENU_ITEMS,
    {
        title: 'Log out',
        icon: <FontAwesomeIcon icon={faSignIn} />,
        to: '/logout',
    },
];

function Header() {
    const currentUser = true;

    const handleMenuChange = (item) => {
        switch (item.type) {
            case 'language':
                console.log(item);
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-home')}>
                        <img src={images.logo} alt="tiktok" />
                    </Link>
                </div>
                {/* SearchHeader add div fix bug tippy */}

                <div className={cx('wrapper-warning')}>
                    <SearchHeader />
                </div>

                {/* show logIn or unlogIn */}

                <div className={cx('action')}>
                    {currentUser ? (
                        <div className={cx('wrap-btn-sign')}>
                            <Tippy content="Upload video" placement="bottom" offset={[0, 4]} interactive>
                                <button className={cx('btn-sign')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Messagae" placement="bottom" offset={[0, 4]} interactive>
                                <button className={cx('btn-sign')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom" offset={[0, 4]} interactive>
                                <button className={cx('btn-sign', 'active')}>
                                    <InboxIcon />
                                    <span className={cx('number-inbox')}>0</span>
                                </button>
                            </Tippy>
                        </div>
                    ) : (
                        <div className={cx('wrap-btn')}>
                            <Button upload text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Button primary>Sign-in</Button>
                        </div>
                    )}
                    <Menu items={currentUser ? AVATARITEMS : MENU_ITEMS} onchange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('avatar')}
                                src={images.accout}
                                alt="avatar"
                                // fallback={imagesMain.accout}
                            />
                        ) : (
                            <button className={cx('menu')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
