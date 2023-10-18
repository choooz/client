export type FetchArgs = [string | URL, RequestInit | undefined];
export type HttpFetch = typeof createHttpFetch;

export interface HttpFetchDefaultOptions {
  fetch?: ReturnType<HttpFetch>;
  baseUrl?: string | URL;
  headers?: HeadersInit;
  interceptors?: {
    request?: (
      requestArgs: FetchArgs,
      fetch: NonNullable<HttpFetchDefaultOptions["fetch"]>,
    ) => Promise<FetchArgs>;
    response?: (
      response: Response,
      requestArgs: FetchArgs,
      fetch: NonNullable<HttpFetchDefaultOptions["fetch"]>,
    ) => Promise<Response>;
  };
}

const applyDefaultOptions = (
  [input, requestInit]: FetchArgs,
  defaultOptions?: HttpFetchDefaultOptions,
): FetchArgs => {
  const headers = new Headers(defaultOptions?.headers);
  new Headers(requestInit?.headers).forEach((value, key) => {
    headers.set(key, value);
  });

  let inputToReturn: FetchArgs[0] = input;
  if (defaultOptions?.baseUrl) {
    inputToReturn = new URL(input, defaultOptions.baseUrl);
  }

  return [
    inputToReturn,
    {
      ...requestInit,
      headers,
    },
  ];
};

const mergeRequestObjectWithRequestInit = (
  request: Request,
  requestInit?: RequestInit,
): Promise<RequestInit> => {
  const mergedRequest = new Request(request, requestInit);
  return new Response(mergedRequest.body).arrayBuffer().then((body) => ({
    body: body,
    cache: mergedRequest.cache,
    credentials: mergedRequest.credentials,
    headers: mergedRequest.headers,
    integrity: mergedRequest.integrity,
    keepalive: mergedRequest.keepalive,
    method: mergedRequest.method,
    mode: mergedRequest.mode,
    redirect: mergedRequest.redirect,
    referrer: mergedRequest.referrer,
    referrerPolicy: mergedRequest.referrerPolicy,
    signal: mergedRequest.signal,
    window: requestInit?.window,
  }));
};

const normalizeArgs = async (...args: Parameters<typeof fetch>): Promise<FetchArgs> => {
  let input: string | URL;
  let requestInit: RequestInit | undefined;
  if (args[0] instanceof Request) {
    input = args[0].url;
    requestInit = await mergeRequestObjectWithRequestInit(args[0], args[1]);
  } else {
    input = args[0];
    requestInit = args[1];
  }

  return [input, requestInit];
};

export const createHttpFetch =
  (defaultOptions?: HttpFetchDefaultOptions) =>
  async (...args: Parameters<typeof fetch>): Promise<Response> => {
    const defaultOptionAppliedArgs = applyDefaultOptions(
      await normalizeArgs(...args),
      defaultOptions,
    );

    const fetchProvided = defaultOptions?.fetch || fetch;
    let requestInterceptorAppliedArgs: FetchArgs;
    if (defaultOptions?.interceptors?.request) {
      requestInterceptorAppliedArgs = await defaultOptions?.interceptors?.request?.(
        defaultOptionAppliedArgs,
        fetchProvided,
      );
    } else {
      requestInterceptorAppliedArgs = defaultOptionAppliedArgs;
    }

    const response = await fetchProvided(...requestInterceptorAppliedArgs);

    return (
      defaultOptions?.interceptors?.response?.(
        response,
        requestInterceptorAppliedArgs,
        fetchProvided,
      ) || response
    );
  };
