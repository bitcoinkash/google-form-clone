import { Fragment, useState } from "react";
import uuid from "react-uuid";
import Nestable from "react-nestable";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


// Form Elements
import {
  TextFieldInput,
  TextArea,
  NumberInput,
  RadioInput,
  DateInput,
  TimeInput,
} from "./elements";
import Layout from "./elements/layout";
import { formEl } from "./constants.js";
// Components
import Header from "./Header";

const FormBuilder = () => {
  const initVal = formEl[0]?.value;

  // State
  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState("text");

  const items = data;

  // Function to add a new element
  const addElement = () => {
    const newData = {
      id: uuid(),
      value: null,
      type: formData,
      required: false,
    };
    setData((prevState) => [...prevState, newData]);
    setFormData(initVal);
  };

  // Function to delete an element
  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  // Function to add an element at a specific position and return an array
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
  };

  // Function to duplicate an element
  const duplicateElement = (elId, elType) => {
    const elIdx = data.findIndex((el) => el.id === elId);
    const newEl = {
      id: uuid(),
      value: null,
      type: elType,
      required: false,
    };
    const newArr = addAfter(data, elIdx, newEl);
    setData(newArr);
  };

  // Function to handle the sorting of elements
  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  // Function to handle input values
  const handleValue = (id, e) => {
    const newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, value: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to handle the "required" property
  const handleRequired = (id) => {
    const newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to handle the element type
  const handleElType = (id, type) => {
    const newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to handle options
  const addOption = (id, newOption) => {
    const newArr = data.map((el) => {
      if (el.id === id) {
        const objVal = "options" in el ? el.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to handle dates
  const handleDate = (id, dateVal) => {
    const newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, date: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to handle times
  const handleTime = (id, dateVal) => {
    const newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, time: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to change option values
  const handleOptionValues = (elId, optionId, optionVal) => {
    const newArr = data.map((el) => {
      if (el.id === elId) {
        el.options &&
          el.options.map((opt) => {
            if (opt.id === optionId) {
              opt.value = optionVal;
            }
          });
        return el;
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to delete an option
  const deleteOption = (elId, optionId) => {
    const newArr = data.map((el) => {
      if (el.id === elId) {
        const newOptions = el.options && el.options.filter((opt) => opt.id !== optionId);
        return { ...el, options: newOptions };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Render items
  const renderElements = ({ item }) => {
    switch (item.type) {
      case "text":
        return (
          <TextFieldInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "textarea":
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "number":
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "radio":
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      case "date":
        return (
          <DateInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleDate={handleDate}
            duplicateElement={duplicateElement}
          />
        );
      case "time":
        return (
          <TimeInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleTime={handleTime}
            duplicateElement={duplicateElement}
          />
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item md={6}>
          <Header
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
          <Nestable
            items={items}
            renderItem={renderElements}
            maxDepth={1}
            onChange={handleOnChangeSort}
          />
        </Grid>
        <Grid item md={1}>
          <Tooltip title="Add Element" aria-label="add-element">
            <IconButton
              aria-label="add-element"
              onClick={addElement}
              sx={{ position: "sticky", top: 30 }}
            >
              <AddCircleOutlineIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FormBuilder;
