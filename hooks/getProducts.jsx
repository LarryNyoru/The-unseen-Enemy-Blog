export const getIProdcuts = async () => {
  const res = await fetch(
    `https://6538cde4a543859d1bb1f2a3.mockapi.io/products`,
    {
      cache: "no-cache",
      next: { tags: ["products"] },
    }
  );
  //   const products = await res.json();
  return res.json();
};
