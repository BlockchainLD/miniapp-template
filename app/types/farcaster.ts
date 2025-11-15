export interface FarcasterUser {
  fid: number;
  displayName: string;
  username: string;
  profile: {
    bio: {
      text: string;
    };
    location?: {
      description: string;
    };
    url?: string;
    bannerImageUrl?: string;
  };
  followerCount: number;
  followingCount: number;
  pfp: {
    url: string;
    verified: boolean;
  };
  connectedAccounts?: Array<{
    platform: string;
    username: string;
  }>;
}

export interface FarcasterData {
  result: {
    user: FarcasterUser;
  };
}

