import useSWR from "swr";

export const useDashboardTemplate = () => {
  return useSWR("/api/v2/all", (...args) =>
    fetch(...args)
      .then((res) => res.json())
      .then((data) => data._template)
      .catch((error) => console.log(error))
  );
};
