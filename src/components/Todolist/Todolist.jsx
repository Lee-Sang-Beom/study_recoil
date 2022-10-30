import { textListAtom, textAtom } from "../../store";
import { useRecoilState } from "recoil";

// todoItem : todoList에서 입력한 내용을 출력해줌
function TodoItem({ todo }) {
  const onChange = (e) => {
    // const { value } = e.target;
  };

  return (
    <div>
      <input value={todo.text} onChange={onChange} />
    </div>
  );
}

// todoList : todoItem입력과 sumbit 버튼 제공
export default function Todolist() {

  // useRecoilState : store/index.js에 선언한 atom 접근 및 사용
  const [textList, setTextList] = useRecoilState(textListAtom);
  const [text, setText] = useRecoilState(textAtom);

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newText = {
      id: textList.length ? textList.length : 0,
      text,
    };

    setTextList((prev) => [...prev, newText]);
  };

  return (
    <div>
      <h3>TodoList</h3>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={onChange} />
        <button type="submit">Submit</button>
      </form>

      {/* todoList 배열 길이만큼 출력 */}
      {textList.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
}
