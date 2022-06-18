import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';

import images from '~/assets/images';

const cx = classNames.bind(styles);

const Image = forwardRef(
    ({ alt, src, className = false, fallback: customFallBack = images.noimage, ...props }, ref) => {
        const [fallback, setFallBack] = useState('');

        const handleError = () => {
            setFallBack(customFallBack);
        };

        if (src === undefined) {
            src = 'fix-img';
        }

        return (
            <img
                className={cx('wrapper', {
                    [className]: className,
                })}
                ref={ref}
                alt={alt}
                src={fallback || src}
                {...props}
                onError={handleError}
            />
        );
    },
);

Image.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
