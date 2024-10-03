
export interface CatsTypes {
    categories: {
      id: number;
      name: string;
    }[];
    id: string;
    url: string;
    width: number;
    height: number;
  }

  export interface PaginationTypes{
    total: number;
    page: number;
    limit: number;
  }