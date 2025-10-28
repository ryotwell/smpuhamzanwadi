
import useSWR from 'swr';
import axios from '../lib/axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useSWRHook(url: string) {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
