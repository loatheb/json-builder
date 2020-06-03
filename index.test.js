const createJSON = require("./index.js");

test("add simple key in object", () => {
  const instance = createJSON();
  instance.key;

  expect(instance.toJSON()).toEqual({ key: {} });
});

test("add simple key-value pairs in object", () => {
  const instance = createJSON();
  instance.key("hello world");

  expect(instance.toJSON()).toEqual({ key: "hello world" });
});

test("add multiple key-value pairs", () => {
  const instance = createJSON();
  instance.string("hello world");
  instance.someKey("hello world1");

  expect(instance.toJSON()).toEqual({
    string: "hello world",
    someKey: "hello world1",
  });
});

test("add multiple key-value pairs by chain", () => {
  const instance = createJSON();
  instance.string("hello world").someKey("hello world1");

  expect(instance.toJSON()).toEqual({
    string: "hello world",
    someKey: "hello world1",
  });
});

test("add multiple key-value pairs by chain", () => {
  const instance = createJSON();
  instance.key.string("hello world");

  expect(instance.toJSON()).toEqual({ key: { string: "hello world" } });
});

test("add multiple key object pairs by chain", () => {
  const instance = createJSON();
  instance.key1.string("hello world").someKey("hello world1");

  instance.key2.string("hello world").someKey("hello world1");

  const result = {
    key1: { string: "hello world", someKey: "hello world1" },
    key2: { string: "hello world", someKey: "hello world1" },
  };
  expect(instance.toJSON()).toEqual(result);
});

test("add multiple key object pairs by chain-2", () => {
  const instance = createJSON();
  const instance2 = instance.key1.string("hello world").someKey("hello world1");

  instance2.key2.string("hello world").someKey("hello world1");

  const result = {
    key1: {
      string: "hello world",
      someKey: "hello world1",
      key2: {
        string: "hello world",
        someKey: "hello world1",
      },
    },
  };
  expect(instance.toJSON()).toEqual(result);
});

test("add key as array data in object", () => {
  const instance = createJSON();
  instance
    .key1
      .key('value')
      .key('value2')
      .key('value3')
      .key3('value3')

  const result = {
    key1: {
      key: ["value", "value2", "value3"],
      key3: 'value3'
    }
  };
  expect(instance.toJSON()).toEqual(result);
});

test("add value as boolean data in object", () => {
  const instance = createJSON();
  instance
    .key(true)

  const result = {
    key: true
  };
  expect(instance.toJSON()).toEqual(result);
});

test("add value as array data in object", () => {
  const instance = createJSON();
  instance
    .key([1, 2])

  const result = {
    key: [1, 2]
  };
  expect(instance.toJSON()).toEqual(result);
});

test("add value as object data in object", () => {
  const instance = createJSON();
  instance
    .key({key1: true})

  const result = {
    key: {key1: true}
  };
  expect(instance.toJSON()).toEqual(result);
});