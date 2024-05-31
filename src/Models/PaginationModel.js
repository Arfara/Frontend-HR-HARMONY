export const getPaginatedData = (data, page, perPage) => {
    const offset = (page - 1) * perPage;
    return data.slice(offset, offset + perPage);
  };