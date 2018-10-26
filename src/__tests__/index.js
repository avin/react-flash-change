import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FlashChange from '../';

jest.useFakeTimers();
Enzyme.configure({ adapter: new Adapter() });

test('Check change className on update value prop', () => {
    let flashElement = mount(<FlashChange value={1} className="staticClassName" flashClassName="flashClassName" />);

    expect(flashElement.find('div').hasClass('staticClassName')).toEqual(true);
    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(false);

    flashElement = flashElement.setProps({ value: 2 });

    expect(flashElement.find('div').hasClass('staticClassName')).toEqual(true);
    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(true);
});

test('Check change style on update value prop', () => {
    let flashElement = mount(
        <FlashChange value={1} style={{ fontSize: '14px', fontWeight: 'normal' }} flashStyle={{ fontWeight: 'bold' }} />
    );

    let style = flashElement.find('div').props().style;
    expect(style).toEqual({ fontSize: '14px', fontWeight: 'normal' });

    flashElement = flashElement.setProps({ value: 2 });

    style = flashElement.find('div').props().style;
    expect(style).toEqual({ fontSize: '14px', fontWeight: 'bold' });
});

test('Check custom compare function', () => {
    let flashElement = mount(
        <FlashChange
            a={2}
            b={2}
            className="staticClassName"
            flashClassName="flashClassName"
            compare={(prevProps, nextProps) => {
                return nextProps.a + nextProps.b - (prevProps.a + prevProps.b) > 10;
            }}
        />
    );

    expect(flashElement.find('div').hasClass('staticClassName')).toEqual(true);
    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(false);

    flashElement = flashElement.setProps({ a: 3, b: 3 });

    expect(flashElement.find('div').hasClass('staticClassName')).toEqual(true);
    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(false);

    flashElement = flashElement.setProps({ a: 30, b: 30 });

    expect(flashElement.find('div').hasClass('staticClassName')).toEqual(true);
    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(true);
});

test('Check return normal state after timeout', () => {
    let flashElement = mount(<FlashChange value={1} flashClassName="flashClassName" />);
    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(false);

    flashElement = flashElement.setProps({ value: 2 });
    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(true);

    jest.runAllTimers();

    flashElement.update();

    expect(flashElement.find('div').hasClass('flashClassName')).toEqual(false);
});
