export interface quotesResponseModel {
  quote: string;
  author: string;
}
export interface sunveerResponseModel {
  sunveerId: string;
  skills: string;
  hobbies: string;
  description: string;
  quotesList: quotesResponseModel[];
}
