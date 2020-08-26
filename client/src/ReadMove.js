import React, { useState, useEffect } from 'react';
import { Tooltip } from '@material-ui/core';

function ReadMore({ content, maxChar }) {
  const [isSliced, setIsSliced] = useState(true);
  useEffect(() => {
    if (content.length <= maxChar) {
      setIsSliced(false);
    }
  }, []);
  const text = isSliced ? content.slice(0, maxChar) : content;

  return (
    <>
      {isSliced
        ? (
          <div>
            <p>
              {text}
              <span>...</span>
            </p>
            <Tooltip placement="top" title="Show all the content">
              <button className="moreLess" onClick={() => setIsSliced(!isSliced)}>See more...</button>
            </Tooltip>
          </div>
        )
        : (
          <div>
            <p>
              {text}
            </p>
            {!(content.length <= maxChar)
              &&
              <Tooltip placement="top" title="Show less content">
                <button className="moreLess" onClick={() => setIsSliced(!isSliced)}>See less...</button>
              </Tooltip>

            }
          </div>
        )}
    </>
  );
}

export default ReadMore;
