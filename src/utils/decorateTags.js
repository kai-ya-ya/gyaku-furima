import { CompositeDecorator } from "draft-js";

import { t, s, c } from "@res";

const decorateTags = () => {
  const HashtagSpan = (props) => {
    return <span className={s.item.hashtag}>{props.children}</span>;
  };

  const findHashtags = (contentBlock, callback) => {
    c.hashtag_regex.lastIndex = 0;
    contentBlock.getText().replace(c.hashtag_regex, (match, offset) => {
      callback(offset, offset + match.length);
    });
  };

  return new CompositeDecorator([
    {
      strategy: findHashtags,
      component: HashtagSpan,
    },
  ]);
};

export default decorateTags;