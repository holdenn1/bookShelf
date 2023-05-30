import React from 'react';

export interface IChildren {
	children: React.ReactNode;
}

export interface INavButtons {
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface IBook {
	id: string;
	userEmail: string;
	userId: string;
	title: string;
	description: string;
	cover: string;
	favorite: boolean;
	seesEveryone: boolean;
	booksEveryoneCollectionID?: string;
	rating: number;
	usersWhoLikesBook: string[];
	usersWhoUnlikesBook: string[];
	usersWhoSendMessage: string[];
}

export interface IUser {
	id: string;
	email: string;
}

export interface IAccount {
	user: IUser;
	library: IBook[];
	favoriteBooks: IBook[];
	loading: boolean;
	error: string;
	chats: IChats[];
	messages: IMessage[];
}

export interface IMainReducer {
	visibleAddingBookForm: boolean;
	visibleMessageForm: boolean;
	isOpenSearchMenu: boolean;
	visibleMenu: boolean;
	search: string;
	currentBook: IBook;
	booksSeesEveryone: IBook[];
	isOpenChatList: boolean;
}

export type SetFavoriteAndPublicProps = {
	book: IBook;
	library: IBook[];
	user: IUser;
};

export type LikeAndUnLikeProps = {
	isAuth: boolean;
	user: IUser;
	book: IBook;
};

export type BookIconProps = {
	isAuth?: boolean;
	checkCurrentUser: boolean;
	book: IBook;
};

export interface IChats {
	fromUserId: string;
	fromUserEmail?: string;
	toUserId: string;
	toUserEmail?: string;
	bookTitle: string;
	book: string;
	chatId: string;
	firstUserChatId: string;
	secondUserChatId: string;
	booksEveryoneCollectionID: string;
	bookId: string;
}

export interface IMessage {
	senderId: string;
	message: string;
	timestamp: object;
}
