import { textListAtom, textAtom } from "../../store";
import { useRecoilState } from "recoil";
import TodoItem from "./TodoItem";

export default function Todolist() {
  // useRecoilState : store/index.js에 선언한 atom 접근 및 사용
  const [textList, setTextList] = useRecoilState(textListAtom);
  const [text, setText] = useRecoilState(textAtom);

  // 새로운 todoItem 작성을 위한 input event 처리
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
    <div className="list_wrap">
      <h1>TodoList with Recoil</h1>
      <form className="list_form" onSubmit={onSubmit}>
        <input value={text} onChange={onChange} required />
        <button type="submit">Submit</button>
      </form>

      <div className="listItem_wrap">
        {/* todoList 배열 길이만큼 출력 */}
        {textList.map((todo) => (
          <ul className="listItem_ul" key={todo.id}>
            <TodoItem todo={todo} />
          </ul>
        ))}
      </div>
    </div>
  );
}
