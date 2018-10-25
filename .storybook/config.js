import { configure } from '@storybook/react';
import '../storybook/style.css';

function loadStories() {
    require('../storybook');
}

configure(loadStories, module);
