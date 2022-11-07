import { textListAtom } from "../../store";
import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import useOnClickOutside from "../../hook/useOnClickOutside.js";
import { useEffect } from "react";

// todoItem : todoList에서 입력한 내용을 출력해줌
export default function TodoItem({ todo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [textList, setTextList] = useRecoilState(textListAtom);

  // notify를 위한 input에서 focus 벗어남 발생 시, 자동으로 edit mode 종료
  const ref = useRef(false);
  const inputRef = useRef(null);
  useOnClickOutside(ref, () => setIsEdit(false));

  // 수정버튼 click 시, 자동으로 focus생성
  // inputRef의 태그가 아직 만들어지지 않았는데, 접근할 때를 유의
  useEffect(() => {
    if (isEdit) {
      inputRef ? inputRef.current.focus() : alert("inputRef is null!");
    }
  }, [isEdit]);

  // 삭제버튼 클릭 시 수행
  const onhandleDelete = () => {
    const tempTextList = textList.filter((text) => text.id !== todo.id);
    let count = 0;
    const newTextList = tempTextList.map((textObj) => {
      return { ...textObj, id: count++ };
    });
    setTextList(newTextList);
  };

  // 수정 버튼을 클릭하여 Edit Mode로 변경하는 로직 수행
  const handleEditMode = () => {
    setIsEdit(true);
  };

  // 수정 작업이 이루어짐
  const onChange = (e) => {
    const { value } = e.target;

    const newTextList = textList.map((textObj) => {
      if (textObj.id === todo.id) {
        /* textList 내의 요소와, 사용자가 선택한 todoItem과의 ID를 비교해
         textObj={id, text} 중, text key에 해당하는 value만 
         사용자가 입력한 e.target.value값으로 변경 */
        return { ...textObj, text: value };
      }

      return textObj;
    });

    setTextList(newTextList);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  return (
    // 해당 div 영역에서 focus 벗어나면 이벤트발생하도록 ref={ref} 지정
    <div ref={ref}>
      {!isEdit && (
        <li style={{ margin: "0.5rem 1rem" }}>
          <span>{todo.text}</span>
          <button onClick={handleEditMode}>수정</button>
          <button onClick={onhandleDelete}>삭제</button>
        </li>
      )}

      {/* input 자동 focus를 위한 inputRef 지정 */}
      {isEdit && (
        <>
          <form onSubmit={onSubmit}>
            <input ref={inputRef} value={todo.text} onChange={onChange} />
            <button>수정 완료</button>
          </form>
        </>
      )}
    </div>
  );
}
