import useSWR from "swr";

const useFetch = (endpoint) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  if (endpoint === null) {
    return useSWR(null, fetcher);
  }

  const url = "https://young-ravine-65632.herokuapp.com/";
  const full = `${url}${endpoint}`;

  return useSWR(full, fetcher);
};

export default useFetch;
