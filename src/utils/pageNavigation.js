export const findSlug = (param, slug) =>
  slug.find((s) => {
    if (s.startsWith(param)) {
      return s;
    }
  });

export const nextPage = (slug, page, regex) => {
  const [category, photo, date] = slug;
  if (findSlug("c-", slug)) {
    return `${category}/${photo}/${date}/c-${findSlug("c-",slug).replace(
      regex,
      ""
    )}/p-${parseInt(page) + 1}`;
  } else {
    return `/rover/${category}/photos/${date}/p-${parseInt(page) + 1}`;
  }
};

export const prevPage = (slug, page, regex) => {
  const [category, photo, date] = slug;
  if (findSlug("c-", slug)) {
    return `${category}/${photo}/${date}/c-${findSlug("c-",slug).replace(
      regex,
      ""
    )}/p-${parseInt(page) - 1}`;
  } else {
    return `/rover/${category}/photos/${date}/p-${parseInt(page) - 1}`;
  }
};


