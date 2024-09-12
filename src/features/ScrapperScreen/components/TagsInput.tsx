import React, {useEffect, useRef, useState} from 'react';

import './tags.scss';
import {onApiRemoveTag, onApiUpdateTag, searchTagsRequest} from '~api/common';
import {onHideExtension} from '../helper';

let refDebounce: any = null;
let refDebounce1: any = false;
let refHide: any = null;

export const AddTagsInput = ({dataRecipe}: {dataRecipe: any}): JSX.Element => {
  const [selected, setSelected] = useState<
    {value: string; id: number; isTemp?: boolean}[]
  >([]);
  const [dataSuggest, setDataSuggest] = useState<any[]>([]);
  const ref = useRef<any>();
  const refInput = useRef<any>();
  const popupContainer: any = document.querySelector('.popup-container');

  const onUpdateTags = async (tag: string, idConnect: number): Promise<any> => {
    const res = await onApiUpdateTag(dataRecipe.id, tag);
    if (res.id) {
      setSelected((prv: any) =>
        prv.map((it: any) => {
          if (it.id === idConnect) {
            return {
              ...it,
              id: res.id,
              isTemp: false,
            };
          }
          return it;
        })
      );
    }
  };

  useEffect(() => {
    if (selected.length) {
      if (ref.current) {
        clearTimeout(ref.current);
      }
      ref.current = setTimeout(() => {
        if (selected[0].isTemp) {
          onUpdateTags(selected[0].value, selected[0].id);
        }
      }, 0);
    }
  }, [selected]);

  const onRemoved = (index: number): void => {
    const id: any = selected[index]?.id;
    if (id && !selected[index].isTemp) {
      onApiRemoveTag(dataRecipe.id, id);
    }
    setSelected((prv) => prv.filter((el) => el.id !== id));
  };

  useEffect(() => {
    setDataSuggest([]);
    popupContainer?.classList?.remove('active');
    refDebounce1 = true;
  }, [selected]);

  const onSearchValue = async (value: string): Promise<any> => {
    if (!value.trim()) {
      setDataSuggest([]);
      return;
    }
    const dataRequest = await searchTagsRequest(value.trim());
    setDataSuggest((dataRequest ?? [])?.slice(0, 3));
  };

  useEffect(() => {
    if (!dataSuggest.length) {
      return;
    }
    setTimeout(() => {
      if (refDebounce1) {
        return;
      }
      setTimeout(() => popupContainer?.classList?.add('active'), 1000);
    }, 500);
  }, [dataSuggest]);

  useEffect(() => {
    if (dataSuggest.length) {
      popupContainer?.classList?.add('active');
    } else {
      popupContainer?.classList?.remove('active');
    }
  }, [dataSuggest]);

  useEffect(() => {
    refHide = setTimeout(() => {
      onHideExtension()
    }, 10000);
  }, []);

  return (
    <div id="inputTags">
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          ref={refInput}
          className="inputTagsValue"
          type="text"
          placeholder="+ Add tags"
          style={{padding: 5, borderRadius: 4}}
          onKeyDown={(e) => {
            if (e.code === 'Enter' && refInput.current.value?.trim()) {
              const value = refInput.current.value.trim();
              refInput.current.value = '';
              setSelected((prv: any) =>
                [
                  {
                    value,
                    id: new Date().getTime(),
                    isTemp: true,
                  },
                ].concat(prv)
              );
              setTimeout(() => {
                refInput.current.focus();
              }, 400);
            }
          }}
          onChange={() => {
            refDebounce1 = false;
            if (refDebounce) {
              clearTimeout(refDebounce);
            }
            refDebounce = setTimeout(
              () => onSearchValue(refInput.current.value.trim()),
              500
            );
          }}
          onFocus={() => {
            clearTimeout(refHide);
          }}
          onBlur={() => {
            setTimeout(() => {
              // setDataSuggest([]);
              refDebounce1 = true;
              popupContainer?.classList?.remove('active');
            }, 150);
          }}
        />
        <div
          style={{
            display: 'flex',
            overflow: 'auto',
            width: 250,
          }}
        >
          {selected.map((it, index) => {
            return (
              <div
                key={`${it.id || it.value}${index}`}
                style={{
                  position: 'relative',
                  justifyItems: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
                className="rti--tag_v"
              >
                <span>{it.value}</span>
                <button
                  type="button"
                  aria-label="remove"
                  onClick={() => {
                    onRemoved(index);
                  }}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="popup-container active">
          {!!dataSuggest.length && (
            <ul className="suggestion-list plasmo-cursor-pointer">
              {dataSuggest.slice(0, 2).map((it: any) => {
                return (
                  <li
                    key={it.id}
                    onClick={() => {
                      refInput.current.value = '';
                      setSelected((prv: any) =>
                        [
                          {
                            value: it.tagName,
                            id: new Date().getTime(),
                            isTemp: true,
                          },
                        ].concat(prv)
                      );
                    }}
                  >
                    {it.tagName}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
