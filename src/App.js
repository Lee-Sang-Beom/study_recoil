import "./App.css";
import { textState, textSeletor } from "./store";
import { useRecoilState, useRecoilValue } from "recoil";

function App() {
  const [text, setText] = useRecoilState(textState);
  const { isText, textLength } = useRecoilValue(textSeletor);

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
