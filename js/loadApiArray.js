export default async function loadApiArray(arr) {
  const res = await Promise.all(
    arr.map((src) => fetch(src).then((res) => res.json()))
  );
  return res;
}