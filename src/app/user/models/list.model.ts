export interface List {
  userId: number;
  items: ListItem[];
}

export interface ListItem {
  id: number;
  title: string;
  content: string;
}
