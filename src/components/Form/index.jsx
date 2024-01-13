"use client";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import classes from "./index.module.css";
import { v4 as uuid } from "uuid";

const Form = () => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [data, setData] = useState([
    {
      id: uuid(),
      height: "",
      width: "",
      quantity: "",
      isEditable: true,
      color: getRandomColor(),
    },
  ]);

  const generateCuts = useCallback(() => {
    const container = document.getElementById("container");

    data.forEach((field) => {
      const width = field.width;
      const height = field.height;
      const quantity = field.quantity;

      for (let i = 0; i < quantity; i++) {
        const div = document.createElement("div");
        div.className = classes["generated-div"];
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.id = field.id;
        div.style.backgroundColor = field.color;
        container.appendChild(div);
      }
    });
  }, [data]);

  const addWoodHandler = useCallback(() => {
    setData((prevData) => [
      ...prevData,
      {
        id: uuid(),
        height: "",
        width: "",
        quantity: "",
        isEditable: true,
        color: getRandomColor(),
      },
    ]);
    generateCuts();
  }, [generateCuts]);

  const toggleEditMode = (id) => {
    setData((prevData) =>
      prevData.map((field) =>
        field.id === id ? { ...field, isEditable: !field.isEditable } : field
      )
    );
  };

  const handleChange = (e, id) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((field) =>
        field.id === id ? { ...field, [e.target.id]: value } : field
      )
    );
  };

  const deleteItem = (id) => {
    setData((prevData) => prevData.filter((field) => field.id !== id));
    const container = document.getElementById("container");
    const cutsToRemove = container.querySelectorAll(`div[id="${id}"]`);
    cutsToRemove.forEach((div) => {
      container.removeChild(div);
    });
  };

  return (
    <>
      {data.map((field) => (
        <FormControl
          key={field.id}
          display="flex"
          maxW="700px"
          margin="10px auto 10px"
          alignItems="flex-end"
        >
          <div>
            <FormLabel htmlFor="height" fontSize="20px" mb="5px">
              Height
            </FormLabel>
            <Input
              type="number"
              id="height"
              placeholder="Enter height"
              value={field.height}
              onChange={(e) => handleChange(e, field.id)}
              p="10px"
              mr="5px"
            />
          </div>
          <div>
            <FormLabel htmlFor="width" fontSize="20px" mb="5px">
              Width
            </FormLabel>
            <Input
              type="number"
              id="width"
              placeholder="Enter width"
              value={field.width}
              onChange={(e) => handleChange(e, field.id)}
              p="10px"
              mr="5px"
            />
          </div>
          <div>
            <FormLabel htmlFor="quantity" fontSize="20px" mb="5px">
              Quantity
            </FormLabel>
            <Input
              type="number"
              id="quantity"
              placeholder="Enter quantity"
              value={field.quantity}
              onChange={(e) => handleChange(e, field.id)}
              p="10px"
              mr="5px"
            />
          </div>

          {field.isEditable ? (
            <Button
              type="button"
              cursor="pointer"
              height="38px"
              onClick={() => {
                toggleEditMode(field.id);
                addWoodHandler();
                generateCuts();
              }}
              fontSize="25px"
            >
              Submit
            </Button>
          ) : (
            <>
              <Button
                type="button"
                fontSize="20px"
                cursor="pointer"
                mr="10px"
                height="38px"
                onClick={() => {
                  generateCuts();
                }}
              >
                Edit
              </Button>
              <Button
                type="button"
                fontSize="20px"
                cursor="pointer"
                height="38px"
                onClick={() => deleteItem(field.id)}
              >
                Delete
              </Button>
            </>
          )}
        </FormControl>
      ))}
    </>
  );
};

export default Form;
