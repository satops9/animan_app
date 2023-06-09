/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./css/main.css";
import { tagsGrid, tagsGrid_up } from "./emotionCss";
import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";

//metaタグの中身
type Meta = {
  tag: string[];
  og_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_date: string;
};

// 通知の中身
type Notice = {
  url: string;
  res: string;
  b_time: string;
  a_time: string;
};

function MainApp() {
  const [meta, setMeta] = useState<Meta[]>([]);
  const [metaList, setMetaList] = useState<Meta[]>(meta);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const [array, setArray] = useState(["main", "art", "sub"]);
  const [arrayList, setArrayList] = useState<string[]>(array);

  // meta内容の取得
  const url_Ref = useRef<HTMLInputElement>(null);
  const tag_Ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // urlからmetaタグの内容を取得する
    if (url_Ref.current !== null) {
      if(url_Ref.current.value !== ""){
      const formData = new FormData();
      formData.append('url', url_Ref.current.value);
      // nullチェックを追加
      // https://zatops.sakura.ne.jp/animan_apps/bkm/main.php
      // http://127.0.0.1:8000/main.php
      const response = await axios.post('https://zatops.sakura.ne.jp/animan_apps/bkm/main.php', formData, {
                              headers: {
                                'Content-Type': 'application/x-www-form-urlencoded' // リクエストヘッダーを設定
                              }
                        });
      const data = response.data;

      console.log(data);

      const url = data.metaItems.ogUrl;
      const title = data.metaItems.ogTitle;
      const description = data.metaItems.ogDescription;
      const image = data.metaItems.ogImage;
      const date = data.metaItems.pageTitle;

      var tags: string[] = [];
      if (tag_Ref.current && tag_Ref.current.value) {
        const tag : Array<string> = tag_Ref.current.value.split(",");
        tags = tag;
        const newTags = tags.filter((t) => !array.includes(t)); // 重複したタグをはじく
        setArray((prevArray) => [...prevArray, ...newTags]);
      }

      // フックを更新する
      setMeta([
        ...meta,
        {
          tag: tags,
          og_url: url,
          og_title: title,
          og_description: description,
          og_image: image,
          og_date: date,
        },
      ]);
    }else{
      var tags: string[] = [];
      if (tag_Ref.current && tag_Ref.current.value) {
        const tag : Array<string> = tag_Ref.current.value.split(",");
        tags = tag;
        const newTags = tags.filter((t) => !array.includes(t)); // 重複したタグをはじく
        setArray((prevArray) => [...prevArray, ...newTags]);
      }
    }
  }
  };

// 記事削除処理
const removeItem = (index) => {
  const newMetaList = [...metaList];
  const newMeta = [...meta];
  newMetaList.splice(index, 1);
  newMeta.splice(index, 1);
  setMeta(newMeta);
}

// tag削除処理 arrayから削除
const removeTag = (index) => {
  const newTag = [...array];
  newTag.splice(index, 1);
  console.log(`newTag:${newTag}`);
  setArray(newTag);
  setArrayList(newTag);
}

  function cookieSet(){
    // cookieからタグを取得する
    const metas = Cookies.get("metaList");
    const arrays = Cookies.get("array");
    if (metas) {
        const list: Meta[] = JSON.parse(metas);
        setMeta(list);
      }
      if (arrays) {
        const list: string[] = JSON.parse(arrays);
        console.log(`arrayList:${list}`);
        setArray(list);
        setArrayList(list);
    }
  }

  // F5対応
  useEffect(() => {
    // cookieからタグを取得する
    cookieSet();
  }, []);

  useEffect(() => {
    // metaタグが更新された場合、metaListも更新する
    setMetaList(meta);
    console.log("metaList更新");
    Cookies.set("metaList", JSON.stringify(meta));
    }, [meta]);

    useEffect(() => {
    // タグが更新された場合、cookieも更新する
    setArrayList(array);
    console.log("array更新");
    Cookies.set("array", JSON.stringify(array));
    console.log(`array:${array}`);
    }, [array]);

  useEffect(() => {
  console.log(`selectedTag:${selectedTag}`);
  // 選択結果を抽出する
  setMetaList((prevList) => {
    // タグに一致する記録をfilterで抽出
    let newList = meta.filter((obj) => {
      let result = selectedTag.every((tag) => {
        const findResult = obj.tag.find((kijiTag) => kijiTag === tag);
        console.log(`tag:${tag}`);
        if (findResult) {
          return true;
        } else {
          return false;
        }
      });
      // 選択中タグを全て含む記録をtrueとして返却
      return result;
    });
    return newList;
  });

  console.log("start");

  // クリーンアップ処理
  return () => {
    setMetaList(meta); // meta配列自体をセットするように修正
    console.log("clean");
  };
}, [selectedTag]);


  // タグ選択処理
  const push = (e: any) => {
    e.preventDefault();

    // タグが既に選択済かチェックする
    const check = selectedTag.find((tag) => {
      return tag === e.target.id;
    });

    if (!check) {
      //未選択の場合は追加
      setSelectedTag((selected) => {
        const updatedSelected = selected.filter((tag) => tag !== "");
        return [...updatedSelected, e.target.id];
      });
    } else {
      // 選択済の場合は削除
      // filterで選択したタグ以外のlistを作り直す
      setSelectedTag((selected) => selected.filter((tag) => tag !== e.target.id));
    }
  };

  // タグ選択時のスタイル変更
  const grigItem = (selectTag: string[], select: string) => {
    // 選択したタグが既に選択済かチェック
    const count = selectTag.filter((selected) => select === selected);
    // 選択してない場合はスタイル追加
    if (count.length !== 0) {
      return [
        css`
          background-color: orange;
        `
      ];
    }
  };

    return (
        <>
        <form id="forms" onSubmit={handleSubmit}>
        <label>
            URL:
            <input type="text" id="urlForm" ref={url_Ref} />
        </label>
        <label>
            Tag:
            <input type="text" id="tagForm" ref={tag_Ref} />
        </label>
        <button type="submit">Submit</button>
        </form>
        <div css={[tagsGrid]}>
        {arrayList.map((val, i) => (
          <button
            key={i}
            id={val}
            css={[grigItem(selectedTag, val)]}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              push(e)
            }
          >
            {val}
            <span className="delete-button_t" onClick={() => removeTag(i)}>
              ×
            </span>
          </button>
        ))}
      </div>
      <div css={[tagsGrid_up]}><button onClick={() => cookieSet()}>更新</button></div>
        <br/>
        <div className="main_list_all">
        <Tabs>
            <TabList>
              <Tab>Card</Tab>
              <Tab>List</Tab>
            </TabList>
            <TabPanel>
            <div className="main">
              {metaList.map((item, index) => {
                return (
                  <div className='link-preview' key={index}>
                    <button className='delete-button' onClick={() => removeItem(index)}>×</button>
                    <img src={item.og_image} className='icon' />
                    <div className='text-container'>
                      <h5>{item.og_title}</h5>
                      <p>タグ：{item.tag.map((tags) => {
                          return (
                              <span id="tags">{tags}</span>
                          )
                      })}</p>
                      <p>{item.og_description}</p>
                      <a href={item.og_url} target='_blank'>Read more</a>
                    </div>
                  </div>
                )
              })}
            </div>
            </TabPanel>
            <TabPanel>
            <div className="main_list">
                  <div><h5>タイトル</h5></div>
                  <div><h5>タグ</h5></div>
                  <div><h5>削除</h5></div> 
            </div>
              {metaList.map((item, index) => {
                return (
                  <div className="main_list">
                  <div key={index}>
                      <a href={item.og_url} target='_blank'>{item.og_title}</a>
                  </div>
                  <div key={index}>
                  {item.tag.map((tags) => {
                          return (
                              <text id="tags">{tags}</text>
                          )
                      })}
                  </div>
                  <div key={index}>
                  <button onClick={() => removeItem(index)}>×</button>
                  </div>
                  </div>
                )
              })}
            </TabPanel>
        </Tabs>
        </div>
        </>
    )
}

export default MainApp;

if (document.getElementById('mainApp')) {
    const Index = ReactDOM.createRoot(document.getElementById("mainApp"));

    Index.render(
        <React.StrictMode>
            <MainApp/>
        </React.StrictMode>
    )
}