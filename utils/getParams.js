const getUrl = (slug, regex) => {
  const [category, photo, date] = slug;
  const url = new URL(`${process.env.API_URL}/${category}/${photo}?${date}`);
  const params = new URLSearchParams(url.search);
  slug
    .map((s) => {
      if (s.startsWith("c-")) {
        return params.append("camera", s.replace(regex, ""));
      } else if (s.startsWith("p-")) {
        return params.append("page", s.replace(regex, ""));
      }
    })
    .filter(Boolean);

  params.append("api_key", process.env.API_KEY);

  return params;
};

export default getUrl;
