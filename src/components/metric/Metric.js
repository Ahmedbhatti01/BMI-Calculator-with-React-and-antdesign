import { Button, Input, Space, Progress } from "antd";
import { red, green, yellow, blue, purple } from "@ant-design/colors";
import "./Metric.css";
import { useRef } from "react";
import { useState } from "react";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Metric = () => {

  const [result, setResult] = useState("");
  const [deg, setDeg] = useState("");
  const [bmiProgress, setBmiProgress] = useState("");

  const heightCmInputRef = useRef(null);
  const weightKgInputRef = useRef(null);

  const calculateBmiHandler = () => {
    let heightCmInput = Number(heightCmInputRef.current.input.value);
    let weightKgInput = Number(weightKgInputRef.current.input.value);
    console.log(heightCmInput);
    console.log(weightKgInput);

    if (heightCmInput && weightKgInput) {

      let bmi1 = (weightKgInput / ((heightCmInput / 100) * (heightCmInput / 100))).toFixed(2);

      console.log(bmi1);
  
      if (bmi1 < 18.5) {
        setDeg("UnderWeight");
      } else if ( bmi1 >= 18.5 && bmi1 <= 24.9) {
        setDeg("Normal");
      } else if ( bmi1 >= 25 && bmi1 <= 29.9) {
        setDeg("OverWeight");
      } else if ( bmi1 >= 30 && bmi1 <= 34.9) {
        setDeg("Obese");
      } else if (bmi1 >= 35 ) {
        setDeg("Extremly Obese");
      }
  
      console.log("Your BMI1 is: " + typeof bmi1 + " " +  bmi1);
      setResult("Your BMI1 is: " + Number(bmi1))
      setBmiProgress(Number(bmi1));
    } else {
      console.log("Please enter both weight and height.");
      setResult("Please enter both weight and height.");
    }
  }
  // console.log(bmi1Progress)

  return (

    <div className="Metric">
      <form>
        <Space direction="vertical" className="metric-first-child">
          <div>
            <label htmlFor="cm" style={{ marginBottom: "10px" }}>
              Height
            </label>
            <br />
            <br />
            <Search
              ref={heightCmInputRef}
              id="cm"
              placeholder="Enter height in cm"
              allowClear
              enterButton="cm"
              size="large"
              onSearch={onSearch}
              type="number"
              required
            />
          </div>
        </Space>

        <Space direction="vertical" className="metric-second-child">
          <div>
            <label htmlFor="weight">Weight</label>
            <br />
            <br />
            <Search
              ref={weightKgInputRef}
              id="Weight"
              placeholder="Enter weight in kg"
              allowClear
              enterButton="kg"
              size="large"
              onSearch={onSearch}
              type="number"
              required
            />
          </div>
        </Space>
        <br />
        <br />
        <div style={{ padding: "10px" }}>
          <Button className="bmiBbtn" onClick={calculateBmiHandler} type="primary">
            Calculate BMI
          </Button>
        </div>

        <div id="result">
          <p>{result}</p>
        </div>

        <div id="deg">
          <p>{deg}</p>
        </div>
        <br />

        <div id="progress">
          <div style={{textAlign:"center"}}>
            <Progress
              percent={bmiProgress}
              steps={5}
              strokeColor={[green[6], yellow[4], red[5], blue[4], purple[6]]}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Metric;
