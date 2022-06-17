import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { PopperWrap } from '~/component/PopperWrap';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false, onchange }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderitems = () => {
        return current.data.map((item, index) => {
            const isparent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isparent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else if (item.model) {
                            console.log(item);
                        } else {
                            onchange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory(history.slice(0, 1));
    };

    return (
        <Tippy
            // visible
            interactive
            delay={[0, 600]}
            placement="bottom-end"
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrap className={cx('edi-pad')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    handleBack();
                                }}
                            />
                        )}
                        <div className={cx('scroll-language')}>{renderitems()}</div>
                    </PopperWrap>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
