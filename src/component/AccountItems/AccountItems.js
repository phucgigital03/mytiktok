import styles from './AccountItems.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Image from '~/component/Image';

const cx = classNames.bind(styles);

function AccoutItems({ data, onChoose }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')} onClick={onChoose}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('header-name')}>
                    <span className={cx('name')}>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} />}
                </h4>
                <span className={cx('intro')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

export default AccoutItems;
