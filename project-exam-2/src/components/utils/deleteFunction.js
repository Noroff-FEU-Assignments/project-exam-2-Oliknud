export const deleteFunction = async (URL, id, auth) => {
  const data = JSON.stringify(URL, id);

  const options = {
    method: "DELETE",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  };

  try {
    await fetch(`${URL}/${id}`, options);
  } catch (error) {
    console.log(error);
  }
};
