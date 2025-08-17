// Sandbox.jsx
import React, { useState, useEffect, useContext } from "react";
import { t, s, r, img, c } from "@res";
import { functions } from "@firebaseApp";
import { httpsCallable } from "firebase/functions";

export default function () {
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [concepts, setConcepts] = useState(c.concepts);
  const [conceptModel, setConceptModel] = useState({
      domains: [],
      needs: [],
      personas: [],
      contexts: [],
      seeds: [],
      ideas: [],
      use_cases: [],
      scenarios: [],
      functions: [],
      products: [],
      customer_journeys: [],
    });
  const [newConceptViewVisbility, setNewConceptViewVisbility] = useState(false);
  const [newConceptViewError, setNewConceptViewError] = useState(null);
  const [newConcept, setNewConcept] = useState(null);
  const [isLoadingFillModel, setIsLoadingFillModel] = useState(false);
  const fillModelCallable = httpsCallable(functions, "fillModel");

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setConceptModel((prev) => prev.filter((concept) => concept.id !== id));
    setSelectedConcept(null);
  };
  const handleAdd = (e, id) => {
    e.stopPropagation();
    const concept = concepts.filter((concept) => concept.id == id)[0];
    setConceptModel((prev) => [...prev, concept]);
    setSelectedConcept(concept);
    setSelectedType(null);
  };
  const handleCreate = (e) => {
    e.stopPropagation();
    if (!newConcept || !newConcept.type) setNewConceptViewError("Type is empty");
    else if (!newConcept.name) setNewConceptViewError("Name is empty");
    else if (!newConcept.desc) setNewConceptViewError("Desc is empty");
    else {
      setNewConceptViewError(null);
      const concept = { ...newConcept, id: concepts.length };
      setConcepts((prev) => [...prev, concept]);
      setNewConcept(null);
      setSelectedConcept(concept);
      setSelectedType(null);
      setNewConceptViewVisbility(false);
    }
  };
  const handleSetType = (e, type) => {
    e.stopPropagation();
    if (selectedType !== type) {
      setSelectedType(type);
    } else {
      setSelectedType(null);
    }
    setSelectedConcept(null);
  };
  const handleSetConcept = (e, concept) => {
    e.stopPropagation();
    if (selectedConcept !== concept) {
      setSelectedConcept(concept);
    } else {
      setSelectedConcept(null);
    }
    setSelectedType(null);
  };
  const handleCloseNewConceptView = (e) => {
    e.stopPropagation();
    setNewConceptViewVisbility(false);
    setNewConcept(null);
  };
  const handleFillModel = async (e) => {
    console.log(conceptModel);
    return
    e.stopPropagation();
    setIsLoadingFillModel(true); // ローディング開始
    try {
      // Promiseが解決されるのをawaitで待つ
      const result = await fillModelCallable(conceptModel); 
      // result.data には、補完された ConceptModel オブジェクトが直接入っています
      const completedConceptModel = result.data;
      console.log("補完されたコンセプトモデル:", completedConceptModel);

      // ここでUIを更新したり、ステートに保存したりする
      // 例: setConceptModel(completedConceptModel); 
      // 必要に応じて、completion_descから既存のconceptModelを更新するロジックを実装します

    } catch (error) { // 変数名を 'e' から 'error' に変更すると分かりやすい
      console.error("オートフィル関数呼び出し中にエラーが発生しました:", error); // エラーログをより詳細に
      // エラーの表示などを行う
    } finally {
      setIsLoadingFillModel(false); // ローディング終了 (成功・失敗に関わらず)
    }
  };
  const conceptsBox = (
    <div className="border-blue-300 border-2">
      <div className="text-center">表示：{selectedType || "全て"}</div>
      <div className="flex flex-row flex-wrap justify-center gap-2 p-2">
        {concepts
          .filter((concept) => concept.type === (selectedType || concept.type))
          .map((concept, i) => {
            const isContain = conceptModel.some((c) => c.id === concept.id);
            return (
              <button
                key={concept["id"]}
                className={"px-2 " + (isContain ? "bg-blue-300" : "border-2 border-blue-300")}
                onClick={() => {
                  setSelectedConcept(concept);
                }}
              >
                {concept.name}
              </button>
            );
          })}
        <button
          key="add"
          className={"px-2 border-2 border-blue-300 underline"}
          onClick={() => {
            setNewConceptViewVisbility(true);
          }}
        >
          新規作成
        </button>
      </div>
    </div>
  );
  const newConceptView = (
    <div
      className="w-full h-full bg-black/50 absolute top-0 left-0 flex justify-center"
      onClick={(e) => handleCloseNewConceptView(e)}
    >
      <div className="flex flex-col justify-center items-center h-full min-w-[50%]">
        <div className="flex flex-col bg-white w-full p-2" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">新規作成</div>
          <div className="grid grid-cols-[max-content_1fr] gap-2">
            <div>種類</div>
            <select className="border-2" onChange={(e) => setNewConcept((prev) => ({ ...prev, type: e.target.value }))}>
              <option key="empty" value={null}></option>
              {Object.keys(c.type_desc).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <div>名前</div>
            <input
              className="border-2"
              onChange={(e) => setNewConcept((prev) => ({ ...prev, name: e.target.value }))}
            ></input>
            <div>説明</div>
            <input
              className="border-2"
              onChange={(e) => setNewConcept((prev) => ({ ...prev, desc: e.target.value }))}
            ></input>
          </div>
          {newConceptViewError && <div className="text-red-400 text-center">{newConceptViewError}</div>}
          <div className="flex flex-row justify-center gap-4">
            <button className="text-center underline" onClick={(e) => handleCreate(e)}>
              OK
            </button>
            <button className="text-center underline" onClick={(e) => handleCloseNewConceptView(e)}>
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const conceptView = (
    <div className="border-blue-300 border-2">
      <div className="flex flex-col flex-wrap items-center gap-2 p-2">
        {selectedConcept ? (
          <>
            <div>
              （{selectedConcept.type}）{selectedConcept.name}
            </div>
            <div>{selectedConcept.desc}</div>
            <div className="flex flex-row items-center">
              {conceptModel.some((c) => c.id === selectedConcept.id) ? (
                <button className="text-red-500 underline" onClick={(e) => handleDelete(e, selectedConcept.id)}>
                  削除
                </button>
              ) : (
                <button className="underline" onClick={(e) => handleAdd(e, selectedConcept.id)}>
                  追加
                </button>
              )}
            </div>
          </>
        ) : selectedType ? (
          <>
            <div>（{selectedType}）</div>
            <div>{c.type_desc[selectedType]}</div>
          </>
        ) : (
          <div>Not selected</div>
        )}
      </div>
    </div>
  );
  const conceptModelView = (
    <div className="border-blue-300 border-2 flex flex-col items-center gap-2 p-2">
      {[
        ["domain"],
        ["needs", "persona", "context", "seeds"],
        ["idea"],
        ["use_case", "scenario", "function"],
        ["product"],
        ["customer_journey"],
      ].map((layer) => (
        <div className="flex flex-row flex-wrap justify-center items-start gap-2 w-full border-b-2 pb-2">
          {layer.map((type) => {
            const ids = conceptModel.filter((concept) => concept.type == type).map((concept) => concept.id);
            return (
              <div
                className={`flex flex-col w-[20%] border-2 ${
                  selectedType === type ? "border-black" : "border-blue-300"
                }`}
              >
                <button className="bg-blue-300 text-center text-white" onClick={(e) => handleSetType(e, type)}>
                  {type}
                </button>
                <div className="flex flex-col">
                  {ids.length > 0 ? (
                    ids.map((id) => {
                      const concept = concepts.filter((concept) => concept.id == id)[0];
                      return (
                        <>
                          <button
                            key={id}
                            className={`px-2 truncate ${
                              selectedConcept?.id === id ? "border-2 border-black" : "border-blue-300 border-t-2"
                            }`}
                            onClick={(e) => {
                              handleSetConcept(e, concept);
                            }}
                          >
                            {concept.name}
                          </button>
                          {selectedConcept?.id === id && (
                            <button className="text-red-500 text-sm underline" onClick={(e) => handleDelete(e, id)}>
                              削除
                            </button>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <div key="empty" className="text-gray-500 text-sm text-center">
                      （なし）
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <button className="border-2 border-black px-2" onClick={(e) => handleFillModel(e)} disabled={isLoadingFillModel}>
        オートフィル
      </button>
    </div>
  );
  return (
    <div className="overflow-y-scroll">
      {newConceptViewVisbility && newConceptView}
      {conceptModelView}
      {conceptView}
      {conceptsBox}
    </div>
  );
}
