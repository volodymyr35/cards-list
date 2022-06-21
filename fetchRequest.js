const BackendURL = "https://online-store.bootcamp.place/api/";
const newURL = new URL("products", BackendURL);


export const fetchData = async (pageNumber = 1, pageSize) => {
  const getUrl = (pageNumber) =>
    `${newURL}?_page=${pageNumber}&_limit=${pageSize}`;

  return await fetch(getUrl(pageNumber)).then((res) => res.json());
};
