/* eslint-disable import/order */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useEffect} from 'react';
import {onHideExtension, onOpenNewTab} from '../helper';
import {configApi} from '~api/config';

const isHide: any = null;

enum TypeButton {
  isAdd = 'isAdd',
  success = 'success',
  isOpenLink = 'isOpenLink',
}

type DataMessageTypeProps = {
  type: TypeButton;
  value: string;
  recipeName?: string;
  urlCallback: string;
};

interface PropContentBody {
  dataMessage: DataMessageTypeProps;
}

export const ContentBody = ({
  dataMessage,
}: PropContentBody): JSX.Element | null => {
  const {type, value, recipeName, urlCallback} = dataMessage;

  const onRedirectToWebsite = async (typeOfAction: string): Promise<void> => {
    if (isHide) {
      clearTimeout(isHide);
    }
    switch (typeOfAction) {
      case TypeButton.isAdd: {
        onOpenNewTab(`${configApi.baseHostWeb}?isCreate_Recipe=true`);
        break;
      }
      case TypeButton.success: {
        onOpenNewTab(urlCallback);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (dataMessage?.type === TypeButton.isAdd) {
      setTimeout(() => {
        onHideExtension()
      }, 5000);
    }
  }, [dataMessage]);

  switch (type) {
    case TypeButton.isAdd: {
      return (
        <div
          style={{
            justifyItems: 'left',
            display: 'flex',
            fontSize: 16,
          }}
        >
          <span>
            {dataMessage.value}
            <br />
            <span
              style={{textDecorationLine: 'underline'}}
              className="plasmo-cursor-pointer"
              onClick={() => onRedirectToWebsite(TypeButton.isAdd)}
            >
              Add recipe manually
            </span>
          </span>
        </div>
      );
    }

    case TypeButton.success: {
      return (
        <div
          style={{
            fontSize: 16,
          }}
        >
          <span>
            <span
              style={{textDecorationLine: 'underline', marginLeft: 2}}
              onClick={() => onRedirectToWebsite(TypeButton.success)}
              className="plasmo-cursor-pointer"
            >
              {recipeName}
            </span>
            {value}
          </span>
        </div>
      );
    }
    case 'isOpenLink': {
      return (
        <div
          style={{
            justifyItems: 'left',
            display: 'flex',
            fontSize: 16,
            width: '100%',
          }}
        >
          <span>
            <span
              style={{textDecorationLine: 'underline', marginLeft: 2}}
              onClick={() => onRedirectToWebsite(TypeButton.success)}
              className="plasmo-cursor-pointer"
            >
              Open {recipeName}
            </span>
          </span>
        </div>
      );
    }
    default:
      return null;
  }
};
