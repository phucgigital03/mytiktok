import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

import TippyHead from '@tippyjs/react/headless';
import { PopperWrap } from '~/component/PopperWrap';
import { AccountItems } from '~/component/AccountItems';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/SearchService';

const cx = classNames.bind(styles);
let count = 1;

function SearchHeader() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [showloading, setShowLoad] = useState(false);
    const inRef = useRef();
    const debounce = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debounce.trim()) {
            // setSearchResult([]);
            if (count === 1) {
                ++count;
                return;
            } else {
                setSearchResult([]);
            }
            return;
        }

        const fetchApi = async () => {
            setShowLoad(true);
            const res = await searchServices.search(debounce);
            setShowLoad(false);
            setSearchResult(res.data);
        };
        fetchApi();
    }, [debounce]);

    const handleSearchValue = (value) => {
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };

    const handleClearInp = () => {
        setSearchResult([]);
        setSearchValue('');
        inRef.current.focus();
    };

    const handleOutside = () => {
        setShowResult(false);
    };

    const handleFocusinp = () => {
        setShowResult(true);
    };

    const handleChoose = () => {
        setSearchResult([]);
        setSearchValue('');
    };

    return (
        <TippyHead
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('wrap-popper')} tabIndex="-1" {...attrs}>
                    <PopperWrap>
                        <h4 className={cx('search-accout')}>Accouts</h4>
                        {searchResult.map((item) => (
                            <AccountItems key={item.id} data={item} onChoose={handleChoose} />
                        ))}
                    </PopperWrap>
                </div>
            )}
            onClickOutside={handleOutside}
        >
            <div className={cx('search')}>
                <input
                    ref={inRef}
                    value={searchValue}
                    placeholder="Search accouts and videos"
                    onChange={(e) => {
                        handleSearchValue(e.target.value);
                    }}
                    onFocus={handleFocusinp}
                />
                {searchValue && !showloading && (
                    <button className={cx('clear')} onClick={handleClearInp}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {showloading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button
                    className={cx('search-btn')}
                    onMouseDown={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </TippyHead>
    );
}

export default SearchHeader;
