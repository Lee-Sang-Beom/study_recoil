import { textListAtom, textAtom } from "../../store";
import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import useOnClickOutside from "../../hook/useOnClickOutside.js";
import { useEffect } from "react";

// todoItem : todoList에서 입력한 내용을 출력해줌
function TodoItem({ todo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [textList, setTextList] = useRecoilState(textListAtom);
  const textListidx = textList.findIndex((text) => text.id === todo.id);

  // notify를 위한 input에서 focus 벗어남 발생 시, 자동으로 edit mode 종료
  const ref = useRef(false);
  const inputRef = useRef(null);
  useOnClickOutside(ref, () => setIsEdit(false));

  const onChange = (e) => {
    const { value } = e.target;

    // 수정 완료 시, edit mode가 종료되도록 함
    setIsEdit(false);
  };

  // 수정 버튼 click
  const handleEditMode = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) {
      // 수정버튼 click 시, 자동으로 focus생성
      // handleEditMode() 이벤트 발생 시 호출하면 오류발생 : inputRef의 태그가 아직 만들어지지 않았는데, 접근하려 했기 때문
      inputRef ? inputRef.current.focus() : alert('inputRef is null!');
    }
  }, [isEdit]);

  return (
    // 해당 영역에서 focus 벗어나면 이벤트발생하도록 ref={ref} 지정
    <div ref={ref}>
      {!isEdit && (
        <li style={{ margin: "0.5rem 1rem" }}>
          <span>{todo.text}</span>
          <button onClick={handleEditMode}>수정</button>
          <button>삭제</button>
        </li>
      )}
      {isEdit && <input ref={inputRef} value={todo.text} onChange={onChange} />}
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
        <ul key={todo.id}>
          <TodoItem todo={todo} />
        </ul>
      ))}
    </div>
  );
}
