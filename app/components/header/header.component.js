'use strict'

import template from './header.html';
import './header.css';

export class HeaderComponent {
    static get $inject() {return []}
}

export const headerConfig = {
    template: template,
    controller: HeaderComponent
  }
  