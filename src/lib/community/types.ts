export const COMMUNITY_CATEGORIES=['Kişisel gelişim','İlişkiler','Özdeğer ve sınırlar','Aile ve geçmiş','Günlük hayat','Enerji ve farkındalık'] as const;
export type Actor={name:string;username:string|null;avatar:string|null;admin:boolean};
export type CirclePost={id:string;title:string;body:string;category:string;anonymous:boolean;actor:Actor;created_at:string;status:string;mine:boolean;supports:number;supported:boolean;saved:boolean;comments:number};
export type CircleComment={id:string;post_id:string;parent_id:string|null;reply_to:string|null;body:string;actor:Actor;created_at:string;mine:boolean;supports:number;supported:boolean};
export type CircleProfile={username:string;display_name:string;avatar_url:string|null;cover_url?:string|null;profile_completed?:boolean;bio:string;created_at:string;admin?:boolean};
export type CircleNotice={id:string;title:string;body:string;type:string;link:string|null;is_read:boolean;created_at:string;actor_username:string|null;actor_avatar:string|null};
export type CircleMe={authenticated:boolean;admin:boolean;profile:CircleProfile|null};
