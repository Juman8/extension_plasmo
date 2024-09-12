/* eslint-disable @typescript-eslint/no-explicit-any */
import {configApi} from './config';
import {ROUTE_API} from './route';

let token = '';
export const setToken = (_token: string) => {
  token = _token;
};
export const getToken = (): string => {
  return token;
};
export const onCreateARecipe = (): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.addRecipe;
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((d) => {
      return d;
    })
    .catch((err) => {
      console.log({err});
      return 'Something error';
    });
};

export const onCopyARecipe = (id: number): Promise<any> => {
  const fullUrl = `${configApi.baseUrl + ROUTE_API.addRecipe}/${id}/copy`;
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((d) => {
      return d.data;
    })
    .catch((err) => {
      console.log({err});
      return 'Something error';
    });
};

export const AddManyRecipeLineRequest = async (
  id: string | number,
  body: {recipeLines: any[]}
): Promise<any> => {
  const fullUrl = `${configApi.baseUrl + ROUTE_API.addRecipe}/${id}/recipe-lines`;
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((data) => data.json())
    .then((d) => {
      return d;
    })
    .catch(() => {
      return '';
    });
};

export const UpdateRecipeRequestV2 = async (
  id: string | number,
  body: any
): Promise<any> => {
  const fullUrl = `${configApi.baseUrl + ROUTE_API.addRecipe}/${id}/v2`;
  return fetch(fullUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((data) => data.json())
    .then((d) => {
      return d;
    })
    .catch(() => {
      return '';
    });
};

export const onCheckScrapperUrl = async (url: string): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.checkScrapperUrl;
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({urlScrape: url}),
  })
    .then((data) => data.json())
    .then((d) => {
      return {
        isAlready: d?.data?.isScraped,
        idRecipe: d?.data?.recipeId,
      };
    })
    .catch(() => {
      return '';
    });
};

export const onApiUpdateTag = (id: number, tag: string): Promise<any> => {
  const fullUrl = `${configApi.baseUrl}recipes/${id}/tags`;
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({tagName: tag}),
  })
    .then((data) => data.json())
    .then((d) => {
      return d.data.data;
    })
    .catch((err) => {
      console.log({err});
      return 'Something error';
    });
};
// api/

export const onApiRemoveTag = (id: number, idTag: number): Promise<any> => {
  const fullUrl = `${configApi.baseUrl}recipes/${id}/tags/${idTag}`;
  return fetch(fullUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((d) => {
      return d;
    })
    .catch((err) => {
      console.log({err});
      return 'Something error';
    });
};

export const searchTagsRequest = (search: string): Promise<any> => {
  const fullUrl = `${configApi.baseUrl}search/tags?search=${search}&limit=5`;
  return fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((d) => {
      return d.data.items;
    })
    .catch((err) => {
      console.log({err});
      return 'Something error';
    });
};
