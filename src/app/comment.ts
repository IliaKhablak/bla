export class Comment {
	constructor(
		public id?: number,
		public text?: string,
		public user_email?: string,
		public created_at?: string,
		public prod_id?: number,
		public user_id?: number
	){}
}