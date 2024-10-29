//
export default async (req, res) => {
  const response = await fetch("https://loripsum.net/");
  const data = await response.text();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(data);
};
