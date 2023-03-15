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
  userId: string
  title: string
  description: string
  cover: string
  favorite: boolean
  seesEveryone: boolean
  booksEveryoneCollectionID?: string
  rating: number
  userWhoLikesBook: string[]
  userWhoUnlikesBook: string[]
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

export type SetFavoriteAndPublicProps = {
  book: IBook
  library: IBook[]
  user: IUser
}

export type LikeAndUnLikeProps = {
  isAuth: boolean
  user: IUser
  book: IBook
}

export type BookIconProps = {
  isAuth?: boolean
  checkCurrentUser: boolean
  book: IBook
}