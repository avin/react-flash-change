// @flow

import React from 'react';
import classNames from 'clsx';
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
     * Tag name passed to document.createElement to create the outer container element.
     */
    outerElementType?: React$ElementType,

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
        outerElementType: 'div',
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
            return { activeFlash: true, compareResult: result, props: nextProps };
        }
        return { props: nextProps };
    }

    componentDidUpdate(prevProps: Object, prevState: Object) {
        if (this.state.activeFlash) {
            this._activateTimer();
        }
    }

    componentWillUnmount() {
        if (this._timer) {
            clearTimeout(this._timer);
        }
    }

    render() {
        const { style, className, children, flashClassName, flashStyle, outerElementType } = this.props;
        const { activeFlash, compareResult } = this.state;

        let styleProp = { ...style };
        if (activeFlash) {
            styleProp = { ...styleProp, ...flashStyle };
        }

        const OuterElement = outerElementType;

        return (
            <OuterElement
                {...{
                    style: styleProp,
                    className: classNames(
                        className,
                        { [flashClassName]: activeFlash },
                        { [compareResult]: activeFlash }
                    ),
                }}
            >
                {children}
            </OuterElement>
        );
    }
}
polyfill(FlashChange);

export default FlashChange;
