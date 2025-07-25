type IOptions = {
  page: string | undefined;
  limit: string | undefined;
  sortBy: string | undefined;
  sortOrder: string | undefined;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

export const calculatePagination = (options: IOptions): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;

  const sortBy: string = options.sortBy || "createdAt";
  const sortOrder: string = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
