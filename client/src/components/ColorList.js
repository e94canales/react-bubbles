import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};
;

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [ addNew , setAddNew ] = useState(false)
  const [ newColorValues, setNewColorValues ] = useState(initialColor)
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [ updating, setUpdating ] = useState(false)

  useEffect(() => {
    if (updating){
      axiosWithAuth()
      .get('api/colors')
      .then( res => {
        updateColors(res.data)
      })
    }
  }, [updating, updateColors])

  const editColor = color => {
    setAddNew(false)
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        // console.log(res)
        setUpdating(true)
      })

    setUpdating(false)
    setEditing(false);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // console.log(color)
    axiosWithAuth()
      .delete(`api/colors/${color.id}`)
      .then ( res => {
        setUpdating(true)
        // console.log(res)
      })
    setUpdating(false)
  };

  const inputHandler = e => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'code'){
      setNewColorValues({
        ...newColorValues,
        [name]: {
          hex: value
        }
      })
    } else {
      setNewColorValues({
        ...newColorValues,
        [name]: value
      })
    }

  }

  const addHandler = e => {
    e.preventDefault()

    axiosWithAuth()
      .post('api/colors', newColorValues)
      .then( res => {
        setUpdating(true)
      })

    setAddNew(false)
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.preventDefault();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <button className='addBtn' onClick={() => {
        setEditing(false)
        setAddNew(true)
      }}>Add</button>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {addNew && (
        <form>
          <legend>add color</legend>
          <label>
            color name:
            <input
              name='color'
              onChange={inputHandler}
              value={newColorValues.color}
              type='text'
            />
          </label>
          <label>
            hex code:
            <input
              name='code'
              onChange={inputHandler}
              value={newColorValues.code.hex}
              type='text'
            />
          </label>
          <div className="button-row">
            <button onClick={addHandler}>Submit</button>
          </div>
      </form>
      )}
    </div>
  );
};

export default ColorList;
