/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./css/main.css";
import { tagsGrid } from "./emotionCss";
import { css } from "@emotion/react";

//metaタグの中身
type Meta = {
  tag: string[];
  og_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_date: string;
};

function MainApp() {
  const [meta, setMeta] = useState<Meta[]>([]);
  const [metaList, setMetaList] = useState<Meta[]>(meta);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const [array, setArray] = useState(["main", "art", "sub"]);

  // meta内容の取得
  const url_Ref = useRef<HTMLInputElement>(null);
  const tag_Ref = useRef<HTMLInputElement>(null);

  // URLタイトル取得
  async function getToken() {
    const response = await fetch("/get_csrf_token");
    const token = await response.text();
    return token;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // urlからmetaタグの内容を取得する
    const token = await getToken();
    if (url_Ref.current !== null) {
      // nullチェックを追加
      const response = await fetch("/get_metatag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify({ url: url_Ref.current.value }),
      });
      const data = await response.json();

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
    }
  };

  useEffect(() => {
    // metaタグが更新された場合、metaListも更新する
    setMetaList(meta);
    console.log("metaList更新");
    }, [meta]);

  useEffect(() => {
    // 検索結果記事を抽出する
    setMetaList((prevList) => {
      // タグに一致する記事をfilterで抽出
      let newList = prevList.filter((obj) => {
        let result = selectedTag.every((tag) => {
          const findResult = obj.tag.find((kijiTag) => kijiTag === tag);
          if (findResult) {
            return true;
          } else {
            return false;
          }
        });
        // 選択中タグを全て含む記事をtrueとして返却
        return result;
      });
      return newList;
    });

    console.log("start");

    // クリーンアップ処理
    return () => {
      // 検索結果を初期状態に戻す
      setMetaList(() => meta);
      console.log("clean");
    };
    // タグが選択された時に実行する
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
      setSelectedTag((selected) => [...selected, e.target.id]);
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
        {array.map((val, i) => (
          <button
            key={i}
            id={val}
            css={[grigItem(selectedTag, val)]}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              push(e)
            }
          >
            {val}
          </button>
        ))}
      </div>
        <br/>
        <br/>
        <br/>
            <ul className="main">
            {metaList.map((item, index) => {
                return (
                    <li className='link-preview' key={index}>
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
                    </li>
                )
            }
            )}
            </ul>
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