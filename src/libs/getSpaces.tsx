// libs/getSpaces.js
export default async function getSpaces() {
  const res = await fetch('http://localhost:5000/api/v1/coworkingspaces')

  if (!res.ok) throw new Error('Failed')

  return res.json()
}