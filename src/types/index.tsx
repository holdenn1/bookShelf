import React from "react";

export interface IChildren {
  children: React.ReactNode
}

export interface INavButtons {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export interface IBook {
  id: string
  title: string,
  description: string
  cover: string
  favorite?: boolean
  seesEveryone: boolean
}

export interface IUser {
  id: string,
  email: string | null,
}

export interface IAccount {
  user: IUser
  library: IBook[]
  favoriteBooks: IBook[]
}

export interface IMainReducer{
  visibleAddingBookForm: boolean
  search: string
  booksSeesEveryone: IBook[]
}