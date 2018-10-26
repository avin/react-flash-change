// @flow

import React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

type Props = {
    /**
     * Function to compare props before and after update to resolve to flash or not
     */
    compare: (prevProps: Object, newProps: Object) => boolean,

    /**
     * Duration of "flash"-effect in ms
     */
    flashDuration: number,

    /**
     * Flash-effect className
     */
    flashClassName: string,

    /**
     * Flash-effect style object
     */
    flashStyle: Object,

    /**
     * Optional custom CSS class name
     */
    className?: string,

    /**
     * Optional inline style
     */
    style?: Object,
};

type State = {
    activeFlash: boolean,
};

class FlashChange extends React.Component<Props, State> {
    static defaultProps = {
        flashDuration: 200,
        flashStyle: {},
        flashClassName: undefined,
        compare: (prevProps, newProps) => {
            return prevProps.value !== newProps.value;
        },
    };

    state = {
        activeFlash: false,
        props: this.props,
    };

    _timer: TimeoutID;

    _deactivateTimer = () => {
        this.setState({
            activeFlash: false,
        });
    };

    _activateTimer() {
        const { flashDuration } = this.props;

        if (this._deactivateTimer) {
            clearTimeout(this._deactivateTimer);
        }

        this._timer = setTimeout(this._deactivateTimer, flashDuration);
    }

    static getDerivedStateFromProps(nextProps: Object, prevState: Object) {
        const { compare } = nextProps;
        const result = compare(prevState.props, nextProps);
        if (result) {
            return { activeFlash: true, props: nextProps };
        }
        return { props: nextProps };
    }

    componentDidUpdate(prevProps: Object, prevState: Object) {
        const { compare } = this.props;
        const result = compare(prevState.props, this.state.props);
        if (result) {
            this._activateTimer();
        }
    }

    componentWillUnmount() {
        if (this._timer) {
            clearTimeout(this._timer);
        }
    }

    render() {
        const { style, className, children, flashClassName, flashStyle } = this.props;
        const { activeFlash } = this.state;

        let styleProp = { ...style };
        if (activeFlash) {
            styleProp = { ...styleProp, ...flashStyle };
        }

        return (
            <div
                {...{
                    style: styleProp,
                    className: classNames(className, { [flashClassName]: activeFlash }),
                }}
            >
                {children}
            </div>
        );
    }
}
polyfill(FlashChange);

export default FlashChange;
