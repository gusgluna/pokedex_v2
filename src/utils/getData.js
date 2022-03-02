const API = process.env.API;

const getData = async (id) => {
  const apiURL = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Fetch Error", err);
  }
};

export default getData;
