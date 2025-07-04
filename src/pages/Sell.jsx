import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Display, Frame, TextField } from "@components";
import { t, s, r, c, img } from "@res";
import { extractTags, decorateTags, img2url, url2blob } from "@utils";

export default function (props) {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(Math.random().toString(36).substring(2, 10));
  const fileInputRef = useRef(null);
  const [sellInfo, setSellInfo] = useState({
    title: "",
    thumb: currentPage,
    pages: {
      [currentPage]: {
        imgURL: "",
        desc: "",
        prev: currentPage,
        next: currentPage,
      },
    },
    tags: [],
    level: 0,
    price: 0,
    sellerInfo: {
      uid: null,
      username: null,
    },
    dt_upload: null,
  });
  const [imgInfo, setImgInfo] = useState({
    [currentPage]: {
      dataURL: img.thumb_default,
    },
  });
  const [msgErr, setMsgErr] = useState("");

  const updateSellInfo = (props) => {
    setSellInfo((sellInfo) => ({
      ...sellInfo,
      ...props,
    }));
  };

  const handleDescUpdate = useCallback(
    (desc) => {
      const tags = extractTags(desc);

      setSellInfo((prevSellInfo) => ({
        ...prevSellInfo,
        pages: {
          ...prevSellInfo.pages,
          [currentPage]: {
            ...(prevSellInfo.pages[currentPage] || {}),
            desc: desc,
          },
        },
        tags: [...new Set(tags)],
      }));
    },
    [currentPage, setSellInfo]
  );

  useEffect(() => {
    if (!loading && !userData) {
      navigate(r.signin);
    }
    updateSellInfo({
      sellerInfo: {
        uid: userData?.uid,
        username: userData?.username,
      },
    });
  }, [loading, userData, navigate, r.toppage]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          setImgInfo({
            ...imgInfo,
            [currentPage]: {
              dataURL: img2url(img),
            },
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setImgInfo({
      ...imgInfo,
      [currentPage]: {
        dataURL: img.thumb_default,
      },
    });
  };

  const upload = async () => {
    console.log(sellInfo);
    // return;
    if (!userData) {
      setMsgErr("もう一度ログインしてください");
      return;
    } else if (sellInfo.title == "") {
      setMsgErr("商品の名前を決めてください");
      return;
    } else if (sellInfo.desc == "") {
      setMsgErr("商品の説明をしてください");
      return;
    }

    setUploading(true);
    try {
      // upload all images
      await Promise.all(
        Object.entries(sellInfo.pages).map(async ([key, value]) => {
          const imageFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpeg`;

          const snapshot = await uploadBytes(
            ref(storage, `item_images/${userData.uid}/${imageFileName}`),
            url2blob(imgInfo[key].dataURL)
          );
          const imageUrl = await getDownloadURL(snapshot.ref);
          console.log("画像アップロード成功:", imageUrl);

          sellInfo.pages[key].imgURL = imageUrl; // without update component
          return null;
        })
      );

      // upload sellInfo
      await addDoc(collection(db, "items_v2"), {
        ...sellInfo,
        dt_upload: new Date(),
      });
      console.log("Firestoreに商品情報と画像URLを保存成功");
      navigate(r.toppage);
    } catch (e) {
      console.error("アップロード中にエラーが発生しました:", e.message);
      alert("画像のアップロードまたは商品情報の保存に失敗しました。詳細: " + e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Display loading={loading}>
      <Frame>
        <div className="flex flex-row justify-center gap-2 w-full">
          <button className={s.item.title}>{t.pages.sell.title}</button>
          <div className={s.item.title}>|</div>
          <button className={s.item.title_gray} onClick={() => navigate(r.sell_ai)}>
            {t.pages.sell_ai.title}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full bg-white p-2 gap-2">
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-full">
              <img src={imgInfo[currentPage].dataURL} className="w-full" />
            </div>
            <div className="absolute flex flex-row justify-between w-full h-14 gap-4 p-2">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="text-sm text-gray-500 file:mr-2 file:py-2 file:px-3 file:border-none file:bg-red-400/50 file:text-white hover:file:bg-red-500/50 file:cursor-pointer"
                />
                <button
                  className="bg-red-400/50 text-white aspect-square text-2xl hover:bg-red-500/50 h-9"
                  onClick={handleImageClear}
                >
                  {"×"}
                </button>
            </div>
          </div>
          <TextField
          classname={s.item.field.input_lg+"col-span-2 sm:col-span-1"}
            text={sellInfo.pages[currentPage]?.desc || ""}
            onChange={(desc) => handleDescUpdate(desc)}
            placeholder={t.pages.sell.desc}
            decorator={decorateTags()}
          />
          <input
            className={s.item.field.input + "col-span-2"}
            placeholder={t.pages.sell.name}
            value={sellInfo.title}
            onChange={(e) => updateSellInfo({ title: e.target.value })}
          />
          <div className={s.item.tag.flexbox + "col-span-2 h-8"}>
            {sellInfo.tags.length > 0 ? (
              sellInfo.tags.map((tag) => (
                <span key={tag} className={s.item.tag.view}>
                  {tag}
                </span>
              ))
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-start col-span-2">
                <div className="text-sm text-gray-400 text-center">（タグなし）</div>
              </div>
            )}
          </div>
        </div>
        {msgErr && <div className={s.item.field.err}>{msgErr}</div>}
        <button
          className={`${s.item.btn.ok} ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={upload}
          disabled={uploading}
        >
          {uploading ? "アップロードしています" : t.pages.sell.upload}
        </button>
      </Frame>
    </Display>
  );
}
