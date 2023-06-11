import { createRef } from 'react';

import { handleErrorApi, logout } from '@common';
import {
  CODE_SUCCESS,
  CODE_TIME_OUT,
  ERROR_NETWORK_CODE,
  RESULT_CODE_PUSH_OUT,
  STATUS_TIME_OUT,
} from '@config/api';
import { ParamsNetwork } from '@config/type';
import type {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
} from '@tanstack/react-query';
import { translate } from '@utils/i18n/translate';
import { AxiosError, AxiosResponse, Method } from 'axios';

const responseDefault: ResponseBase<Record<string, unknown>> = {
  code: -500,
  status: false,
  msg: translate('error:have_error'),
};

export const onPushLogout = async () => {
  logout();
  /**
   * do something when logout
   */
};

export const controller = createRef<AbortController>();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// init controller
controller.current = new AbortController();

export const cancelAllRequest = () => {
  controller.current?.abort();

  // reset controller, if not. all request cannot execute
  // because old controller was aborted
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  controller.current = new AbortController();
};

export const handleResponseAxios = <T = Record<string, unknown>>(
  res: AxiosResponse<T>,
): ResponseBase<T> => {
  if (res.data) {
    return { code: CODE_SUCCESS, status: true, data: res.data };
  }

  return responseDefault as ResponseBase<T>;
};

export const handleErrorAxios = <T = Record<string, unknown>>(
  error: AxiosError,
): ResponseBase<T> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return handleErrorApi(CODE_TIME_OUT) as unknown as ResponseBase<T>;
  }

  if (error.response) {
    if (error.response.status === RESULT_CODE_PUSH_OUT) {
      return handleErrorApi(RESULT_CODE_PUSH_OUT) as unknown as ResponseBase<T>;
    } else {
      return handleErrorApi(error.response) as unknown as ResponseBase<T>;
    }
  }

  return handleErrorApi(ERROR_NETWORK_CODE) as unknown as ResponseBase<T>;
};

export const handlePath = (url: string, path: ParamsNetwork['path']) => {
  if (!path || Object.keys(path).length <= 0) {
    return url;
  }

  let resUrl = url;
  Object.keys(path).forEach(k => {
    resUrl = resUrl.replaceAll(`{${k}}`, String(path[k]));

    resUrl = resUrl.replaceAll(`:${k}`, String(path[k]));
  });

  return resUrl;
};

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method,
): ParamsNetwork => {
  const { url, body, path, params } = props;

  return {
    ...props,
    method,
    url: handlePath(url, path),
    data: body,
    params,
  };
};

// REACT-QUERY

type KeyParams = {
  [key: string]: any;
};

export interface PaginateQuery<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const DEFAULT_LIMIT = 10;

export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])];
}

// for infinite query pages  to flatList data
export function normalizePages<T>(pages?: PaginateQuery<T>[]): T[] {
  return pages
    ? pages.reduce((prev: T[], current) => [...prev, ...current.results], [])
    : [];
}

// a function that accept a url and return params as an object
export function getUrlParameters(
  url: string | null,
): { [k: string]: string } | null {
  if (url === null) {
    return null;
  }

  const regex = /[?&]([^=#]+)=([^&#]*)/g;

  const params: Record<string, string> = {};

  let match;

  while ((match = regex.exec(url))) {
    if (match[1] !== null) {
      // eslint-disable-next-line prefer-destructuring
      params[match[1]] = match[2];
    }
  }

  return params;
}

export const getPreviousPageParam: GetNextPageParamFunction<
  PaginateQuery<unknown>
> = page => getUrlParameters(page.previous)?.offset ?? null;

export const getNextPageParam: GetPreviousPageParamFunction<
  PaginateQuery<unknown>
> = page => getUrlParameters(page.next)?.offset ?? null;
