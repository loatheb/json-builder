# JSON BUILDER
命令式创建 json 配置

## 使用
只有一个 toJSON 方法，来将创建的 json 结构解析为原生对象

```js
import createJSON from 'json-builder'
const json = createJSON()
json.key('value')
console.log(json.toJSON()) // {"key": "value"}
```

## API
可以通过 index.test.js 查看更多功能细节

属性会作为对象下的 key 来生成一层对象，方法会作为 key-value 映射渲染出来，多次调用方法会以数组渲染。

```js
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

```