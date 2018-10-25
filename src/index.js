//@flow

import React from 'react';
import classNames from 'classnames';

class FlashChange extends React.Component<> {
    static defaultProps = {
        flashDuration: 200,
    };

    state = {
        activeFlash: false,
    };

    deactivate = () => {
        this.setState({
            activeFlash: false,
        });
    };

    activate() {
        const { flashDuration } = this.props;

        if (this.deactivateTimer) {
            clearTimeout(this.deactivateTimer);
        }

        this.setState({
            activeFlash: true,
        });

        this.deactivateTimer = setTimeout(this.deactivate, flashDuration);
    }

    componentDidUpdate(prevProps) {
        const { compare } = this.props;
        const result = compare(prevProps, this.props);
        if (result) {
            this.activate();
        }
    }
    render() {
        const { style, className, children, flashClassName } = this.props;
        const { activeFlash } = this.state;

        return (
            <div {...{ style, className: classNames({ [flashClassName]: activeFlash }, className) }}>{children}</div>
        );
    }
}

export default FlashChange;
