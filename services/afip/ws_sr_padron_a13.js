import soap from "soap";
const url = process.env.URL_PADRON_A13;

export const getPerson = async (data) => {
  try {
    let client = await soap.createClientAsync(url);
    let result = await client.getPersonaAsync(data);

    return result;
  } catch (error) {
    return error;
  }
};
