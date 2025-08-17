import { t, s, c } from "@res";

function genRandomFragments() {
  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, index) => {
    const newFragmentId = Math.floor(Math.random() * 10000);
    const newFragmentType =
      c.fragment.type[Object.keys(c.fragment.type)[Math.floor(Math.random() * Object.keys(c.fragment.type).length)]];
    const newFragmentStar = Math.floor(1 + Math.random() * 2);
    return {
      id: `${newFragmentType}_${newFragmentId}`,
      title: `${c.fragment.info[newFragmentType].name}${newFragmentId}号`,
      type: newFragmentType,
      desc: `${c.fragment.info[newFragmentType].name}とは、「${c.fragment.info[newFragmentType].desc}」です`,
      star: newFragmentStar,
    };
  });
}

export default function (action) {
  console.log(`api_debug: ${action.type}`);
  console.log(action.value);

  switch (action.type) {
    case c.action.type.ENCHANT_MERGE:
      const fragmentId = Math.floor(Math.random() * 10000);
      const star = Math.floor(1 + Math.random() * 2);

      return {
        status: c.status.SUCCESS,
        data: {
          id: `${c.fragment.type.CHALLENGE}_${fragmentId}`,
          title: `チャレンジ${fragmentId}号`,
          type: c.fragment.type.CHALLENGE,
          desc: `this is response\n${fragmentId}`,
          star: star,
          parents: action.value,
        },
      };
    case c.action.type.SEND_MESSAGE:
      const messageId = Math.floor(Math.random() * 10000);
      //   console.log(newFragment);
      return {
        status: c.status.SUCCESS,
        data: {
          message: { id: messageId, role: "system", content: `this is response\n${messageId}` },
          new_fragments: genRandomFragments(),
        },
      };
    default:
      return { status: c.status.FAILED, reason: "invalid action", data: null };
  }
}
