Project - Study Recoil
======================

## 1. **계획 이유**
- text

### - 제공기능
	1. text

****

## 2. **Install**

1. React 애플리케이션 생성하기
    ```
    npx create-react-app my-app
    ```

2. Recoil 설치하기
    ```
    npm install recoil
    ```

****

## **3. USE**

### 1) RecoilRoot
 - recoil 상태를 컴포넌트가 활용하기 위해서는, 부모 트리에 RecoilRoot를 배치시키는 것이 사전에 요구됩니다.
 - Root 컴포넌트가 **RecoilRoot**를 넣기에 가장 적합합니다.
    ```
    [index.js]

        ...
        import { RecoilRoot } from "recoil";

        ...
        root.render(
        <RecoilRoot>
            <React.StrictMode>
            <App />
            </React.StrictMode>
        </RecoilRoot>
        );

        ...
    ```


### 2) Atom
 - Atom은 상태의 일부입니다.
 - 컴포넌트들이 암묵적으로 구독하고 있는 공유 변수라고 생각할 수 있습니다.
 - atom에 어떤 변화가 발생하면, 그를 구독하는 모든 컴포넌트는 재렌더링이 발생합니다.
    ```
    [store/index.js]

    import { atom } from "recoil";  

    export const textState = atom({
        key: 'textState', // unique ID (atom을 구분할 수 있는 유일한 키)
        default: '', // atom의 default값
    })

    ```

    ```
    [App.js]

    import './App.css';
    import { textState } from './store'; // import atom
    import { useRecoilState } from 'recoil'; // atom값을 다루기 위한 hook을 import

    function App() {
    const [text, setText] = useRecoilState(textState); // 컴포넌트가 extState  atom을 읽고 쓰게 하기 위해 useRecoilState 사용

    const onChange = (e) => {
        const value = e.target.value;
        setText(value); // useState문과 유사하게 사용 가능
    }
    return (
        <div>
        <h3>Text : {text}</h3>
        <input type="text" value={text} onChange={onChange} placeholder="Input"></input>
        </div>
    );
    }

    export default App;

    ```



### 3) Selector

####  **(1) 개념**
- Selector는 주어진 상태를 수정하고, 그 결과를 반환하는 순수함수라고 생각할 수 있습니다.

- [**공식 문서**](https://recoiljs.org/ko/docs/introduction/getting-started)에서 언급하는 파생된 상태(derived state)라는 말은, 상태가 변화했다는 뜻입니다. 

- 즉, **Selector**는 전달한 상태를 변환해 파생된 상태를 만들고, 그 결과물을 반환하는 순수 함수라고 볼 수 있습니다.
- atom을 가공하고, 가공된 변화를 반환하는 함수로 정리할 수 있습니다. 

#### **(2) get**
- get 속성은 계산될 함수입니다. 전달되는 get인자를 통해 atoms와 다른 selectors에 접근할 수 있습니다.
- 다른 atoms나 selectors에 접근하면 자동으로 종속 관계가 생성되기 때문에, 참조했던 다른 atoms나 selectors가 업데이트되면 이 함수도 다시 실행됩니다.
- 아래 예시에서, **textSeletor**는 textState라는 atom에 의존성을 갖습니다. 이 textSelector는 **textState**를 입력으로 사용하고, text길이와 길이가 있는지에 대한 boolean값을 출력으로 반환하는 **순수함수** 처럼 동작합니다.

#### **(4) 예시**
```
[store/index.js]
import { atom, selector } from "recoil";

export const textState = atom({
    key: 'textState', // unique ID 
    default: '', // default value
})

export const textSeletor = selector({
    key: 'textLengthState', // unique ID 
    get: ({get}) => { // get function
        const text = get(textState);
        const textLength = text.length;
        const isText = textLength ? true : false;
        return {
            textLength,
            isText,
        };
    }
})


[App.js]

import "./App.css";
import { textState, textSeletor } from "./store"; // textSelector라는 이름의 selector를 import해야 사용할 수 있다.
import { useRecoilState, useRecoilValue } from "recoil"; // selector가 반환하는 값을 사용하기 위해, useRecoilValue hook을 import한다.

function App() {
const [text, setText] = useRecoilState(textState);
const { isText, textLength } = useRecoilValue(textSeletor); // useRecoilValue hook에 selector를 전달하면, 순수함수 내의 get()으로 처리된 return값을 전달받을 수 있다.

const onChange = (e) => {
    const value = e.target.value;
    setText(value);
};
return (
    <div>
    <h3>Text : {text}</h3>
    <h5>
        길이 :
        {isText ? (
        <span>{textLength}</span>
        ) : (
        <span> 텍스트가 입력되지 않았습니다. </span>
        )}
    </h5>
    <input
        type="text"
        value={text}
        onChange={onChange}
        placeholder="Input"
    ></input>
    </div>
);
}

export default App;

```
