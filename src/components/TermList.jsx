import React, { useState, useEffect, useContext } from "react";

import Term from "@components/Term";
import Text from "@components/Text";
import Flex from "@components/Flex";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function ({ terms }) {
  return (
    <div>
      {terms && terms.length !== 0 ? (
        <div className="flex flex-row items-start justify-between flex-wrap gap-2 p-4">
          {terms.map((term) => (
            <Flex className="gap-1">
              <Term key={term.id} term={term} showHighlight={true} />
              <Flex dim="row" className={"justify-between"}>
                {/* <div className={s.term[term.data.itemInfo.type].tag}>{s.term[term.data.itemInfo.type].name}</div> */}
                <div></div>
                <Text className={s.text.meta} text={timeAgo(term.data.uploadInfo.createdAt)} />
              </Flex>
            </Flex>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">{t.pages.toppage.no_terms_found}</p>
      )}
    </div>
  );
}
