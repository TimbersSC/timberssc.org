export type Categories =
  | 'engineering'
  | 'product'
  | 'professional development'
  | 'education'
  | 'security'
  | 'open source'
  | 'company'
  | 'community'
  | 'policy'
  | 'changelog';

export type Status = 'PUBLISHED' | 'DRAFT' | 'REVIEWING' | 'ARCHIVED';

export interface Article$MetaData {
  id: string;
  category: Categories;
  author: string;
  authorEmail: string;
  published: string;
  edited: string;
  status: Status;
}
