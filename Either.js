class Either {
  constructor(value) {
    // a -> Either a b
    this._value = value;
  }

  get value() {
    return this._value;
  }

  static left(a) {
    return new Left(a);
  }

  static right(a) {
    return new Right(a);
  }

  static fromNullable(val) {
    return val !== null && val !== undefined
      ? Either.right(val)
      : Either.left(val);
  }

  static of(a) {
    return Either.right(a);
  }
}

class Left extends Either {
  map(_) {
    return this; //empty operators
  }

  get value() {
    throw new TypeError(`You cannot extract the value of a Left(a)`);
  }

  getOrElse(other) {
    // a -> Either a b
    return other;
  }

  orElse(f) {
    return f(this._value);
  }

  chain(f) {
    return this;
  }

  filter(f) {
    return this;
  }

  getOrElseThrow(a) {
    throw new Error(a);
  }

  toString() {
    return `Either.Left(${this._value})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this._value));
  }

  getOrElse(other) {
    return this._value;
  }

  orElse() {
    return this;
  }

  chain(f) {
    return f(this._value);
  }

  getOrElseThrow(_) {
    return this._value;
  }

  filter(f) {
    return Either.fromNullable(f(this._value) ? this._value : null);
  }

  toString() {
    return `Either.Right(${this._value})`;
  }
}
