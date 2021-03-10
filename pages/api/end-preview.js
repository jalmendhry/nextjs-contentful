// Clears the preview mode cookies.
export default function handler(req, res) {
  const { url } = req.query;
  res.clearPreviewData();
  res.writeHead(307, { Location: url });
  res.end();
}
