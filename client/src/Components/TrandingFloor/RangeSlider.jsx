import { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core";
import { InformationCircleIcon } from "@heroicons/react/solid";

// Marks for slider 1 and 2
const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
];

// Marks for slider 3
const marks1 = [
  {
    value: 1,
    label: "$1",
  },
  {
    value: 5000,
    label: "$5,000",
  },
];

const CustomSlider = withStyles({
  root: {
    height: 5,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "6px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: -12,
    top: -22,
    "& *": {
      background: "transparent",
      color: "#fff",
    },
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    borderRadius: 4,
  },
  markLabel: {
    color: "#fff",
    paddingRight: "0.5rem",
  },
  mark: {
    backgroundColor: "transparent",
  },
})(Slider);

const RangeSlider = () => {
  const [slider1, setSlider1] = useState(3);
  const [slider2, setSlider2] = useState(3);
  const [slider3, setSlider3] = useState([1500, 3000]);

  const slider1Handler = (e, newValue) => {
    setSlider1(newValue);
  };
  const slider2Handler = (e, newValue) => {
    setSlider2(newValue);
  };
  const slider3Handler = (e, newValue) => {
    setSlider3(newValue);
  };

  return (
    <>
      <div className="relative w-full divide-y divide-brand-gray-800">
        <div className="px-5  pt-3">
          <p className="flex items-center mb-4">
            Liquidity
            <InformationCircleIcon className="w-4 h-5 ml-1" />
          </p>
          <CustomSlider
            value={slider1}
            onChange={slider1Handler}
            step={1}
            min={1}
            max={5}
            marks={marks}
            valueLabelDisplay="on"
            style={{ color: "#10b981" }}
          />
        </div>

        <div className="px-5 pt-3">
          <p className="flex items-center mb-4">
            Roi Level
            <InformationCircleIcon className="w-4 h-5 ml-1" />
          </p>
          <CustomSlider
            value={slider2}
            onChange={slider2Handler}
            step={1}
            min={1}
            max={5}
            marks={marks}
            valueLabelDisplay="on"
            style={{ color: "#7b61ff" }}
          />
        </div>

        <div className="px-5 pt-3">
          <p className="flex items-center mb-4">
            Price
            <InformationCircleIcon className="w-4 h-5 ml-1" />
          </p>
          <CustomSlider
            value={slider3}
            onChange={slider3Handler}
            step={1}
            min={1}
            max={5000}
            marks={marks1}
            valueLabelDisplay="on"
            style={{ color: "#7b61ff" }}
          />
        </div>
      </div>
    </>
  );
};

export default RangeSlider;
