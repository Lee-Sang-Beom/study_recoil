import { textListAtom, textAtom } from "../../store";
import { useRecoilState } from "recoil";
import TodoItem from "./TodoItem";

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
        <ul key={todo.id}>
          <TodoItem todo={todo} />
        </ul>
      ))}
    </div>
  );
}
