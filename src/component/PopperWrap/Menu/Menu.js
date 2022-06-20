import PropTypes from 'prop-types';
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

    const handleRenderMenu = (attrs) => (
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
    );

    const handleBack = () => {
        setHistory(history.slice(0, 1));
    };

    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            // visible
            placement="bottom-end"
            interactive
            delay={[0, 600]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            render={handleRenderMenu}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    item: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onchange: PropTypes.func,
};

export default Menu;
