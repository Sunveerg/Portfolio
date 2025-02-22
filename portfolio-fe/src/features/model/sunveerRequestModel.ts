export interface quotesRequestModel {
    quote: string;
    author: string;
}

export interface sunveerRequestModel {
  skills: string;
  hobbies: string;
  description: string;
  quotesList: quotesRequestModel[];
}
