const EventEmitter = require('events');

module.exports = class FloatingButton extends EventEmitter {
  constructor(principal, cancel) {
    super();

    this._color = 'red';
    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
    this.principal = principal;
    this.cancel = cancel;
    this.principal.addEventListener('click', e => this.emit('next', e));
    this.cancel.addEventListener('click', e => this.emit('stop', e));
  }

  set color(value) {
    this.principal.classList.remove(this._color);
    this.principal.classList.add(value);
    this._color = value;
  }

  set icon(value) {
    this.principal.firstElementChild.innerText = value;
  }

  set childColor(value) {
    this.cancel.classList.remove(this._color);
    this.cancel.classList.add(value);
    this._color = value;
  }

  set childIcon(value) {
    this.cancel.firstElementChild.innerText = value;
  }

  get disabled() {
    return this.principal.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value)
      this.principal.setAttribute('disabled', 'disabled');
    else
      this.principal.removeAttribute('disabled');
  }

  start() {
    this.color = 'green';
    this.icon = 'skip_next';
    this.cancel.classList.remove('hide');
  }

  stop() {
    this.color = 'red';
    this.icon = 'whatshot';
    this.cancel.classList.add('hide');
    this.principal.removeAttribute('disabled');
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
};
