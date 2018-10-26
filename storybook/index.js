import React from 'react';

import { storiesOf } from '@storybook/react';
import FlashChange from '../src';

function randomNumber() {
    return parseInt(Math.random() * 100, 10);
}

export default class Demo extends React.Component {
    state = {
        activeTheme: 'GreenFlash',
        data: {
            a1: randomNumber(),
            a2: randomNumber(),
            a3: randomNumber(),
            a4: randomNumber(),
            a5: randomNumber(),
        },
    };

    startUpdateValuesTimer = () => {
        const data = { ...this.state.data };
        for (const key in data) {
            if (Math.random() > 0.5) {
                data[key] = randomNumber();
            }
        }
        this.setState({ data });

        this.timer = setTimeout(this.startUpdateValuesTimer, 1000);
    };

    componentDidMount() {
        this.startUpdateValuesTimer();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    changeTheme = e => {
        const theme = e.currentTarget.dataset.theme;
        this.setState({ activeTheme: theme });
    };

    render() {
        const { a1, a2, a3, a4, a5 } = this.state.data;
        const { theme } = this.props;

        const flashChangeProps = {
            compare: (prevProps, newProps) => {
                return prevProps.value !== newProps.value;
            },
            flashDuration: 500,
            flashClassName: 'active',
        };

        switch (theme) {
            case 'GreenFlash': {
                flashChangeProps.className = 'greenFlashContainer';
                break;
            }
            case 'TextShadow': {
                flashChangeProps.className = 'shadowFlashContainer';
                break;
            }
            case 'RotateChange': {
                flashChangeProps.style = { transform: 'rotate(-360deg)' };
                flashChangeProps.flashStyle = {
                    transform: 'rotate(0deg)',
                    transition: 'transform 500ms',
                };
                break;
            }
            default:
        }

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <FlashChange {...flashChangeProps} value={a1}>
                                    {a1}
                                </FlashChange>
                            </td>
                            <td>
                                <FlashChange {...flashChangeProps} value={a2}>
                                    {a2}
                                </FlashChange>
                            </td>
                            <td>
                                <FlashChange {...flashChangeProps} value={a3}>
                                    {a3}
                                </FlashChange>
                            </td>
                            <td>
                                <FlashChange {...flashChangeProps} value={a4}>
                                    {a4}
                                </FlashChange>
                            </td>
                            <td>
                                <FlashChange {...flashChangeProps} value={a5}>
                                    {a5}
                                </FlashChange>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

storiesOf('FlashChange', module).add('Green Flash', () => <Demo theme="GreenFlash" />);
storiesOf('FlashChange', module).add('Text Shadow', () => <Demo theme="TextShadow" />);
storiesOf('FlashChange', module).add('Rotate', () => <Demo theme="RotateChange" />);
