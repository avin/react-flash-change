# react-flash-change

> Flash container on change props

[![NPM registry](https://img.shields.io/npm/v/@avinlab/react-flash-change.svg?style=for-the-badge)](https://yarnpkg.com/en/package/@avinlab/react-flash-change) [![NPM license](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](LICENSE)

## Demo

Here is an [examples page](https://avin.github.io/react-flash-change).

There are sources in `./storybook`

## Install

```bash
# Yarn
yarn add @avinlab/react-flash-change

# NPM
npm install --save @avinlab/react-flash-change
```

## Usage

```js
import React from 'react';
import FlashChange from '@avinlab/react-flash-change';

const Component = ({ value }) => {
    <FlashChange
        value={value}
        flashClassName="flashing"
        compare={(prevProps, nextProps) => {
            return nextProps.value !== prevProps.value;
        }}
    >
        <span>{value}</span>
    </FlashChange>;
};
```

## API

### Props

| Property         | Type              | Required? | Description                                                                                                                                                                                                |
| :--------------- | :---------------- | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| compare          | Function          |           | Function to compare props before and after update to resolve to flash or not. Function params: `(prevProps, nextProps)`. Default it compares `props.value`. If return string - it will be flash className. |
| flashDuration    | Number            |           | Duration of "flash"-effect in ms. Default: 200ms                                                                                                                                                           |
| flashClassName   | String            |           | Flash-effect className                                                                                                                                                                                     |
| flashStyle       | Object            |           | Flash-effect style object                                                                                                                                                                                  |
| className        | string            |           | Optional custom CSS class name                                                                                                                                                                             |
| style            | Object            |           | Optional inline style                                                                                                                                                                                      |
| outerElementType | React$ElementType |           | Tag name passed to document.createElement to create the outer container element. Default: `div`                                                                                                            |

## License

MIT © [avin](https://github.com/avin)
