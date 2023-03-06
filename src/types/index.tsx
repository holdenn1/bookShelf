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
}

export interface IUser {
  id: string,
  email: string | null,
}

export interface IAccount {
  user: IUser
  visibleAddingBookForm: boolean,
  library: IBook[]
  favoriteBooks: IBook[]
  search: string
}