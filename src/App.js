import "./App.css";

// selector가 반환하는 값을 사용하기 위해, useRecoilValue hook을 import한다.
import { useRecoilState, useRecoilValue } from "recoil";

// textSelector라는 이름의 selector를 import해야 사용할 수 있다.
import { minuteState, hourSelector } from "./store/index.js";

function App() {

	// atoms
  const [minutes, setMinutes] = useRecoilState(minuteState); 

  // useRecoilValue hook에 selector를 전달하면,
  // 현재 atom 상태값을 기준으로, get함수의 실행 결과인 return값을 전달받을 수 있다.
  const getMinutes = useRecoilValue(hourSelector); 

	/* 
    selector에서 set 속성을 설정하면, 쓰기 가능한 상태(setHours)를 반환한다.
    이것으로, selector 내부에서, atoms 상태를 변경시킬 수 있다.

    예제에서는, setHour에 특정 값을 전달하면, selector 내부의 set함수에서 
    전달된 값을 가공하여 atoms로 전환할 수 있도록 한다.

    selector의 쓰기 가능한 상태를 이용하기 위해서는, selector를
    useRecoilValue가 아니라 useRecoilState에 전달하면 된다.
    그럼 쓰기 가능한 상태를 반환한다.
  */ 
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinuteChange = (event) => {
    const { value } = event.target;
    setMinutes(value);
  };

  const onHoursChange = (event) => {
    const { value } = event.target;
    setHours(value);
  };

	console.log(getMinutes); // selector내 get()으로 return된 값 출력
  return (
    <>
      <div>
        <input
          onChange={onMinuteChange}
          value={minutes}
          type="number"
          placeholder="Minutes"
        />
        <input
          value={hours.toFixed(0)}
          onChange={onHoursChange}
          type="number"
          placeholder="Hours"
        />
      </div>
    </>
  );
}

export default App;