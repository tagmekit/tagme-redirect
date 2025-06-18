export default async function handler(req, res) {
  const { item_id } = req.query;

  const airtableToken = process.env.AIRTABLE_TOKEN;
  const baseId = "apprezQKZwAZ4oaSn";
  const tableName = "Registered Items";

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?filterByFormula={item_id}="${item_id}"`;

  try {
    const airtableRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableToken}`,
      },
    });
    const data = await airtableRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Airtable." });
  }
}
