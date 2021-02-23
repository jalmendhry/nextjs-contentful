import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { client } from '../client';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    client
      .getEntries({ content_type: 'post' })
      .then(({ items }) => {
        setPosts(items);
        console.log(items);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="post-list">
      <h1 className="post-list__title">All Posts</h1>

      {posts.length &&
        posts.map(({ fields }, i) => {
          const { title, slug } = fields;

          return (
            <div key={i} className="post-card">
              <h2 className="post-title">
                <Link
                  to={{
                    pathname: `/post/${slug}`,
                    state: {
                      content: fields,
                    },
                  }}>
                  {title}
                </Link>
              </h2>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
