/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Messages = "Messages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type MessagesRecord = {
	sentBy: RecordIdString
	text: string
}

export type UsersRecord = never

// Response types include system fields and match responses from the PocketBase API
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Messages: MessagesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Messages: MessagesResponse
	users: UsersResponse
}