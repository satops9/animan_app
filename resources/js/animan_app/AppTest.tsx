import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import "./css/main.css";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMove } from 'react-sortable-hoc';
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


function AppTest(){
    // 初期データ。state で並び順も含めて管理。
  // 適当なタイミングでこの state をどうこうすることによって並び順の情報を任意に扱えます
  const [items, setItems] = useState([
    { id: "1", text: "初期1行目", order: 0 },
    { id: "2", text: "初期2行目", order: 1 },
    { id: "3", text: "初期3行目", order: 2 },
    { id: "4", text: "初期4行目", order: 3 },
    { id: "5", text: "初期5行目", order: 4 }
  ]);
 
  const onDrop = ({ removedIndex, addedIndex }) => {
    const updater = (items) =>
      arrayMove(items, removedIndex, addedIndex).map((item, idx) => {
        return { ...item, order: idx };
      });
    setItems(updater);
  };
 
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Paper style={{ width: "50%", padding: "0 10px" }}>
        <h4>ドラッグ&ドロップで並び順操作</h4>
        <List style={{color: "black"}}>
          <Container onDrop={onDrop}>
            {items.map(({ id, text }) => (
              <Draggable key={id}>
                <ListItem style={{ border: "solid 1px", background: "white",color: "black" }}>
                  <ListItemText primary={text} />
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
      </Paper>
    </div>
  );
}

export default AppTest;

if (document.getElementById('appTest')) {
    const Index = ReactDOM.createRoot(document.getElementById("appTest"));

    Index.render(
        <React.StrictMode>
            <AppTest/>
        </React.StrictMode>
    )
}